import { v4 as uuidv4 } from "uuid";

import { getUserDetailsDAL, signupDAL } from "../DataAccessLayer/AuthDAL";
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

const uniqueId = uuidv4();

export const signupService = async (userInfo: user) => {
  const user = { ...userInfo, user_id: uniqueId };

  const isUserExist = await getUserDetailsDAL(userInfo.email);

  if (isUserExist) {
    throw new ValidationError(
      `User with email ${userInfo.email} already exists.`
    );
  }

  await signupDAL(user);
};

export const signinService = async (email: string, password: string) => {
  const user: user | null = await getUserDetailsDAL(email);

  if (!user) {
    throw new NotFoundError("User not found.");
  }

  if (user?.password !== password) {
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
