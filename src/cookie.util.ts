import Cookies from "js-cookie";

export const getUserFromCookie = () => {
  const userCookie = Cookies.get("user");
  console.log(userCookie);
  if (!userCookie) {
    return console.error("No user cookie found");
  }
  return JSON.parse(userCookie as string);
};
