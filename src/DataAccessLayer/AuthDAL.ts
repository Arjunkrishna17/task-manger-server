import User from "../Models/Users";
import { user } from "../Types/user";

export const signupDAL = async (userDetails: user) => {
  await User.create(userDetails);
};

export const getUserDetailsDAL = async (email: string) => {
  const response = await User.findOne({ email: email });

  return response;
};

export const checkUserExistDAL = async (email: string) => {
  const user = await User.findOne({ email: email });

  let result = false;

  if (user) {
    result = true;
  }

  return result;
};
