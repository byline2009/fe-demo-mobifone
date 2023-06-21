/* eslint-disable no-restricted-globals */
import React from "react";
import { Link, useLocation } from "react-router-dom";
console.log("location.pathname", location.pathname);

const Header_PTM_NVBH = () => {
  const location = useLocation();
  return (
    <div className="header-ptm">
      <div className="d-flex overflow-auto h-55px">
        <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 fs-6 ` +
                (location.pathname === `/ptm/nvbh/tbtt` && "active")
              }
              to={`/ptm/nvbh/tbtt`}
            >
              Thuê bao trả trước
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={
                `nav-link text-active-primary me-3 fs-6 ` +
                (location.pathname === `/ptm/nvbh/tbts` && "active")
              }
              to={`/ptm/nvbh/tbts`}
            >
              Thuê bao trả sau
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header_PTM_NVBH;
