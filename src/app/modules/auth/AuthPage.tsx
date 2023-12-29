/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
      {/* begin::Content */}
      <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
        {/* begin::Logo */}
        {/* <a href="#" className="mb-12">
          <img alt="Logo" src={"/imgs/logo-header.png"} className="h-45px" />
        </a>{" "} */}
        {/* begin::Wrapper */}
        <div className="login">
          <div className="login-form bg-white rounded shadow-sm p-10 p-lg-15 mx-auto mt-2">
            <Outlet />
          </div>
        </div>

        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}

      {/* end::Footer */}
    </div>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
);

export { AuthPage };
