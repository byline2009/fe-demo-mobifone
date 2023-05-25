import { Suspense } from "react";
import LayoutSplashScreen from "./pages/LayoutSplashScreen";
import DashBoard from "./pages/DashboardPage";
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';
setupIonicReact();
function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <DashBoard />
    </Suspense>
  );
}

export default App;
