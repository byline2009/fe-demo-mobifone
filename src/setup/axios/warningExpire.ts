import API from "../../utils/Api";
import APIExport from "../../utils/ApiExport";

export const getWarningExpire = async (params: any) => {
  try {
    const response = await API.get(
      `/warning-contract?month=${params.month}&year=${params.year}&skip=${params.skip}&limit=${params.limit}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
