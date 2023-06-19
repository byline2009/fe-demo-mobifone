import API from "../../utils/Api";

export const getNhanVienNghiViec = async (params: any) => {
  try {
    const response = await API.get(
      `/nhan-vien-nghi-viec?skip=${params.skip}&limit=${params.limit}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
