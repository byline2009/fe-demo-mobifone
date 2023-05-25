import { Suspense } from "react";
import "./App.css";
import LayoutSplashScreen from "./pages/LayoutSplashScreen";
import NhanVienNghiViec from "./pages/NhanVienNghiViec";
function App() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <NhanVienNghiViec></NhanVienNghiViec>
    </Suspense>
  );
}

export default App;
