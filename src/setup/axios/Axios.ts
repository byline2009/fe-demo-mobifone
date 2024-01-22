import { actionTypes } from "../../app/modules/auth";

export default function setupAxios(axios: any, store: any) {
  axios.defaults.headers.Accept = "application/json";
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { accessToken },
      } = store.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    function (response: any) {
      // Do something with response data
      // console.log("response", response.data.status);

      if (response.status == 200) {
        return response;
      } else if (response.data.code == 401 || response.data.code == 403) {
        store.dispatch({ type: actionTypes.Logout });
      }
    },
    function (error: any) {
      console.log(error.response);
      // Do something with response error
      if (error.response.status == 401 || error.response.status == 403) {
        store.dispatch({ type: actionTypes.Logout });
      } else if (error.response.status == 400) {
        console.log(error.response);
      }
      return Promise.reject(error);
    }
  );
}
