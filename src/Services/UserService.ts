import { getUserDetailsById } from "../DataAccessLayer/UserDAL";
import { NotFoundError } from "../Utils/Error";

export const getUserDetailService = async (userId: string) => {
  const userDetails = await getUserDetailsById(userId);

  let response = undefined;

  if (userDetails) {
    response = {
      userId: userDetails.user_id,
      userName: userDetails.user_name,
      avatar: userDetails.avatar_url,
      email: userDetails.email,
    };
  } else {
    throw new NotFoundError("User not found");
  }

  return response;
};
