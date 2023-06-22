import API from "../../utils/Api";

export const get_PTM_BHTT = async (params: any) => {
  try {
    const response = await API.get(
      `/bhtt-ptm?month=${params.month}&&year=${params.year}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
export const get_PTM_DB01 = async (params: any) => {
  try {
    const response = await API.get(
      `/db01-ptm?month=${params.month}&&year=${params.year}`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
