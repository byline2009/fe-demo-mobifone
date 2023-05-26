import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import TopBarProgress from "react-topbar-progress-indicator";
import MasterLayout from "../components/core/MasterLayout";

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
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardPage />} />

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
        <Route path="*" element={<Navigate to="/error/404" />} />
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
