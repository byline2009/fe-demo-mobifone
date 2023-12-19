import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut } from "./chart/dataDonut";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  dataBarWith2AxisContract,
  optionsBarWith2AxisContract,
} from "./chart/dataContract";
import { useEffect, useState, useRef } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import {
  getDashBoardBusiness,
  getDashBoardSummaryOfYear,
  getDashBoardTopEmployees,
  getDashBoardTopServices,
  getDashBoardSummaryOfMonth,
  getCountView,
  addCountView,
} from "../setup/axios/DashBoardBusiness";
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
    { th: 0, kh: 1, name: "Khánh Hòa" },
    { th: 0, kh: 1, name: "Đắk Lắk" },
    { th: 0, kh: 1, name: "Gia Lai" },
    { th: 0, kh: 1, name: "Phú Yên" },
    { th: 0, kh: 1, name: "Đắk Nông" },
    { th: 0, kh: 1, name: "Kon Tum" },
    { th: 0, kh: 1, name: "TTKDCNS" },
  ]);
  const [tongTH, setTongTH] = useState(1);
  const [tongKH, setTongKH] = useState(1);
  const [show, setShow] = useState(false);
  const [selectMonth, setSelectMonth] = useState(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [numberContractMonth, setNumberContractMonth] = useState(0);
  const [numberOfContractYear, setNumberOfContractYear] = useState(0);

  const [labelTopServices, setLabelTopServices] = useState([]);
  const [doanhThuTopServices, setDoanhThuTopServices] = useState([]);
  const [numberTopContractServices, setNumberTopContractServices] = useState(
    []
  );

  const [labelTopEmployees, setLabelEmployees] = useState([]);

  const [doanhThuTopEmployees, setDoanhThuTopEmployees] = useState([]);
  const [numberTopConTractEmployees, setNumberTopConTractEmployees] = useState(
    []
  );

  const [dtLKYear, setDTLKYear] = useState(0);
  const [dtKHYear, setDTKHYear] = useState(0);

  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [showDonutYear, setShowDonutYear] = useState(false);
  const [showDonutMonth, setShowDonutMonth] = useState(false);
  const [widthWindow, setWidthWindow] = useState(0);

  const [count, setCount] = useState();
  const [countMonth, setCountMonth] = useState(0);
  const [countYear, setCountYear] = useState(0);
  const firstUpdate = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCountView({ pageId: "dashboard-business" }).then((result) => {
      if (result && Object.keys(result).length > 0) {
        result.countdate !== undefined && setCount(result.countdate);
        result.countmonth !== undefined && setCountMonth(result.countmonth);
        result.countyear !== undefined && setCountYear(result.countyear);
      }
    });
  }, []);
  useEffect(() => {
    if (count !== undefined) {
      if (firstUpdate) {
        addCountView({
          count: parseInt(count) ? parseInt(count) : 0,
          pageId: "dashboard-business",
        });
        firstUpdate.current = false;
      }
    }
  }, [count]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);

  useEffect(() => {
    getDashBoardBusiness({ month: selectMonth }).then((res) => {
      let arrayTemp = [];
      if (res && res.result && res.result.length > 0) {
        arrayTemp = res.result.map((item) => ({
          th: item.doanhThu,
          kh: item.kpiDoanhThu,
          name: item.displayName,
          shopCode: item.shopCode,
        }));

        const arraySort = []
          .concat(arrayTemp)
          .sort((a, b) => b.th / b.kh - a.th / a.kh);
        setArrayCN(arraySort);
        setShow(true);
      }
    });

    getDashBoardTopEmployees({ month: selectMonth }).then((res) => {
      if (res && res.result && res.result.length > 0) {
        const topEmployees = res.result.slice(0, 6).map((item) => item.amName);
        setLabelEmployees(topEmployees);
        const topContracts = res.result
          .slice(0, 6)
          .map((item) => item.numberContract);
        setNumberTopConTractEmployees(topContracts);
        const topDoanhThu = res.result.slice(0, 6).map((item) => item.doanhThu);
        setDoanhThuTopEmployees(topDoanhThu);
      }
    });

    getDashBoardTopServices({ month: selectMonth }).then((res) => {
      if (res && res.result && res.result.length > 0) {
        const topLabelServices = res.result
          .slice(0, 6)
          .map((item) => item.serviceName);
        setLabelTopServices(topLabelServices);

        const topDoanhThuServices = res.result
          .slice(0, 6)
          .map((item) => item.doanhThu);
        setDoanhThuTopServices(topDoanhThuServices);

        const topContractServices = res.result
          .slice(0, 6)
          .map((item) => item.numberOfContract);
        setNumberTopContractServices(topContractServices);
      }
    });
    getDashBoardSummaryOfYear({ year: selectMonth }).then((res) => {
      if (res && res.result) {
        setDTLKYear(res.result[0].doanhThu);
        setDTKHYear(res.result[0].kpiDoanhThu);
        setNumberOfContractYear(res.result[0].numberOfContract);
        setShowDonutYear(true);
      }
    });
    getDashBoardSummaryOfMonth({ month: selectMonth }).then((res) => {
      if (res && res.result && res.result.length > 0) {
        setTongTH(res.result[0].doanhThu);
        setTongKH(res.result[0].kpiDoanhThu);
        setNumberContractMonth(res.result[0].numberContract);
        setShowDonutMonth(true);
      } else {
        setShowDonutMonth(false);
      }
    });
  }, []);

  // useEffect(() => {
  // }, [dtKHYear]);
  // useEffect(() => {
  //   setTongTH(arrayCN.map((item) => item.th).reduce(sum));
  //   setTongKH(arrayCN.map((item) => item.kh).reduce(sum));
  // }, [arrayCN]);

  return (
    <div className="dashboard-business">
      <div className="card-dashboard bg-light">
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            const date = moment(values.selectMonthYear).format("DD-MM-YYYY");
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
                    shopCode: item.shopCode,
                  }));
                  const arraySort = []
                    .concat(arrayTemp)
                    .sort((a, b) => b.th / b.kh - a.th / a.kh);
                  setArrayCN(arraySort);
                  setShow(true);
                }
              });
              getDashBoardTopEmployees({ month: date }).then((res) => {
                if (res && res.result && res.result.length > 0) {
                  const topEmployees = res.result
                    .slice(0, 6)
                    .map((item) => item.amName);
                  setLabelEmployees(topEmployees);
                  const topContracts = res.result
                    .slice(0, 6)
                    .map((item) => item.numberContract);
                  setNumberTopConTractEmployees(topContracts);
                  const topDoanhThu = res.result
                    .slice(0, 6)
                    .map((item) => item.doanhThu);
                  setDoanhThuTopEmployees(topDoanhThu);
                }
              });
              getDashBoardTopServices({ month: date }).then((res) => {
                if (res && res.result && res.result.length > 0) {
                  const topLabelServices = res.result
                    .slice(0, 6)
                    .map((item) => item.serviceName);
                  setLabelTopServices(topLabelServices);

                  const topDoanhThuServices = res.result
                    .slice(0, 6)
                    .map((item) => item.doanhThu);
                  setDoanhThuTopServices(topDoanhThuServices);

                  const topContractServices = res.result
                    .slice(0, 6)
                    .map((item) => item.numberOfContract);
                  setNumberTopContractServices(topContractServices);
                }
              });
              getDashBoardSummaryOfMonth({ month: date }).then((res) => {
                if (res && res.result && res.result.length > 0) {
                  setTongTH(res.result[0].doanhThu);
                  setTongKH(res.result[0].kpiDoanhThu);
                  setNumberContractMonth(res.result[0].numberContract);
                  setShowDonutMonth(true);
                } else {
                  setShowDonutMonth(false);
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
                        maxDate={new Date()}
                      ></DatePickerField>

                      <div className="text-danger">
                        <ErrorMessage name="selectMonthYear" />
                      </div>
                    </div>
                    <h5 className="title-page text-center mt-2">
                      Dashboard Kinh Doanh Công nghệ số
                    </h5>{" "}
                    {count !== undefined && (
                      <p className="view-count">
                        Tổng views ngày : {count ? count : ""} - tháng :{" "}
                        {countMonth ? countMonth : ""} - năm :{" "}
                        {countYear ? countYear : ""}
                        {/* {new Intl.DateTimeFormat("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(today)} */}
                      </p>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {show ? (
          <div className="container px-4">
            <div className="row gx-5 ">
              <div className=" col-lg-6 col-xs-12 col-md-12  border-solid">
                <div className="col-12 d-flex justify-content-center">
                  {showDonutMonth && (
                    <div className="col-12">
                      <div className=" row g-2 ">
                        <div
                          className="col-xs-12 col-md-6 col-lg-4 "
                          style={{ height: "280px" }}
                        >
                          <div className="card-dashboard  h-100">
                            <div className="d-flex flex-column justify-content-center ">
                              <h5 className="number-contract pt-3  text-center">
                                {`Số hợp đồng lũy kế tháng `}{" "}
                              </h5>
                              <h4 className="text-center">
                                {numberContractMonth}
                              </h4>
                              <h5 className=" number-contract pt-3  text-center">{`Số hợp đồng lũy kế năm`}</h5>
                              <h4 className="text-center">
                                {numberOfContractYear}
                              </h4>
                              <h5 className="pt-3 number-contract text-center">
                                {`Công ty 7 `}
                              </h5>
                            </div>
                          </div>
                        </div>

                        <div className="col-xs-12 col-md-6 col-lg-4   ">
                          <div
                            style={{ height: "280px" }}
                            className="card-dashboard"
                          >
                            <div
                              style={{
                                position: "relative",
                              }}
                              className="donut-company"
                            >
                              <Doughnut
                                data={dataDonut(
                                  tongTH,
                                  tongKH,
                                  tongTH / tongKH > 1
                                    ? "rgba(76, 175, 80, 0.5)"
                                    : "rgba(255, 177, 193, 1)",
                                  `DT LK tháng: `,
                                  `DT KH tháng: `
                                )}
                              />
                              <div
                                style={{
                                  position: "absolute",
                                  width: "100%",
                                  top: "57%",
                                  left: 0,
                                  textAlign: "center",
                                  lineHeight: "20px",
                                  fontSize: "20px",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize:
                                      widthWindow > 480 ? "16px" : "18px",
                                  }}
                                >
                                  {Number(
                                    Number(tongTH / tongKH).toFixed(2) * 100
                                  ).toFixed(0) + "%"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-12 mt-2">
                  <div className="row g-2">
                    {showDonutMonth &&
                      arrayCN.map((item, index) => (
                        <div
                          className=" col-lg-4 col-md-6 col-xs-12 h-100"
                          key={index}
                        >
                          <div
                            className="card-dashboard "
                            style={{ position: "relative" }}
                          >
                            <Doughnut
                              data={dataDonut(
                                item.th,
                                item.kh,
                                item.th / item.kh > 1
                                  ? "rgba(76, 175, 80, 0.5)"
                                  : "rgba(255, 177, 193, 1)",
                                "TH",
                                "KH"
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
                              <span
                                style={{
                                  fontSize: widthWindow > 480 ? "16px" : "18px",
                                }}
                              >
                                {Number(
                                  Number(item.th / item.kh).toFixed(2) * 100
                                ).toFixed(0) + "%"}
                              </span>
                            </div>
                            <Link to={`${item.shopCode}`}>
                              <h5 className="pt-3 text-center">{item.name}</h5>
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12  ">
                <div className="dash-line"></div>
                <div className="col-12 ">
                  <div className="row g-2">
                    <div className="col-12 col-lg-4 col-md-6 ">
                      <div className="card-dashboard h-100">
                        <h5 className=" number-contract pt-3 text-center">
                          {`Doanh thu lũy kế năm: `}
                        </h5>
                        <h4 className="text-center">
                          {dtLKYear.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h4>
                        <h5 className=" number-contract pt-3 text-center">{`Doanh thu kế hoạch năm: `}</h5>
                        <h4 className="text-center">
                          {dtKHYear.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </h4>
                        <h5 className="pt-3 number-contract text-center">{`Công ty 7 (Năm ${
                          selectMonth.split("-")[2]
                        })`}</h5>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xs-12 ">
                      <div className="card-dashboard">
                        <div
                          className=" donut-company"
                          style={{ position: "relative" }}
                        >
                          {showDonutYear && (
                            <>
                              <Doughnut
                                data={dataDonut(
                                  dtLKYear,
                                  dtKHYear,
                                  dtLKYear / dtKHYear > 1
                                    ? "rgba(76, 175, 80, 0.5)"
                                    : "rgba(255, 177, 193, 1)",
                                  `DT LK năm`,
                                  `DT KH năm`
                                )}
                              />
                            </>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              width: "100%",
                              top: "53%",
                              left: 0,
                              textAlign: "center",
                              lineHeight: "20px",
                              fontSize: "16px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: widthWindow > 480 ? "16px" : "18px",
                              }}
                            >
                              {Number(
                                Number(dtLKYear / dtKHYear).toFixed(2) * 100
                              ).toFixed(0) + "%"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 row mt-2 card-dashboard ">
                  <div
                    className="col-lg-12 col-xs-12 "
                    style={{ minHeight: "350px" }}
                  >
                    <Bar
                      options={optionsBarWith2AxisEmployee({
                        borderDash: [8, 6],
                        lineWidth: 2,
                        responsive: true,
                        fontSize: widthWindow > 480 ? 16 : 10,
                      })}
                      data={dataBarWith2AxisEmployee(
                        labelTopEmployees,
                        numberTopConTractEmployees,
                        doanhThuTopEmployees,
                        widthWindow > 480 ? 15 : 5,
                        widthWindow > 480 ? 50 : 15
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-primary btn-sm fs-6 mb-2 px-3 ms-5 "
                      onClick={() => {
                        navigate(`/dashboard-business-employee`);
                      }}
                    >
                      Chi tiết doanh thu nhân viên
                    </button>
                  </div>

                  <div
                    className="col-lg-12 col-xs-12 "
                    style={{ minHeight: "350px" }}
                  >
                    <Bar
                      options={optionsBarWith2AxisContract({
                        borderDash: [8, 6],
                        lineWidth: 2,
                        responsive: true,
                        fontSize: widthWindow > 480 ? 16 : 10,
                      })}
                      data={dataBarWith2AxisContract(
                        labelTopServices,
                        numberTopContractServices,
                        doanhThuTopServices,
                        widthWindow > 480 ? 15 : 5,
                        widthWindow > 480 ? 50 : 15
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-100 full-height-content">
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
