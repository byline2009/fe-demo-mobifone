import API from "../../utils/Api";

export const getDashBoardBusiness = async (params: any) => {
  try {
    const response = await API.get(`/dashboard?month=${params.month}`);
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
