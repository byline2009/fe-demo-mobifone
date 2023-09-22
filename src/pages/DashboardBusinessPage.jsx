import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut, pluginDonut } from "./chart/dataDonut";
import {
  dataHorizontalBar,
  optionsHorizontalBar,
} from "./chart/dataHorizontalBar";
import {
  dataBarWith2Axis,
  dataBarWith2AxisContract,
  optionsBarWith2AxisContract,
} from "./chart/dataContract";
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
import {
  dataBarWith2AxisEmployee,
  optionsBarWith2AxisEmployee,
} from "./chart/dataEmployee";

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
  const [numberContract, setNumberContract] = useState(49);

  const [labelTopContracts, setLabelTopContracts] = useState([
    "SipTrunk",
    "3C",
    "Mobifone Invoice",
    "Mobifone eContract",
    "MobiCa",
  ]);
  const [doanhThuTopContract, setDoanhThuTopContract] = useState([
    10000000, 20000000, 25000000, 30000000, 35000000,
  ]);
  const [numberTopContract, setNumberTopContract] = useState([
    5, 10, 15, 20, 25,
  ]);

  const [labelTopEmployees, setLabelEmployees] = useState([
    "Đặng Thị Mỹ Liên",
    "Hoàng Xuân Minh",
    "Trần Thị Thanh Thương",
    "Nguyễn Tiến Hoàng",
    "Đỗ Ngọc Hùng",
    "Phạm Minh Rin",
  ]);

  const [doanhThuTopEmployee, setDoanhThuTopEmployee] = useState([
    10000000, 20000000, 25000000, 30000000, 35000000, 40000000,
  ]);
  const [numberTopEmployee, setNumberTopEmployee] = useState([
    5, 10, 15, 20, 25, 20,
  ]);

  const [dtLKYear, setDTLKYear] = useState(492);
  const [dtKHYear, setDTKHYear] = useState(809);

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
      <h4 className="title-pag text-center mt-5">
        Dashboard Kinh Doanh Công nghệ số
      </h4>
      <div className="card-dashboard bg-light">
        {show && (
          <div className="container px-4">
            <div className="row gx-5">
              <div className=" col-lg-3 col-xs-12 col-md-12">
                <div className="p-3 border mt-4 bg-card-info ">
                  <Doughnut
                    data={dataDonut(
                      tongTH,
                      tongKH,
                      tongTH / tongKH > 1
                        ? "rgba(76, 175, 80, 0.5)"
                        : "rgba(255, 177, 193, 1)",
                      `DT LK tháng(tr)`,
                      `DT KH tháng(tr)`
                    )}
                    plugins={pluginDonut(
                      Number(Number(tongTH / tongKH).toFixed(2) * 100).toFixed(
                        0
                      ) + "%"
                    )}
                  />
                  <h5 className="text-center pt-5">{`Số hợp đồng LK ${numberContract}`}</h5>
                  <h4 className="pt-2 text-center">Công ty 7</h4>
                </div>
              </div>
              <div className="col-lg-9 col-xs-12 row">
                {arrayCN.map((item, index) => (
                  <div className="p-3  col-lg-3 col-md-6 col-xs-12" key={index}>
                    <Doughnut
                      data={dataDonut(
                        item.th,
                        item.kh,
                        item.th / item.kh > 1
                          ? "rgba(76, 175, 80, 0.5)"
                          : "rgba(255, 177, 193, 1)",
                        "KH",
                        "TH"
                      )}
                      plugins={pluginDonut(
                        Number(
                          Number(item.th / item.kh).toFixed(2) * 100
                        ).toFixed(0) + "%"
                      )}
                    />

                    <h4 className="pt-2 text-center">{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="row g-5 mt-5">
              <div className="col-lg-3 col-xs-12">
                <div className="p-3 border bg-card-info ">
                  <Doughnut
                    data={dataDonut(
                      dtLKYear,
                      dtKHYear,
                      dtLKYear / dtKHYear > 1
                        ? "rgba(76, 175, 80, 0.5)"
                        : "rgba(255, 177, 193, 1)",
                      `DT LK năm(tr)`,
                      `DT KH năm(tr)`
                    )}
                    plugins={pluginDonut(
                      Number(
                        Number(dtLKYear / dtKHYear).toFixed(2) * 100
                      ).toFixed(0) + "%"
                    )}
                  />
                  <h5 className="text-center pt-5">{`Số hợp đồng LK năm 882`}</h5>
                  <h4 className="pt-2 text-center">Công ty 7</h4>
                </div>
              </div>
              <div className="col-lg-9 row">
                <div className="col-lg-12 col-xs-12 ">
                  <Bar
                    options={optionsBarWith2AxisEmployee}
                    data={dataBarWith2AxisEmployee(
                      labelTopEmployees,
                      numberTopEmployee,
                      doanhThuTopEmployee
                    )}
                  />
                </div>
                <div className="col-lg-13 col-xs-12 ">
                  <Bar
                    options={optionsBarWith2AxisContract}
                    data={dataBarWith2AxisContract(
                      labelTopContracts,
                      numberTopContract,
                      doanhThuTopContract
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
