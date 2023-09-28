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

export const getDashBoardTopEmployees = async (params: any) => {
  try {
    const response = await API.get(
      `/dashboard/top-employees?month=${params.month}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};

export const getDashBoardTopServices = async (params: any) => {
  try {
    const response = await API.get(
      `/dashboard/top-services?month=${params.month}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
export const getDashBoardSummary = async () => {
  try {
    const response = await API.get(`/dashboard/summary`);
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
