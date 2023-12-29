import { FC, useRef, useEffect, useState } from "react";
import {
  shallowEqual,
  useSelector,
  connect,
  useDispatch,
  ConnectedProps,
} from "react-redux";
import * as auth from "./AuthRedux";
import { getUserByToken } from "./AuthCRUD";
import { RootState } from "../../../../setup/redux/RootReducer";
import LayoutSplashScreen from "../../../../pages/LayoutSplashScreen";

const mapState = (state: RootState) => ({ auth: state.auth });
const connector = connect(mapState, auth.actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const AuthInit: FC<PropsFromRedux> = (props) => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const accessToken = useSelector<RootState>(
    ({ auth }) => auth.accessToken,
    shallowEqual
  );
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000);

    return () => {
      // clears timeout before running the new effect
      clearTimeout(timeout);
    };
  }, []);

  // We should request user by authToken before rendering the application
  useEffect(() => {
    console.log("check", accessToken);

    if (accessToken!) {
      console.log("check");
      // dispatch(props.logout());
      setShowSplashScreen(false);
    }
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
};

export default connector(AuthInit);
