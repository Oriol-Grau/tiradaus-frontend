import httpService from "../httpService"; 

export const signIn = async (userName, password) => {
  console.log("Signing in", { userName, password });
  const res = await httpService.post(`/auth/login`, { 
    password,
    username: userName,
  });
  return res.data;
};

export default { signIn };
