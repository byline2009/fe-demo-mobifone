import React, { useEffect } from "react";
import axios from "axios";

const CrawMuaSamCong = () => {
  useEffect(() => {
    console.log("check");

    axios({
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      url: "https://muasamcong.mpi.gov.vn/o/egp-portal-contractor-selection-v2/services/smart/search",
      data: [
        {
          pageSize: 10,
          pageNumber: 0,
          query: [
            {
              index: "es-contractor-selection",
              keyWord: "Cung cấp và lắp đặt thiết bị, thiết bị truyền thanh",
              matchType: "any-1",
              matchFields: ["notifyNo", "bidName"],
              filters: [
                {
                  fieldName: "investField",
                  searchType: "in",
                  fieldValues: ["HH"],
                },
                {
                  fieldName: "bidCloseDate",
                  searchType: "range",
                  from: "2024-01-26T15:21:24.662Z",
                  to: null,
                },
                {
                  fieldName: "type",
                  searchType: "in",
                  fieldValues: ["es-notify-contractor"],
                },
                {
                  fieldName: "caseKHKQ",
                  searchType: "not_in",
                  fieldValues: ["1"],
                },
                {
                  fieldName: "locations.provCode",
                  searchType: "in",
                  fieldValues: ["509"],
                },
              ],
            },
          ],
        },
      ],
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  }, []);
  return <div>Hello World</div>;
};

export default CrawMuaSamCong;
