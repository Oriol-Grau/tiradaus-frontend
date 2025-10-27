import httpService from "../httpService";

export const signIn = async (userName, password) => {
  const res = await httpService.post(`/auth/login`, {
    password,
    username: userName,
  });
  return res.data;
};

export const signOut = async () => {
  const res = await httpService.post(`/auth/logout`);
  return res.data;
};

export const signUp = async ({
  username,
  password,
  email,
  firstName,
  lastName,
}) => {
  const res = await httpService.post(`/auth/register`, {
    password,
    username,
    email,
    firstName,
    lastName,
    roleId: 0,
  });
  return res.data;
};

export default { signIn, signOut, signUp };
