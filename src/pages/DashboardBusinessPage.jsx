import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut, pluginDonut } from "./chart/dataDonut";
import { TailSpin } from "react-loader-spinner";

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
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import { getDashBoardBusiness } from "../setup/axios/DashBoardBusiness";
import moment from "moment";

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
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonthYear: x,
};

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
  const [show, setShow] = useState(false);
  const [selectMonth, setSelectMonth] = useState(
    moment(new Date()).format("DD-MM-YYYY")
  );
  console.log("checkcccc", moment(new Date()).format("DD-MM-YYYY"));
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

  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState(INIT_VALUES);

  useEffect(() => {
    getDashBoardBusiness({ month: selectMonth }).then((res) => {
      if (res && res.result && res.result.length > 0) {
        const arrayTemp = res.result.map((item) => ({
          th: item.doanhThu,
          kh: item.kpiDoanhThu,
          name: item.displayName,
        }));

        setArrayCN(arrayTemp);
        setShow(true);
      }
    });
  }, []);
  useEffect(() => {
    console.log("check");

    setTongTH(arrayCN.map((item) => item.th).reduce(sum));
    setTongKH(arrayCN.map((item) => item.kh).reduce(sum));
  }, [arrayCN]);

  return (
    <div className="dashboard-business">
      <h4 className="title-pag text-center mt-5">
        Dashboard Kinh Doanh Công nghệ số
      </h4>

      <div className="card-dashboard bg-light">
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            const date = moment(values.selectMonthYear).format("DD-MM-YYYY");
            console.log("check", date !== selectMonth);

            setSelectMonth(date);

            setInitValues({
              selectMonthYear: values.selectMonthYear,
            });
            if (date !== selectMonth) {
              setShow(false);
              getDashBoardBusiness({ month: date }).then((res) => {
                if (res && res.result && res.result.length > 0) {
                  const arrayTemp = res.result.map((item) => ({
                    th: item.doanhThu,
                    kh: item.kpiDoanhThu,
                    name: item.displayName,
                  }));

                  setArrayCN(arrayTemp);
                  setShow(true);
                }
              });
            }
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className=" filter mb-3 mt-2 me-5 ms-5">
                  <div className="filter-body d-flex flex-start">
                    <div className="select-filter me-5 px-2">
                      <label
                        htmlFor="selectMonthYear"
                        className="form-label fs-6 fw-bold text-dark me-2"
                      >
                        Tháng
                      </label>
                      <DatePickerField
                        showMonthYearPicker={true}
                        name={`selectMonthYear`}
                        dateFormat="MM/yyyy"
                        disabled={false}
                        callbackSetDate={(e) => {
                          formikProps.handleSubmit();
                        }}
                      ></DatePickerField>

                      <div className="text-danger">
                        <ErrorMessage name="selectMonthYear" />
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {show ? (
          <div className="container px-4">
            <div className="row gx-5">
              <div className=" col-lg-3 col-xs-12 col-md-12">
                <div
                  className="p-3 border mt-4 bg-card-info "
                  style={{ position: "relative" }}
                >
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
                  />
                  <div
                    style={{
                      position: "absolute",
                      width: "100%",
                      top: "42%",
                      left: 0,
                      textAlign: "center",
                      lineHeight: "20px",
                      fontSize: "20px",
                    }}
                  >
                    <span>
                      {Number(Number(tongTH / tongKH).toFixed(2) * 100).toFixed(
                        0
                      ) + "%"}
                    </span>
                  </div>
                  <h5 className="text-center pt-5">{`Số hợp đồng LK ${numberContract}`}</h5>
                  <h4 className="pt-2 text-center">Công ty 7</h4>
                </div>
              </div>
              <div className="col-lg-9 col-xs-12 row">
                {arrayCN.map((item, index) => (
                  <div
                    className="p-3 col-lg-3 col-md-6 col-xs-12"
                    key={index}
                    style={{ position: "relative" }}
                  >
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
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        top: "50%",
                        left: 0,
                        textAlign: "center",
                        marginTop: "-5%",
                        lineHeight: "20px",
                        fontSize: "20px",
                      }}
                    >
                      <span>
                        {Number(
                          Number(item.th / item.kh).toFixed(2) * 100
                        ).toFixed(0) + "%"}
                      </span>
                    </div>

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
        ) : (
          <div>
            <div className="empty-content">
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <TailSpin ariaLabel="loading-indicator" />{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
