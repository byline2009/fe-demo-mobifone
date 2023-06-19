import API from "../../utils/Api";

export const getThaySim = async (params: any) => {
  try {
    const response = await API.get(
      `/thay-sim-4g?type=${params.type}&month=${params.month}&year=${params.year}&skip=${params.skip}&limit=${params.limit}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
