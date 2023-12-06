import React, { useEffect, useState } from "react";
import { getDashBoardBusinessDetail } from "../../setup/axios/DashBoardBusiness";
import moment from "moment";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { dataDonut } from "../chart/dataDonut";
import { TailSpin } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";

import {
  dataBarWith2AxisContract,
  optionsBarWith2AxisContract,
} from "../chart/dataContract";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, Form, Formik } from "formik";
import { DatePickerField } from "../../components/widgets/datePickers/DatePickerField";
import { useNavigate } from "react-router-dom";

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
} from "../chart/dataEmployee";

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
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectYear: x,
};
const DasboardBusinessDetail = () => {
  const [arrayData, setArrayData] = useState([]);
  const [show, setShow] = useState(false);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [selectYear, setSelectYear] = useState(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [widthWindow, setWidthWindow] = useState(0);
  const formSchema = Yup.object().shape({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    getDashBoardBusinessDetail({
      selectYear: selectYear,
      shopCode: params.id,
    }).then((res) => {
      let arrayTemp = [];
      if (res && res.result && res.result.length > 0) {
        arrayTemp = res.result.map((item) => ({
          th: item.doanhThu,
          kh: item.kpiDoanhThu,
          name: item.displayName,
          month: item.MONTH,
        }));
        console.log("arrayTemp", arrayTemp);

        const arraySort = []
          .concat(arrayTemp)
          .sort((a, b) => b.th / b.kh - a.th / a.kh);
        setArrayData(arraySort);
        setShow(true);
      }
    });
  }, []);
  return (
    <div className="dashboard-business">
      <div className="card-dashboard bg-light">
        <button
          className="btn btn-primary btn-sm fs-6 mb-2 px-3 ms-5 "
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            const date = moment(values.selectYear).format("DD-MM-YYYY");
            setInitValues({
              selectYear: values.selectYear,
            });
            if (date !== selectYear) {
              setSelectYear(date);
              setShow(false);
              getDashBoardBusinessDetail({
                selectYear: date,
                shopCode: params.shopCode,
              }).then((res) => {
                let arrayTemp = [];
                if (res && res.result && res.result.length > 0) {
                  arrayTemp = res.result.map((item) => ({
                    th: item.doanhThu,
                    kh: item.kpiDoanhThu,
                    name: item.displayName,
                    month: item.MONTH,
                  }));
                  console.log("arrayTemp", arrayTemp);

                  const arraySort = []
                    .concat(arrayTemp)
                    .sort((a, b) => b.th / b.kh - a.th / a.kh);
                  setArrayData(arraySort);
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
                        htmlFor="selectYear"
                        className="form-label fs-6 fw-bold text-dark me-2"
                      >
                        Year
                      </label>
                      <DatePickerField
                        name={`selectYear`}
                        dateFormat="yyyy"
                        disabled={false}
                        callbackSetDate={(e) => {
                          formikProps.handleSubmit();
                        }}
                        maxDate={new Date()}
                        showYearDropdown={true}
                        showYearPicker={true}
                      ></DatePickerField>

                      <div className="text-danger">
                        <ErrorMessage name="selectMonthYear" />
                      </div>
                    </div>
                    <h5 className="title-page text-center mt-2">
                      Dashboard Kinh Doanh Mass{" "}
                      <span>
                        {arrayData && arrayData.length > 0
                          ? arrayData[0].name
                          : ""}
                      </span>
                    </h5>{" "}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {show ? (
          <div className="container px-4">
            <div className="row gx-5">
              <div className=" col-lg-12 col-xs-12 col-md-12 ">
                <div className="col-12 mt-2">
                  <div className="row">
                    {arrayData.map((item, index) => (
                      <div
                        className="p-3 col-lg-2 col-md-6 col-xs-12"
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
                        <h5 className="pt-3 text-center">
                          {moment(item.month).format("MM-YYYY")}
                        </h5>
                      </div>
                    ))}
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
};

export default DasboardBusinessDetail;
