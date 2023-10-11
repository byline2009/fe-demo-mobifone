import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut } from "./chart/dataDonut";
import { TailSpin } from "react-loader-spinner";
import {
  dataBarWith2AxisContract,
  optionsBarWith2AxisContract,
} from "./chart/dataContract";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import {
  getDashBoardBusiness,
  getDashBoardSummary,
  getDashBoardTopEmployees,
  getDashBoardTopServices,
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
  const [numberContractMass, setNumberContractMass] = useState(0);
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

  useEffect(() => {
    getDashBoardBusiness({ month: selectMonth }).then((res) => {
      let arrayTemp = [];
      if (res && res.result && res.result.length > 0) {
        arrayTemp = res.result.map((item) => ({
          th: item.doanhThu,
          kh: item.kpiDoanhThu,
          name: item.displayName,
        }));
        console.log("check", arrayTemp);

        setArrayCN(arrayTemp);
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
    getDashBoardSummary().then((res) => {
      if (res && res.result && Object.keys(res.result)) {
        setDTLKYear(res.result.doanhThu);
        setDTKHYear(res.result.kpiDoanhThu);
        setNumberOfContractYear(res.result.numberOfContract);
        setShowDonutYear(true);
      }
    });
  }, []);

  useEffect(() => {
    console.log("dtKHYear", dtKHYear);
  }, [dtKHYear]);
  useEffect(() => {
    setTongTH(arrayCN.map((item) => item.th).reduce(sum));
    setTongKH(arrayCN.map((item) => item.kh).reduce(sum));
  }, [arrayCN]);

  return (
    <div className="dashboard-business">
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
              getDashBoardTopEmployees({ month: date }).then((res) => {
                if (res && res.result && res.result.length > 0) {
                  console.log("res.result", res.result);
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
                    <h5 className="title-pag text-center mt-2">
                      Dashboard Kinh Doanh Công nghệ số
                    </h5>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {show ? (
          <div className="container px-4">
            <div className="row gx-5">
              <div className=" col-lg-6 col-xs-12 col-md-12  border-solid">
                <div className="col-12 d-flex justify-content-center ">
                  <div className="col-12 d-flex justify-content-center">
                    <div className="d-flex flex-column justify-content-center">
                      <h5 className="number-contract pt-3 me-5">{`Số hợp đồng LK ${numberContractMass}`}</h5>

                      <h5 className="pt-3 ">
                        {`Công ty 7 `}
                        <span style={{ fontSize: "14px" }}>{`(Tháng ${
                          selectMonth.split("-")[1]
                        })`}</span>
                      </h5>
                    </div>

                    <div
                      className="p-3 border donut-company "
                      style={{ position: "relative" }}
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
                        <span>
                          {Number(
                            Number(tongTH / tongKH).toFixed(2) * 100
                          ).toFixed(0) + "%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <div className="row">
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

                        <h5 className="pt-3 text-center">{item.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12  ">
                <div className="col-12 d-flex justify-content-center">
                  <div className="d-flex flex-column justify-content-center">
                    <h5 className=" number-contract pt-3 me-5">{`Số hợp đồng LK năm: ${numberOfContractYear}`}</h5>
                    <h5 className=" number-contract pt-3 me-5">{`DT LK năm: ${dtLKYear.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}`}</h5>
                    <h5 className=" number-contract pt-3 me-5">{`DT KH năm: ${dtKHYear.toLocaleString(
                      "vi-VN",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}`}</h5>

                    <h5 className="pt-3 ">{`Công ty 7 (Năm ${
                      selectMonth.split("-")[2]
                    })`}</h5>
                  </div>
                  <div
                    className="p-3 border bg-card-info donut-company"
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
                      <span>
                        {Number(
                          Number(dtLKYear / dtKHYear).toFixed(2) * 100
                        ).toFixed(0) + "%"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row g-5 mt-2">
                  <div className="col-lg-12 col-xs-12 ">
                    <Bar
                      options={optionsBarWith2AxisEmployee}
                      data={dataBarWith2AxisEmployee(
                        labelTopEmployees,
                        numberTopConTractEmployees,
                        doanhThuTopEmployees
                      )}
                    />
                  </div>
                  <div className="col-lg-13 col-xs-12 ">
                    <Bar
                      options={optionsBarWith2AxisContract}
                      data={dataBarWith2AxisContract(
                        labelTopServices,
                        numberTopContractServices,
                        doanhThuTopServices
                      )}
                    />
                  </div>
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