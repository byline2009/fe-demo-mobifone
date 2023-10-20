import { FC } from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";

const ErrorsLayout = () => {
  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-column-fluid text-center p-10 py-lg-20">
        <a href="/dashboard" className="mb-10 pt-lg-20">
          <img
            alt="Logo"
            src={"/imgs/logo-mobifone.png"}
            className="h-50px mb-5"
          />
        </a>
        <div className="pt-lg-10 mb-10">
          <Outlet />
          <div className="text-center">
            <Link to="/" className="btn btn-lg btn-primary fw-bolder">
              Go to homepage
            </Link>
          </div>
        </div>
        <div
          className="
          d-flex
          flex-row-auto
          bgi-no-repeat
          bgi-position-x-center
          bgi-size-contain
          bgi-position-y-bottom
          min-h-100px min-h-lg-350px
        "
          style={{
            backgroundImage: `url('
                /imgs/background.jpg')`,
          }}
        ></div>
      </div>

      <div className="d-flex flex-center flex-column-auto p-10">
        <div className="d-flex align-items-center fw-bold fs-6">
          <a href="#" className="text-muted text-hover-primary px-2">
            About
          </a>
          <a
            href="mailto:duong.tranvan@mobifone.vn"
            className="text-muted text-hover-primary px-2"
          >
            Contact
          </a>
          <a
            href="https://mobifone.vn"
            className="text-muted text-hover-primary px-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};
const Error500: FC = () => {
  return (
    <>
      <h1 className="fw-bolder fs-4x text-gray-700 mb-10">System Error</h1>

      <div className="fw-bold fs-3 text-gray-400 mb-15">
        Something went wrong! <br /> Please try again later.
      </div>
    </>
  );
};
const Error404: FC = () => {
  return (
    <>
      <h1 className="fw-bolder fs-4x text-gray-700 mb-10">Page Not Found</h1>

      <div className="fw-bold fs-3 text-gray-400 mb-15">
        The page you looked not found! <br /> Plan your blog post by choosing a
        topic
      </div>
    </>
  );
};

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="404" element={<Error404 />} />
      <Route path="500" element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export { ErrorsPage };
