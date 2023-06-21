import React, { lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { SuspensedView } from "../../components/widgets/suspendView/SuspendedView";
const Header_PTM_NVBH = lazy(() => import("../ptm/components/Header_PTM_NVBH"));
const NVBH_PTM_TBTT = lazy(() => import("../ptm/components/NVBH_PTM_TBTT"));
const NVBH_PTM_TBTS = lazy(() => import("../ptm/components/NVBH_PTM_TBTS"));

export default function NVBHPhattrienmoi() {
  return (
    <Routes>
      <Route
        element={
          <>
            <Header_PTM_NVBH />
            <Outlet />
          </>
        }
      >
        <Route
          path="tbtt/*"
          element={
            <>
              <SuspensedView>
                <NVBH_PTM_TBTT />
              </SuspensedView>
            </>
          }
        />
        <Route
          path="tbts/*"
          element={
            <>
              <SuspensedView>
                <NVBH_PTM_TBTS />
              </SuspensedView>
            </>
          }
        />

        <Route index element={<Navigate to="/ptm/nvbh/tbtt" />} />
      </Route>
    </Routes>
  );
}
