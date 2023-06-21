import React, { FC, Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import NVBHPhattrienmoi from "./ptm/NVBHPhattrienmoi";

const GDVPhattrienmoi = lazy(() => import("./ptm/GDVPhattrienmoi"));
const AMPhattrienmoi = lazy(() => import("./ptm/AMPhattrienmoi"));
const DailyPhattrienmoi = lazy(() => import("./ptm/DailyPhattrienmoi"));

const HeaderPhatTrienMoi = lazy(
  () => import("./ptm/components//HeaderPhatTrienMoi")
);

const PTMPage = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <HeaderPhatTrienMoi />
            <Outlet />
          </>
        }
      >
        <Route
          path="gdv/*"
          element={
            <>
              <SuspensedView>
                <GDVPhattrienmoi />
              </SuspensedView>
            </>
          }
        />
        <Route
          path="nvbh/*"
          element={
            <>
              <SuspensedView>
                <NVBHPhattrienmoi />
              </SuspensedView>
            </>
          }
        />
        <Route
          path="am/*"
          element={
            <>
              <SuspensedView>
                <AMPhattrienmoi />
              </SuspensedView>
            </>
          }
        />
        <Route
          path="daily/*"
          element={
            <>
              <SuspensedView>
                <DailyPhattrienmoi />
              </SuspensedView>
            </>
          }
        />

        <Route index element={<Navigate to="/ptm/nvbh" />} />
      </Route>
    </Routes>
  );
};
const SuspensedView: FC = ({ children }) => {
  TopBarProgress.config({
    barColors: {
      "0": "#1a53ff",
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default PTMPage;
