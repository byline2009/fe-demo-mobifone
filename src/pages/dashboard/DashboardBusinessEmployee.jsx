import React, { useEffect, useState } from "react";
import { getDashBoardBusinessEmployee } from "../../setup/axios/DashBoardBusiness";
import moment from "moment";
import { Line } from "react-chartjs-2";

import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";

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
const DasboardBusinessEmployee = () => {
  const [show, setShow] = useState(false);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const [selectYear, setSelectYear] = useState(
    moment(new Date()).format("DD-MM-YYYY")
  );
  const [widthWindow, setWidthWindow] = useState(0);
  const formSchema = Yup.object().shape({});
  const params = useParams();
  const navigate = useNavigate();

  const [labels, setLabels] = useState([]);
  const [dataTHLineThanhThuong, setDataTHLineThanhThuong] = useState([]);
  const [dataTHLineXuanMinh, setDataTHLineXuanMinh] = useState([]);
  const [dataTHLineTienHoang, setDataTHLineTienHoang] = useState([]);
  const [dataTHLineMyLien, setDataTHLineMyLien] = useState([]);
  const [dataTHLineMinhRin, setDataTHLineMinhRin] = useState([]);
  const [dataTHLineNgocHung, setDataTHLineNgocHung] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidthWindow(window.innerWidth);
      if (window.innerWidth < 480) {
        setOpen(false);
      }
    }
  }, []);
  useEffect(() => {
    getDashBoardBusinessEmployee({
      selectYear: selectYear,
    }).then((res) => {
      const arrayTemp = res.result.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.MONTH) - new Date(b.MONTH);
      });
      const arrayThanhThuong = arrayTemp.filter((item) => {
        if (item.amCode === "7GLAC10A1017") return item;
      });
      const arrayXuanMinh = arrayTemp.filter((item) => {
        if (item.amCode === "7KHOC01A1016") return item;
      });

      const arrayTienHoang = arrayTemp.filter((item) => {
        if (item.amCode === "7KHOC01A1011") return item;
      });

      const arrayMyLien = arrayTemp.filter((item) => {
        if (item.amCode === "3PYEC02A1020") return item;
      });

      const arrayMinhRin = arrayTemp.filter((item) => {
        if (item.amCode === "7KONC11A1024") return item;
      });
      const arrayNgocHung = arrayTemp.filter((item) => {
        if (item.amCode === "7DLAC12A1049") return item;
      });

      const labelArr = arrayThanhThuong.map((item) =>
        moment(item.MONTH).format("DD-MM-YYYY")
      );

      setLabels(labelArr);
      const dataTHArrThanhThuong = arrayThanhThuong.map(
        (item) => item.doanhThu
      );
      setDataTHLineThanhThuong(dataTHArrThanhThuong);

      const dataTHArrXuanMinh = arrayXuanMinh.map((item) => item.doanhThu);
      setDataTHLineXuanMinh(dataTHArrXuanMinh);

      const dataTHArrTienHoang = arrayTienHoang.map((item) => item.doanhThu);
      setDataTHLineTienHoang(dataTHArrTienHoang);

      const dataTHArrMyLien = arrayMyLien.map((item) => item.doanhThu);
      setDataTHLineMyLien(dataTHArrMyLien);

      const dataTHArrMinhRin = arrayMinhRin.map((item) => item.doanhThu);
      setDataTHLineMinhRin(dataTHArrMinhRin);
      if (
        arrayMinhRin &&
        arrayMinhRin.length > 0 &&
        moment(selectYear, "DD-MM-YYYY").format("YYYY") == "2023"
      ) {
        dataTHArrMinhRin.unshift(0, 0, 0, 0, 0);
      }

      let dataTHArrNgocHung = arrayNgocHung.map((item) => item.doanhThu);
      if (
        arrayNgocHung &&
        arrayNgocHung.length > 0 &&
        moment(selectYear, "DD-MM-YYYY").format("YYYY") == "2023"
      ) {
        dataTHArrNgocHung.unshift(0, 0, 0, 0, 0);
      }
      setDataTHLineNgocHung(dataTHArrNgocHung);

      setShow(true);
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
              getDashBoardBusinessEmployee({
                selectYear: date,
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
                      Dashboard Kinh Doanh Nhân Viên
                    </h5>{" "}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
        {show ? (
          <div className=" px-4">
            <div className="row gx-5">
              <div className=" col-lg-12 col-xs-12 col-md-12 ">
                <div className="col-12 mt-2">
                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-xs-12 mt-2">
                      {show && open ? (
                        <Line
                          datasetIdKey="id"
                          data={{
                            labels: labels,
                            datasets: [
                              {
                                id: 1,
                                label: "Trần thị Thanh Thương",
                                data: dataTHLineThanhThuong,
                                borderColor: "#ff6384",
                                pointRadius: 5,
                              },
                              {
                                id: 2,
                                label: "Hoàng Xuân Minh",
                                data: dataTHLineXuanMinh,
                                borderColor: "#3080d0",
                                pointRadius: 5,
                              },
                              {
                                id: 3,
                                label: "Nguyễn Tiến Hoàng",
                                data: dataTHLineTienHoang,
                                borderColor: "#3f9b12",
                                pointRadius: 5,
                              },
                              {
                                id: 4,
                                label: "Đặng Thị Mỹ Liên",
                                data: dataTHLineMyLien,
                                borderColor: "#600dfd",
                                pointRadius: 5,
                              },
                              {
                                id: 5,
                                label: "Phạm Minh Rin",
                                data: dataTHLineMinhRin,
                                borderColor: "#fd520d",
                                pointRadius: 5,
                              },

                              {
                                id: 6,
                                label: "Đỗ Ngọc Hùng",
                                data: dataTHLineNgocHung,
                                borderColor: "#dbb319",
                                pointRadius: 5,
                              },
                            ],
                          }}
                        ></Line>
                      ) : null}
                    </div>
                    <h4 className="mt-3">{`Tổng Doanh Thu Năm ${moment(
                      selectYear,
                      "DD-MM-YYYY"
                    ).format("YYYY")}`}</h4>
                    <div className="row mt-3">
                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Trần Thị Thanh Thương
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineThanhThuong
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Đỗ Ngọc Hùng
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineNgocHung
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Hoàng Xuân Minh
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineXuanMinh
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Nguyễn Tiến Hoàng
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineTienHoang
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Đặng Thị Mỹ Liên
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineMyLien
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-2 col-md-4">
                        <div className="card">
                          <div className="card-header border-0 py-2">
                            <p className="card-label fs-5 mb-1 text-center">
                              Phạm Minh Rin
                            </p>
                            <h5 className="text-center fw-bold">
                              {dataTHLineMinhRin
                                .reduce((partialSum, a) => partialSum + a, 0)
                                .toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="empty-content">
              <div className="w-100 full-height-content d-flex align-items-center justify-content-center">
                <TailSpin ariaLabel="loading-indicator" />{" "}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DasboardBusinessEmployee;
