import API from "../../utils/Api";

export const get_CP_PTM_NVBH_TBTT = async (params: any) => {
  try {
    const response = await API.get(
      `/ptm-nvbh-tbtt?month=${params.month}&year=${params.year}&skip=${
        params.skip
      }&limit=${params.limit}&textSearch=${
        params.textSearch ? params.textSearch : ""
      }`
    );
    if (response) {
      return response.data;
    }
  } catch (e: any) {
    console.log(e.toString());
  }
};
