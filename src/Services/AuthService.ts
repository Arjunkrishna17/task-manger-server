import { v4 as uuidv4 } from "uuid";

import {
  checkUserExistDAL,
  getUserDetailsDAL,
  signupDAL,
} from "../DataAccessLayer/AuthDAL";
import { user } from "../Types/user";
import tokenGen from "../Utils/TokenGenerator";

const uniqueId = uuidv4();

export const signupService = async (userInfo: user) => {
  const user = { ...userInfo, user_id: uniqueId };

  const isUserExist = await checkUserExistDAL(userInfo.email);

  if (isUserExist) {
    throw new Error(`User ${user.email} already exists`);
  }

  await signupDAL(user);
};

export const signinService = async (email: string, password: string) => {
  const user: user | null = await getUserDetailsDAL(email);

  if (user?.password !== password) {
    throw new Error("Incorrect Username or Password.");
  }

  const token = tokenGen(user as user);

  return token;
};
