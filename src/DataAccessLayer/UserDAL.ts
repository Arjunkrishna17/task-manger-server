import User from "../Models/Users";

export const getUserDetailsById = async (userId: string) => {
  const response = await User.findOne({ user_id: userId });

  return response;
};
