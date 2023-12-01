import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import FormSelect from "../components/widgets/selects/FormSelect";
import { getFileExcelThaySim4G, getThaySim } from "../setup/axios/thaysimAPI";
import { getPageNumber } from "../helpers/ConvertHelper";
import ReactPaginate from "react-paginate";
import { TailSpin } from "react-loader-spinner";
import moment from "moment";
import SearchHeader from "../components/widgets/search/SearchHeader";
import {
  getFileExcelWarningContract,
  getWarningExpire,
} from "../setup/axios/warningExpire";
import ConfirmModal from "../components/modals/ConfirmModal";
interface InitWarningExpire {
  selectMonthYear: Date;
}

var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth() - 1);
const limit = 10;
const INIT_VALUES = {
  selectMonthYear: x,
} as InitWarningExpire;

interface IWarningExpire {
  contractId?: string;
  amCode?: string;
  amName?: string;
  productCode?: string;
  lifeCircle?: string;
  startedDate?: string;
  endDate?: string;
  cost?: string;
  costVAT?: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
}
const WarningExpireContract = () => {
  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState<InitWarningExpire>(INIT_VALUES);
  const [arr, setArr] = useState<IWarningExpire[]>([]);
  const [loading, setLoading] = useState(true);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  const [loadingExport, setLoadingExport] = useState(false);
  const [skip, setSkip] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      handleGetWarningExpire({
        skip: 0,
        month: initValues.selectMonthYear.getMonth() + 1,
        year: initValues.selectMonthYear.getFullYear(),
      });
    }
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    setPageTotal(getPageNumber(totalCount, limit));
  }, [totalCount]);

  const handleGetWarningExpire = (params: any) => {
    setLoading(true);
    getWarningExpire({
      skip: params.skip,
      limit: limit,
      month: params.month,
      year: params.year,
      type: params.type,
    }).then((response: any) => {
      const arrTemp: IWarningExpire[] = [];
      response &&
        response.data.map((item: any) => {
          const object = {
            contractId: item.CONTRACT_ID,
            amCode: item.AM_NAME,
            amName: item.AM_CODE,
            productCode: item.PRODUCT_CODE,
            lifeCycle: item.LIFE_CYCLE,
            startedDate: item.STARTED_DATE,
            endDate: item.END_DATE,
            cost: item.COST,
            costVAT: item.COST_VAT,
            customerName: item.CUSTOMER_NAME,
            customerPhone: item.CUSTOMER_PHONE,
            customerEmail: item.CUSTOMER_EMAIL,
            customerAddress: item.CUSTOMER_ADDRESS,
          };
          arrTemp.push(object);
        });
      setArr(arrTemp);

      setTotalCount(response.totalCount);
      setLoading(false);
    });
  };

  const handlePageChange = (event: any) => {
    setLoading(true);
    setSkip(event.selected + 1 == -1 ? 0 : event.selected * limit);
    handleGetWarningExpire({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      month: initValues.selectMonthYear.getMonth() + 1,
      year: initValues.selectMonthYear.getFullYear(),
    });
    setForcePageIndex(event.selected);
  };

  const handleExport = (e: string) => {
    const isCurrentPage = e === "1" ? true : false;
    setLoadingExport(true);
    getFileExcelWarningContract({
      skip: skip,
      limit: limit,
      isCurrentPage: isCurrentPage,
      month: initValues.selectMonthYear.getMonth() + 1,
      year: initValues.selectMonthYear.getFullYear(),
    })
      .then((response) => {
        if (response) {
          let url = window.URL.createObjectURL(response.data);
          let a = document.createElement("a");
          document.body.appendChild(a);
          a.setAttribute("style", "display: none");
          a.href = url;
          a.download = "canh_bao_thue_bao_het_han.xlsx";
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
    <div className="thaysim">
      <h4 className="title">Cảnh báo thuê bao hết hạn</h4>
      <div className="d-flex justify-content-between align-items-center">
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            const data = {
              year: values.selectMonthYear.getFullYear(),
              month: values.selectMonthYear.getMonth() + 1,
              skip: 0,
            };

            setInitValues({
              selectMonthYear: values.selectMonthYear,
            } as InitWarningExpire);
            handleGetWarningExpire(data);
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className=" filter mb-3 me-5">
                  <div className="filter-body d-flex flex-start">
                    <div className="select-filter">
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
                        callbackSetDate={(e: any) => {
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
        <button
          className="btn btn-primary btn-sm fs-6 mb-2 px-3 "
          onClick={() => {
            setShowConfirm(true);
          }}
        >
          {!loadingExport && (
            <span className="indicator-label">Export Excel</span>
          )}

          {loadingExport && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>

      <div>
        <div className="list-subscriber">
          {loading ? (
            <div className="empty-content">
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <TailSpin ariaLabel="loading-indicator" />{" "}
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-row-dashed table-striped  table-row-gray-300 align-middle gs-0 gy-3">
                <thead className="">
                  <tr>
                    <th scope="col" className="ps-1">
                      Hợp đồng
                    </th>
                    <th scope="col">Khách hàng</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Am Code</th>
                    <th scope="col">Am Name</th>
                    <th scope="col">Product Code</th>
                    <th scope="col">Ngày kích hoạt</th>
                    <th scope="col">Ngày hết hạn</th>
                  </tr>
                </thead>
                <tbody>
                  {(arr as any).map((item: IWarningExpire, index: number) => (
                    <tr key={index}>
                      <td className="ps-1">{item.contractId}</td>
                      <td>{item.customerName}</td>
                      <td>{item.customerAddress}</td>
                      <td>{item.customerPhone}</td>
                      <td>{item.amCode}</td>
                      <td>{item.amName}</td>
                      <td>{item.productCode}</td>
                      <td>
                        {item.startedDate &&
                          moment(new Date(item.startedDate)).format(
                            "DD/MM/YYYY"
                          )}
                      </td>
                      <td>
                        {item.endDate &&
                          moment(new Date(item.endDate)).format("MM/YYYY")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="d-flex justify-content-end align-items-center flex-wrap pt-10">
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
          </div>
        </div>
      </div>
      <ConfirmModal
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
      />
    </div>
  );
};

export default WarningExpireContract;
