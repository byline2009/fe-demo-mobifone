import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut, pluginDonut } from "./chart/dataDonut";
import {
  dataHorizontalBar,
  optionsHorizontalBar,
} from "./chart/dataHorizontalBar";
import { dataBarWith2Axis, optionsBarWith2Axis } from "./chart/dataBar";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function sum(prev, next) {
  return prev + next;
}

export default function DashboardBusinessPage() {
  const [arrayCN, setArrayCN] = useState([
    { th: 6.12, kh: 36.53, name: "Khánh Hòa" },
    { th: 4.05, kh: 24.37, name: "Đắk Lắk" },
    { th: 7.21, kh: 16.24, name: "Gia Lai" },
    { th: 15.36, kh: 12.96, name: "Phú Yên" },
    { th: 1.39, kh: 8.12, name: "Đắk Nông" },
    { th: 3.31, kh: 8.39, name: "Kon Tum" },
    { th: 9.38, kh: 8.39, name: "TTKDCNS" },
  ]);
  const [tongTH, setTongTH] = useState(1);
  const [tongKH, setTongKH] = useState(1);
  const [tongPercent, setTongPercent] = useState("0%");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTongTH(arrayCN.map((item) => item.th).reduce(sum));
    setTongKH(arrayCN.map((item) => item.kh).reduce(sum));
  }, []);

  useEffect(() => {
    setTongPercent(Number(Number(tongTH / tongKH).toFixed(2) * 100).toFixed(0));
  }, [tongKH, tongKH]);

  useEffect(() => {
    setShow(true);
  }, [tongPercent]);

  return (
    <div className="dashboard-business">
      <h4>Dashboard Kinh Doanh Công nghệ số</h4>
      <div className="card-dashboard">
        {show && (
          <div className="container px-4">
            <div className="row gx-5">
              <div className="col col-3">
                <div className="p-3 border bg-light">
                  <Doughnut
                    data={dataDonut(
                      tongTH,
                      tongKH,
                      tongTH / tongKH > 1
                        ? "rgba(76, 175, 80, 1)"
                        : "rgba(255, 177, 193, 1)"
                    )}
                    plugins={pluginDonut(
                      Number(Number(tongTH / tongKH).toFixed(2) * 100).toFixed(
                        0
                      ) + " %"
                    )}
                  />
                  <h4 className="pt-2 text-center">Công ty 7</h4>
                </div>
              </div>
              <div className="col col-9 row">
                {arrayCN.map((item, index) => (
                  <div className="p-3 col col-3" key={index}>
                    <Doughnut
                      data={dataDonut(
                        item.th,
                        item.kh,
                        item.th / item.kh > 1
                          ? "rgba(76, 175, 80, 1)"
                          : "rgba(255, 177, 193, 1)"
                      )}
                      plugins={pluginDonut(
                        Number(
                          Number(item.th / item.kh).toFixed(2) * 100
                        ).toFixed(0) + " %"
                      )}
                    />

                    <h4 className="pt-2 text-center">{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col col-6">
                <Bar options={optionsHorizontalBar} data={dataHorizontalBar} />
              </div>
              <div className="col col-6">
                <Bar options={optionsBarWith2Axis} data={dataBarWith2Axis} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
