import React from "react";
import { ChartsWidget1 } from "../components/widgets/charts/ChartsWidget1";
import { ChartsWidget2 } from "../components/widgets/charts/ChartsWidget2";
import { ChartsWidget3 } from "../components/widgets/charts/ChartsWidget3";
import { ChartsWidget4 } from "../components/widgets/charts/ChartsWidget4";
import { ChartsWidget5 } from "../components/widgets/charts/ChartsWidget5";
import { ChartsWidget6 } from "../components/widgets/charts/ChartsWidget6";

const DashboardPage = () => (
  <div className="dashboard">
    {/* begin::Row */}
    <h4 className="title">Dashboard Báo cáo của Công ty khu vực 7</h4>
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

export default DashboardPage;
