import React, { useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { Link, Outlet } from "react-router-dom";

import {
  chatbubbleOutline,
  homeOutline,
  helpOutline,
  settingsOutline,
  personOutline,
  lockClosedOutline,
  logOutOutline,
  menuOutline,
  searchOutline,
} from "ionicons/icons";

const MasterLayout: React.FC = ({ children }) => {
  useEffect(() => {
    if (document) {
      let list = document.querySelectorAll(".navigation li");

      list.forEach((object) => {
        object.addEventListener("click", () => {
          console.log("check");
          list.forEach((item) => {
            item.classList.remove("active");
            object.classList.add("active");
          });
        });
      });
    }
  }, []);
  const toggleOnClick = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation?.classList.toggle("active");
    main?.classList.toggle("active");
  };
  return (
    <div className="container-warper">
      <div className="navigation">
        <ul>
          <li className="title-sidebar">
            <h4>Báo cáo Sản Phẩm Dịch Vụ</h4>
          </li>
          <li>
            <Link className="menu-link" to={`dashboard`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={homeOutline}></IonIcon>
              </span>
              <span className="title">DashBoard</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`nhan-vien-nghi-viec`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={personOutline}></IonIcon>
              </span>
              <span className="title">Nhân viên nghỉ việc</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`phat-trien-moi`}>
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={chatbubbleOutline}
                ></IonIcon>
              </span>
              <span className="title">CP Phát triển mới</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={helpOutline}></IonIcon>
              </span>
              <span className="title">Help</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={settingsOutline}></IonIcon>
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={lockClosedOutline}
                ></IonIcon>
              </span>
              <span className="title">Password</span>
            </Link>
          </li>
          <li>
            <Link className="menu-link" to={`/`}>
              <span className="icon">
                <IonIcon className="ion-icon" icon={logOutOutline}></IonIcon>
              </span>
              <span className="title">Sign out</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle" onClick={toggleOnClick}>
            <IonIcon className="ion-icon" icon={menuOutline}></IonIcon>
          </div>
          <a href="#">
            <span className="icon">
              <img src="/imgs/logo-header.png" alt="" />
            </span>
          </a>
          <div className="search">
            <label htmlFor="">
              <input type="text" placeholder="Search Here" />
              <IonIcon className="ion-icon" icon={searchOutline}></IonIcon>
            </label>
          </div>
          {/* User IMG */}
          <div className="user">
            <img src="/imgs/user.jpg" alt="user" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
