import CustomError from "../../../shared/utils/customError";

export interface SignupDTOprops {
  email: string;
  name: string;
  password: string;
  username: string;
}

export const SignupnDTO = ({
  name,
  email,
  username,
  password,
}: SignupDTOprops) => {
  if (!email || !name || !password || !username) {
    throw new CustomError(
      "Name,email and username and password are required",
      400
    );
  }

  return { email, name, password, username };
};
