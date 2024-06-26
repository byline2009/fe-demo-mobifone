import React, { useEffect, useRef, useState } from "react";
import { getFileDoanhthuPlatform } from "../setup/axios/InitApi";
import ReactPaginate from "react-paginate";
import { TailSpin } from "react-loader-spinner";
import { getPageNumber } from "../helpers/ConvertHelper";
import ConfirmModal from "../components/modals/ConfirmModal";
import moment from "moment";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";

const limit = 10;
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth());
const INIT_VALUES = {
  selectMonth: x,
};

const PlatFormPage = () => {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  const renderAfterCalled = useRef(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [skip, setSkip] = useState(0);
  const [initValues, setInitValues] = useState(INIT_VALUES);
  const formSchema = Yup.object().shape({});

  useEffect(() => {
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    setPageTotal(getPageNumber(totalCount, limit));
  }, [totalCount]);
  const handlePageChange = (event) => {
    setLoading(true);
    setSkip(event.selected + 1 == -1 ? 0 : event.selected * limit);
  };

  const handleExport = (e) => {
    // const today = new Date();
    // const yyyy = today.getFullYear();
    // let mm = today.getMonth() + 1; // Months start at 0!
    // let dd = "01";
    // if (mm < 10) mm = "0" + mm;

    // const formattedToday = dd + "-" + mm + "-" + yyyy;

    const isCurrentPage = e === "1" ? true : false;
    console.log(
      "initValues.selectMonth",
      initValues.selectMonth,
      moment(initValues.selectMonth).format("DD-MM-yyyy")
    );
    setLoadingExport(true);
    getFileDoanhthuPlatform({
      skip: skip,
      limit: limit,
      isCurrentPage: isCurrentPage,
      month: moment(initValues.selectMonth).format("DD-MM-yyyy"),
    })
      .then((response) => {
        if (response) {
          let url = window.URL.createObjectURL(response.data);
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.href = url;
          a.download = "employee.xlsx";
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
        setLoadingExport(false);
      })
      .catch((error) => {
        setLoadingExport(false);
      });
  };

  return (
    <div>
      <div className="employee-off">
        <h4 className="title mb-3 me-5">Doanh Thu Platform tháng hiện tại</h4>

        {/* <DatePickerField
            showMonthYearPicker={true}
            name={`selectMonthYear`}
            dateFormat="MM/yyyy"
            disabled={false}
            callbackSetDate={(e) => {
              const date = moment(e).format("DD-MM-YYYY");
              setSelectMonth(date);
            }}
            maxDate={new Date()}
          ></DatePickerField> */}
        <div className="d-flex select-filter">
          <Formik
            enableReinitialize={true}
            initialValues={initValues}
            validationSchema={formSchema}
            onSubmit={async (values, { resetForm }) => {
              setInitValues({
                selectMonth: values.selectMonth,
              });
            }}
          >
            {(formikProps) => {
              return (
                <Form>
                  <div className=" filter mb-3 me-5">
                    <div className="filter-body d-flex flex-start">
                      <div className="select-filter">
                        <label
                          htmlFor="selectMonth"
                          className="form-label fs-6 fw-bold text-dark me-2"
                        >
                          Tháng
                        </label>
                        <DatePickerField
                          showMonthYearPicker={true}
                          name={`selectMonth`}
                          dateFormat="MM/yyyy"
                          disabled={false}
                          callbackSetDate={(e) => {
                            setInitValues({
                              ...initValues,
                              selectMonth: e,
                            });
                          }}
                        ></DatePickerField>

                        <div className="text-danger">
                          <ErrorMessage name="selectMonth" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        {loading ? (
          <div className="empty-content">
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <TailSpin ariaLabel="loading-indicator" />{" "}
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-start align-items-center">
              <div className="empty"></div>
              <button
                className="btn btn-primary btn-sm fs-6 mb-2 px-3 "
                onClick={() => {
                  // setShowConfirm(true);
                  handleExport();
                }}
              >
                {!loadingExport && (
                  <span className="indicator-label">Export Excel</span>
                )}

                {loadingExport && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
            <div className="table-responsive">
              {/* <table className="table table-row-dashed table-striped  table-row-gray-300 align-middle gs-0 gy-3">
                <thead className="">
                  <tr>
                    <th scope="col">Tỉnh</th>
                    <th scope="col">Shopcode</th>
                    <th scope="col">Huyện</th>
                    <th scope="col">Mã nvpt</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Mã Tỉnh-huyện</th>
                    <th scope="col">Lí do nghỉ việc</th>
                  </tr>
                </thead>
                <tbody>
                  {arr.map((item, index) => (
                    <tr key={index}>
                      <th>{item.tinh}</th>
                      <th>{item.shopCode}</th>
                      <th>{item.shopName}</th>
                      <th>{item.empCode}</th>
                      <th>{item.empName}</th>
                      <th>{item.areaCode}</th>
                      <th>{item.description}</th>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </>
        )}
        {/* <div className="d-flex justify-content-end align-items-center flex-wrap pt-10">
          <div className="fs-6 me-2 fw-bold text-gray-700">{`Showing 1 to 10 of ${totalCount} entries`}</div>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={pageTotal}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            forcePage={forcePageIndex}
          />
        </div> */}
      </div>
      {/* <ConfirmModal
        onConfirm={(e) => {
          setShowConfirm(false);
          handleExport(e);
        }}
        onClose={() => {
          setShowConfirm(false);
        }}
        title="Thông báo"
        visible={showConfirm}
        isDanger={true}
      /> */}
    </div>
  );
};

export default PlatFormPage;
