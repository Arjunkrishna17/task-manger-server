import jwt from "jsonwebtoken";

import { user } from "../Types/user";

const tokenGen = (payload: user) => {
  const secret = process.env.JWT_SECRET_KEY as string;

  const tokenPayload = {
    userId: payload.user_id,
    username: payload.user_name,
  };

  return jwt.sign(tokenPayload, secret, { expiresIn: "7h" });
};

export default tokenGen;
