import User from "../Models/Users";
import { user } from "../Types/user";

export const signupDAL = async (userDetails: user) => {
  const newUser = await User.create(userDetails);

  return newUser;
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
