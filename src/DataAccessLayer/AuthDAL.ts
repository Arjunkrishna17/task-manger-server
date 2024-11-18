import User from "../Models/Users";
import { user } from "../Types/user";
import { DatabaseError } from "../Utils/Error";

export const signupDAL = async (userDetails: user) => {
  try {
    const newUser = await User.create(userDetails);

    return newUser;
  } catch (error) {
    console.log(`Sign up db error: ${error}`);
    throw new DatabaseError("Failed to save user information.");
  }
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
