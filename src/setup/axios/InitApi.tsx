import axios from "axios";
import API from "../../utils/Api";
const API_URL = process.env.REACT_APP_API_URL;

export const getNhanVienNghiViec = async () => {
  try {
    const response = await API.get("/nhan-vien-nghi-viec");
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
