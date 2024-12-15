import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

import {
  getUserDetailsDAL,
  signupDAL,
  updateUserDetailsDAL,
} from "../DataAccessLayer/AuthDAL";
import { user } from "../Types/user";
import tokenGen from "../Utils/TokenGenerator";
import axios from "axios";
import {
  DatabaseError,
  InvalidTokenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../Utils/Error";
import hashPassword from "../Utils/HashPassword";
import { createCollectionService } from "./CollectionService";
import { createTaskService } from "./TaskService";
import ForgotPassTokenGen from "../Utils/ForgotPassTokenGen";
import { getEmailFormat } from "../Utils/EmailHtml";

export const signupService = async (userInfo: user) => {
  const uniqueId = uuidv4();

  const user = { ...userInfo, user_id: uniqueId };

  const isUserExist = await getUserDetailsDAL(userInfo.email);

  if (isUserExist) {
    throw new ValidationError(
      `User with email ${userInfo.email} already exists.`
    );
  }

  if (userInfo.password) {
    user.password = await hashPassword(userInfo.password);
  }

  await signupDAL(user);

  //create new example collection and Task
  await createCollectionAndTask(user.user_id);
};

export const signinService = async (email: string, password: string) => {
  const user: user | null = await getUserDetailsDAL(email);

  if (!user || !user.password) {
    throw new NotFoundError(
      "The email or password you entered is incorrect. Please try again."
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Incorrect email or password");
  }

  const token = tokenGen(user as user);

  return token;
};

export const googleAuthService = async (token: string) => {
  try {
    const ticket = await getUserInfo(token);

    if (!ticket) {
      throw new InvalidTokenError("Invalid Token");
    }

    const { sub, email, name, picture } = ticket;

    const userDetails = await getUserDetailsDAL(email as string);

    const uniqueId = uuidv4();

    let jwtToken: string;

    if (!userDetails) {
      const userDetails = {
        user_id: uniqueId,
        user_name: name as string,
        email: email as string,
        google_id: sub as string,
        avatar_url: picture as string,
      };

      const userInfo = await signupDAL(userDetails);

      //create new example collection and Task
      await createCollectionAndTask(userDetails.user_id);

      jwtToken = tokenGen(userInfo as user);
    } else {
      jwtToken = tokenGen(userDetails as user);
    }

    return { status: 200, success: true, message: jwtToken };
  } catch (error) {
    console.error(error);
    return { status: 200, success: true, message: "" };
  }
};

const getUserInfo = async (accessToken: string) => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo = response.data;

    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

const createCollectionAndTask = async (userId: string) => {
  const newCollection = {
    name: "Example Collection",
    description: "Click to view the tasks in this collection.",
  };
  const collection = await createCollectionService(userId, newCollection);

  const newTask: any = {
    title: "Example Task",
    description: "Drag me to next column to update my status",
    status: "To Do",
    sortOrder: 0,
    collection_id: collection.collection_id,
  };

  await createTaskService(newTask, userId);
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "taskmanager.care@gmail.com", // your email
    pass: process.env.GMAIL_PASSWORD, // your email password (use env variables for production)
  },
});

export const forgotPasswordService = async (email: string) => {
  const user = await getUserDetailsDAL(email);

  if (!user) {
    return;
  }

  const token = ForgotPassTokenGen(user.user_id, email);

  const resetLink = process.env.RESET_PASSWORD_URL + "/" + token;

  const mailOptions = {
    from: "taskmanager.care@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: getEmailFormat(resetLink, user.user_name),
  };

  await transporter.sendMail(mailOptions);
};

export const resetPasswordService = async (token: string, password: string) => {
  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY_FOR_FORGET_PASSWORD as string
    );

    const user = await getUserDetailsDAL(decoded.email);

    if (!user) {
      throw new NotFoundError("Invalid User");
    }

    const hashPass = await hashPassword(password);

    await updateUserDetailsDAL(user.user_id, { password: hashPass });

    const loginToken = tokenGen(user);

    return loginToken;
  } catch (error) {
    console.error({ error });

    if (error instanceof jwt.TokenExpiredError) {
      throw new NotFoundError("Token has expired");
    }

    // Invalid token
    throw new NotFoundError("Invalid token");
  }
};
