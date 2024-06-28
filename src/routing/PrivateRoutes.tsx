"use client";
import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TopBarProgress from "react-topbar-progress-indicator";
import MasterLayout from "../components/core/MasterLayout";
import { ErrorBoundary } from "react-error-boundary";
import DashboardBusinessPage from "../pages/DashboardBusinessPage";
import WarningExpireContract from "../pages/WarningExpireContract";
import DashboardBusinessDetail from "../pages/dashboard/DashboardBusinessDetail";
import DashBoardBusinessEmployeeDetail from "../pages/dashboard/DashboardBusinessEmployee";
import CrawMuaSamCong from "../pages/CrawMuaSamCong";
import PlatFormPage from "../pages/Platform";

const NhanVienNghiViec = lazy(() => import("../pages/NhanVienNghiViec"));
const DuytriPage = lazy(() => import("../pages/DuytriPage"));
const Thaysim4GPage = lazy(() => import("../pages/Thaysim4GPage"));
const PTMPage = lazy(() => import("../pages/PTMPage"));

export default function ComingSoonPage() {
  return <h1>Coming soon</h1>;
}

const routesAsideMenu = [
  {
    url: "/fe-demo/report",
  },
];

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard-business" />} />
        {/* Pages */}
        <Route
          path="dashboard"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <DashboardPage />
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="warning-expire"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <WarningExpireContract />
              </SuspensedView>
            </ErrorBoundary>
          }
        />

        <Route
          path="crawl-muasamcong"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <CrawMuaSamCong />
              </SuspensedView>
            </ErrorBoundary>
          }
        />

        <Route
          path="platform"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <PlatFormPage />
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="dashboard-business"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <DashboardBusinessPage />{" "}
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="/dashboard-business/:id"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <DashboardBusinessDetail />{" "}
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="/dashboard-business-employee"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <DashBoardBusinessEmployeeDetail />{" "}
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="nhan-vien-nghi-viec"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <NhanVienNghiViec />{" "}
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="thay-sim-4g"
          element={
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <SuspensedView>
                <Thaysim4GPage />{" "}
              </SuspensedView>
            </ErrorBoundary>
          }
        />
        <Route
          path="ptm/*"
          element={
            <SuspensedView>
              <PTMPage />{" "}
            </SuspensedView>
          }
        />
        <Route
          path="cs"
          element={
            <SuspensedView>
              <DuytriPage />{" "}
            </SuspensedView>
          }
        />

        {routesAsideMenu.map((route, index) => {
          return (
            <Route
              key={route.url}
              path={`${route.url}/*`}
              element={<ComingSoonPage />}
            />
          );
        })}

        {/* Page Not Found  */}
        {/* <Route path="*" element={<Navigate to="/error/404" />} /> */}
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

export { PrivateRoutes };
