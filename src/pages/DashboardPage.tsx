import React, { useEffect, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import {
  chatbubbleOutline,
  homeOutline,
  helpOutline,
  settingsOutline,
  logoApple,
  personOutline,
  lockClosedOutline,
  logOutOutline,
  menuOutline,
  searchOutline,
} from "ionicons/icons";

const Dashboard = () => {
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
      let toggle = document.querySelector(".toggle");
      let main = document.querySelector(".main");
    }
  }, []);
  const toggleOnClick = () => {
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");
    navigation?.classList.toggle("active");
    main?.classList.toggle("active");
  };
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li className="title-sidebar">
            <h2>Báo cáo Sản Phẩm Dịch Vụ</h2>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={homeOutline}></IonIcon>
              </span>
              <span className="title">DashBoard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={personOutline}></IonIcon>
              </span>
              <span className="title">Nhân viên nghỉ việc</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={chatbubbleOutline}
                ></IonIcon>
              </span>
              <span className="title">CP Phát triển mới</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={helpOutline}></IonIcon>
              </span>
              <span className="title">Help</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={settingsOutline}></IonIcon>
              </span>
              <span className="title">Settings</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon
                  className="ion-icon"
                  icon={lockClosedOutline}
                ></IonIcon>
              </span>
              <span className="title">Password</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={logOutOutline}></IonIcon>
              </span>
              <span className="title">Sign out</span>
            </a>
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
      </div>
    </div>
  );
};

export default Dashboard;
