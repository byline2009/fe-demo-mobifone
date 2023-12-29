import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
// export const LOGIN_URL = `${API_URL}/sys-user/login`
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post(LOGIN_URL, {
    username: email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  // const user: UserModel = {
  //   username: "demo",
  //   password: "123456",
  //   api_token: "sdfsdfsd34sg456trtgfxdg",
  //   created_at: "2022-03-30T12:17:50.000000Z",
  //   email: "admin@admin.com",
  //   email_verified_at: "2022-03-30T12:17:50.000000Z",
  //   first_name: "Maeve",
  //   id: 2,
  //   last_name: "Casper",
  //   updated_at: "2022-03-30T12:17:50.000000Z",
  // } as UserModel;

  return { data: "unknow" };
  //  axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
  //   api_token: token,
  // })
}
