import { Suspense } from "react";
import LayoutSplashScreen from "./pages/LayoutSplashScreen";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
import AuthInit from "./app/modules/auth/redux/AuthInit";
import { Outlet } from "react-router-dom";
setupIonicReact();
function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <AuthInit>
        <Outlet />
      </AuthInit>
    </Suspense>
  );
}

export default App;
