import React from "react";
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
} from "ionicons/icons";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <IonIcon className="ion-icon" icon={logoApple}></IonIcon>
              </span>
              <span className="title">Brand Name</span>
            </a>
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
              <span className="title">Customers</span>
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
              <span className="title">Message</span>
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
    </div>
  );
};

export default Dashboard;
