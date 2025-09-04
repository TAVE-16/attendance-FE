import client from "./client";

/* 로그인 */
export async function postLogin(email, password) {
  const response = await client.post("v1/admin/signin", {
    email: email,
    password: password,
  });
  return response;
}