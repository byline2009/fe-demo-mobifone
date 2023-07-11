import API from "../../utils/Api";
import APIExport from "../../utils/ApiExport";

export const getThaySim = async (params: any) => {
  try {
    const response = await API.get(
      `/thay-sim-4g?type=${params.type}&month=${params.month}&year=${params.year}&skip=${params.skip}&limit=${params.limit}&textSearch=${params.textSearch}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};

export const getFileExcelThaySim4G = async (params: any) => {
  try {
    const response = await APIExport.get(
      `/thay-sim-4g/export-excel?type=${params.type}&month=${params.month}&year=${params.year}&skip=${params.skip}&limit=${params.limit}&textSearch=${params.textSearch}&isCurrentPage=${params.isCurrentPage}`
    );
    if (response) {
      return response;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
