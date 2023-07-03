import React, { useEffect, useState } from "react";
import { ChartsWidget1 } from "../components/widgets/charts/ChartsWidget1";
import { ChartsWidget2 } from "../components/widgets/charts/ChartsWidget2";
import { ChartsWidget3 } from "../components/widgets/charts/ChartsWidget3";
import { ChartsWidget4 } from "../components/widgets/charts/ChartsWidget4";
import { ChartsWidget5 } from "../components/widgets/charts/ChartsWidget5";
import { ChartsWidget6 } from "../components/widgets/charts/ChartsWidget6";
import { get_PTM_BHTT, get_PTM_DB01 } from "../setup/axios/Dashboard";
import moment from "moment";
import { TailSpin } from "react-loader-spinner";

const DashboardPage = () => {
  const [bhtt_ptm, set_bhtt_ptm] = useState(0);
  const [db01_ptm, set_db01_ptm] = useState(0);
  const [loading_BHTT_PTM, setLoading_BHTT_PTM] = useState(true);
  const [loading_BD01_PTM, setLoading_DB01_PTM] = useState(true);

  var d = new Date();
  d.setDate(d.getDate() - 5);
  useEffect(() => {
    get_PTM_BHTT({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }).then((result) => {
      if (result) {
        set_bhtt_ptm(result.data);
      }
      setLoading_BHTT_PTM(false);
    });
    get_PTM_DB01({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    }).then((result) => {
      if (result) {
        set_db01_ptm(result.data);
      }
      setLoading_DB01_PTM(false);
    });
  }, []);
  return (
    <div className="dashboard">
      {/* begin::Row */}
      <h4 className="title mb-5">Dashboard Báo cáo của Công ty khu vực 7</h4>
      <div className="row gy-5 g-xl-8 mb-5 min-h-190px">
        <div className="col-lg-3 col-xs-12">
          <div className="card h-100 card-ptm ">
            <div className="card-body d-flex justify-content-center text-center flex-column  p-8">
              <div className="fs-5 fw-bold text-gray-700 text-wrap mb-2">
                {`Tổng số thuê bao phát triển mới kích hoạt tháng ${
                  new Date().getMonth() + 1
                } được ghi nhận đến ${moment(d).format(
                  "DD/MM/YYYY"
                )} trên BHTT`}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {loading_BHTT_PTM ? (
                  <TailSpin radius={1} ariaLabel="loading-indicator" />
                ) : (
                  <h2>{bhtt_ptm}</h2>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-xs-12">
          <div className=" card h-100  min-h-190px card-ptm">
            <div className="card-body d-flex justify-content-center text-center flex-column p-8">
              <div className="fs-5 fw-bold text-gray-700 text-wrap mb-2">
                {`Tổng số thuê bao phát triển mới kích hoạt tháng ${
                  new Date().getMonth() + 1
                } được ghi nhận đến ${moment(d).format(
                  "DD/MM/YYYY"
                )} trên DB01`}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {loading_BD01_PTM ? (
                  <TailSpin ariaLabel="loading-indicator" />
                ) : (
                  <h2>{db01_ptm}</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-5 g-xl-8">
        <div className="col-xxl-3">
          <ChartsWidget1 className="mb-5 mb-xxl-8" />
        </div>
        <div className="col-xxl-3">
          <ChartsWidget2 className="mb-5 mb-xxl-8" />
        </div>
        <div className="col-xxl-6">
          <ChartsWidget3 className="mb-5 mb-xxl-8" />
        </div>
        <div className="col-xxl-3">
          <ChartsWidget4 className="mb-5 mb-xxl-8" />
        </div>
        <div className="col-xxl-3">
          <ChartsWidget5 className="mb-5 mb-xxl-8" />
        </div>
        <div className="col-xxl-6">
          <ChartsWidget6 className="mb-5 mb-xxl-8" />
        </div>
      </div>
      {/* end::Row */}
    </div>
  );
};

export default DashboardPage;
