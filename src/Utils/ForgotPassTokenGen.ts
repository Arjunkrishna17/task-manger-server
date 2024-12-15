import jwt from "jsonwebtoken";

const ForgotPassTokenGen = (userId: string, email: string) => {
  const secret = process.env.JWT_SECRET_KEY_FOR_FORGET_PASSWORD as string;

  const tokenPayload = {
    userId,
    email,
  };

  return jwt.sign(tokenPayload, secret, { expiresIn: "10m" });
};

export default ForgotPassTokenGen;
