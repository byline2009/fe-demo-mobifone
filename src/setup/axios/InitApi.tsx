import API from "../../utils/Api";
import APIExport from "../../utils/ApiExport";

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
export const getFileExcelNhanVienNghiViec = async (params: any) => {
  try {
    const response = await APIExport.get(
      `/nhan-vien-nghi-viec/export-excel?skip=${params.skip}&limit=${params.limit}&isCurrentPage=${params.isCurrentPage}`
    );
    if (response) {
      return response;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
