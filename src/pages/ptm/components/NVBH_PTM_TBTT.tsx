import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DatePickerField } from "../../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import { getPageNumber } from "../../../helpers/ConvertHelper";
import { get_CP_PTM_NVBH_TBTT } from "../../../setup/axios/Ptm";
import { ErrorMessage, Form, Formik } from "formik";
import { TailSpin } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
interface NVBH_PTM_TBTT {
  tinh: string;
  pay_month: string;
  shop_code: string;
  emp_code: string;
  sub_id: string;
  isdn: string;
  act_status_1?: string;
  month_n?: string;
  charge: string;
  comm_amount: string;
  description?: string;
  verify: boolean;
  verify_number?: string;
  sta_datetime?: string;
  ngay_xacminh?: string;
  xacminh_songay?: string;
  vp_8tieuchi?: string;
  tinh_psc_dau?: string;
  thang_psc_dau?: string;
  code?: string;
  charge_price?: string;
  accept?: string;
  video_call?: string;
  reg_type?: string;
  ngay_sing?: string;
  id_no?: string;
  id_issue_place?: string;
  pp_no?: string;
  pp_issue_place?: string;
  thutu_idno?: string;
  thutu_ppno?: string;
  product_code?: string;
}

interface InitValues {
  selectMonthYear: Date;
}
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth() - 1);
const limit = 10;
const INIT_VALUES = {
  selectMonthYear: x,
} as InitValues;
const NVBH_PTM_TBTT = () => {
  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState<InitValues>(INIT_VALUES);
  const renderAfterCalled = useRef(false);
  const [arr, setArr] = useState<NVBH_PTM_TBTT[]>([]);
  const [loading, setLoading] = useState(true);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  useEffect(() => {
    if (!renderAfterCalled.current) {
      setLoading(true);
      get_CP_PTM_NVBH_TBTT({
        skip: 0,
        limit: limit,
        month: initValues.selectMonthYear.getMonth() + 1,
        year: initValues.selectMonthYear.getFullYear(),
      }).then((response: any) => {
        if (response) {
          const arrTemp: NVBH_PTM_TBTT[] = [];
          response &&
            response.data.map((item: any) => {
              const object = {
                tinh: item[0],
                pay_month: item[1],
                shop_code: item[2],
                emp_code: item[3],
                sub_id: item[4],
                isdn: item[5],
                act_status_1: item[6],
                month_n: item[7],
                charge: item[8],
                comm_amount: item[9],
                description: item[10],
                verify: item[11],
                verify_number: item[12],
                sta_datetime: item[13],
                ngay_xacminh: item[14],
                xacminh_songay: item[15],
                vp_8tieuchi: item[16],
                tinh_psc_dau: item[17],
                thang_psc_dau: item[18],
                code: item[19],
                charge_price: item[20],
                accept: item[21],
                video_call: item[22],
                reg_type: item[23],
                ngay_sing: item[24],
                id_no: item[25],
                id_issue_place: item[26],
                pp_no: item[26],
                pp_issue_place: item[27],
                thutu_idno: item[28],
                thutu_ppno: item[29],
                product_code: item[30],
              };
              arrTemp.push(object);
            });
          setArr(arrTemp);
          console.log("arr", arr);
          setTotalCount(response.totalCount);
          setLoading(false);
        }
      });
    }
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    setPageTotal(getPageNumber(totalCount, limit));
  }, [totalCount]);

  const handlePageChange = (event: any) => {
    setLoading(true);
    get_CP_PTM_NVBH_TBTT({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      limit: limit,
      month: initValues.selectMonthYear.getMonth() + 1,
      year: initValues.selectMonthYear.getFullYear(),
    }).then((response: any) => {
      const arrTemp: NVBH_PTM_TBTT[] = [];
      response &&
        response.data.map((item: any) => {
          const object = {
            tinh: item[0],
            pay_month: item[1],
            shop_code: item[2],
            emp_code: item[3],
            sub_id: item[4],
            isdn: item[5],
            act_status_1: item[6],
            month_n: item[7],
            charge: item[8],
            comm_amount: item[9],
            description: item[10],
            verify: item[11],
            verify_number: item[12],
            sta_datetime: item[13],
            ngay_xacminh: item[14],
            xacminh_songay: item[15],
            vp_8tieuchi: item[16],
            tinh_psc_dau: item[17],
            thang_psc_dau: item[18],
            code: item[19],
            charge_price: item[20],
            accept: item[21],
            video_call: item[22],
            reg_type: item[23],
            ngay_sing: item[24],
            id_no: item[25],
            id_issue_place: item[26],
            pp_no: item[26],
            pp_issue_place: item[27],
            thutu_idno: item[28],
            thutu_ppno: item[29],
            product_code: item[30],
          };
          arrTemp.push(object);
          setArr(arrTemp);
        });
      setTotalCount(response.totalCount);
      setLoading(false);
    });
    setForcePageIndex(event.selected);
  };

  return (
    <div className="nvbh-tbtt">
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          const data = {
            year: values.selectMonthYear.getFullYear(),
            month: values.selectMonthYear.getMonth() + 1,
            skip: 0,
            limit: 10,
          };

          setInitValues({
            selectMonthYear: values.selectMonthYear,
          } as InitValues);
          setLoading(true);
          await get_CP_PTM_NVBH_TBTT(data).then((response) => {
            const arrTemp: NVBH_PTM_TBTT[] = [];
            response &&
              response.data.map((item: any) => {
                const object = {
                  tinh: item[0],
                  pay_month: item[1],
                  shop_code: item[2],
                  emp_code: item[3],
                  sub_id: item[4],
                  isdn: item[5],
                  act_status_1: item[6],
                  month_n: item[7],
                  charge: item[8],
                  comm_amount: item[9],
                  description: item[10],
                  verify: item[11],
                  verify_number: item[12],
                  sta_datetime: item[13],
                  ngay_xacminh: item[14],
                  xacminh_songay: item[15],
                  vp_8tieuchi: item[16],
                  tinh_psc_dau: item[17],
                  thang_psc_dau: item[18],
                  code: item[19],
                  charge_price: item[20],
                  accept: item[21],
                  video_call: item[22],
                  reg_type: item[23],
                  ngay_sing: item[24],
                  id_no: item[25],
                  id_issue_place: item[26],
                  pp_no: item[26],
                  pp_issue_place: item[27],
                  thutu_idno: item[28],
                  thutu_ppno: item[29],
                  product_code: item[30],
                };
                arrTemp.push(object);
              });
            setArr(arrTemp);
            setTotalCount(response.totalCount);
            setLoading(false);
          });
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <div className=" filter mb-3 mt-2">
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
              <table className="table table-row-dashed table-striped  table-row-gray-300 align-middle gs-0 gy-4">
                <thead className="">
                  <tr>
                    <th scope="col">Tháng tính lương</th>
                    <th scope="col">Shopcode</th>
                    <th scope="col">isdn</th>
                    <th scope="col">Sub_Id</th>
                    <th scope="col">Emp_code</th>
                    <th scope="col">accept</th>
                    <th scope="col">description</th>
                  </tr>
                </thead>
                <tbody>
                  {(arr as any).map((item: NVBH_PTM_TBTT, index: number) => (
                    <tr key={index}>
                      {moment(new Date(item.pay_month)).format("DD/MM/YYYY")}
                      <th>{item.shop_code}</th>
                      <th>{item.isdn}</th>
                      <th>{item.sub_id}</th>
                      <th>{item.emp_code}</th>
                      <th>{item.accept}</th>
                      <th>{item.description}</th>
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
    </div>
  );
};

export default NVBH_PTM_TBTT;
