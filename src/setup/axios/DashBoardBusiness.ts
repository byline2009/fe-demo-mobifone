import API from "../../utils/Api";
import APICount from "../../utils/ApiCount";

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

export const getDashBoardBusinessDetail = async (params: any) => {
  try {
    const response = await API.get(
      `dashboard/dashboard-by-shop-code?year=${params.selectYear}&&shopCode=${params.shopCode}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};

export const getDashBoardBusinessEmployee = async (params: any) => {
  try {
    const response = await API.get(
      `dashboard/dashboard-employee?year=${params.selectYear}`
    );
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
export const getDashBoardSummaryOfYear = async (params: any) => {
  try {
    const response = await API.get(
      `/dashboard/summaryOfYear?year=${params.year}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};

export const getDashBoardSummaryOfMonth = async (params: any) => {
  try {
    const response = await API.get(
      `/dashboard/summaryOfMonth?month=${params.month}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
export const getCountView = async (params: any) => {
  try {
    const response = await API.get(
      `dashboard/dashboard-view-count?pageId=${params.pageId}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
export const addCountView = async (params: any) => {
  try {
    const response = await API.post("dashboard/dashboard-add-count", {
      count: params.count ? params.count : 0,
      pageId: params.pageId,
    });
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
