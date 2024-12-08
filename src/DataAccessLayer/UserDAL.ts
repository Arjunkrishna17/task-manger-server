import User from "../Models/Users";
import { InternalServerError } from "../Utils/Error";

export const getUserDetailsById = async (userId: string) => {
  const response = await User.findOne({ user_id: userId });

  return response;
};

export const updateUserNameDAL = async (userId: string, userName: string) => {
  try {
    await User.findOneAndUpdate({ user_id: userId }, { user_name: userName });
  } catch (error) {
    console.error("Error in updateUserNameDAL:", error);
    throw new InternalServerError("Error fetching the user.");
  }
};
