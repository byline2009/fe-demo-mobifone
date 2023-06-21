/* eslint-disable no-restricted-globals */
import React from "react";
import { Link, useLocation } from "react-router-dom";
console.log("location.pathname", location.pathname);

const HeaderPhatTrienMoi = () => {
  const location = useLocation();
  return (
    <div className="header-ptm">
      <div className="d-flex overflow-auto h-55px">
        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 ` +
                (location.pathname === `/ptm/nvbh` ||
                `/ptm/nvbh/tbtt` ||
                `/ptm/nvbh/tbts`
                  ? "active"
                  : "")
              }
              to={`/ptm/nvbh`}
            >
              NVBH
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 ` +
                (location.pathname === `/ptm/gdv` ||
                `/ptm/gdv/tbtt` ||
                `/ptm/gdv/tbts`
                  ? "active"
                  : "")
              }
              to={`/ptm/gdv`}
            >
              GDV
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 ` +
                (location.pathname === `/ptm/am` && "active")
              }
              to={`/ptm/am`}
            >
              AM
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 ` +
                (location.pathname === `/ptm/daily` && "active")
              }
              to={`/ptm/daily`}
            >
              Đại lý
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderPhatTrienMoi;
