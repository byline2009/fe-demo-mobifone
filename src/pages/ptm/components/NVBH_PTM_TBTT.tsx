import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { DatePickerField } from "../../../components/widgets/datePickers/DatePickerField";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import { getPageNumber } from "../../../helpers/ConvertHelper";
import { get_CP_PTM_NVBH_TBTT } from "../../../setup/axios/Ptm";
import { ErrorMessage, Form, Formik } from "formik";
import { TailSpin } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import SearchHeader from "../../../components/widgets/search/SearchHeader";
interface NVBH_PTM_TBTT {
  tinh?: string;
  pay_month: string;
  shop_code: string;
  emp_code: string;
  sub_id: string;
  isdn: string;
  accept: string;
  description?: string;
  comm_amount?: string;
  code?: string;
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
  const [skip, setSkip] = useState(0);
  const [textSearch, setTextSearch] = useState("");

  useEffect(() => {
    if (!renderAfterCalled.current) {
      handleGet_CP_PTM_NVBH_TBTT({
        skip: skip,
        limit: limit,
        month: initValues.selectMonthYear.getMonth() + 1,
        year: initValues.selectMonthYear.getFullYear(),
      });
    }
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    setPageTotal(getPageNumber(totalCount, limit));
  }, [totalCount]);

  const handlePageChange = (event: any) => {
    setSkip(event.selected + 1 == -1 ? 0 : event.selected * limit);
    handleGet_CP_PTM_NVBH_TBTT({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      limit: limit,
      month: initValues.selectMonthYear.getMonth() + 1,
      year: initValues.selectMonthYear.getFullYear(),
    });
    setForcePageIndex(event.selected);
  };
  const handleGet_CP_PTM_NVBH_TBTT = (params: any) => {
    console.log("check ne");
    setLoading(true);
    get_CP_PTM_NVBH_TBTT({
      skip: params.skip,
      limit: params.limit,
      month: params.month,
      year: params.year,
      textSearch: params.textSearch,
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
            accept: item[6],
            description: item[7],
            comm_amount: item[8],
            code: item[9],
          };
          arrTemp.push(object);
        });
      setArr(arrTemp);

      setTotalCount(response.totalCount);
      setLoading(false);
    });
  };

  return (
    <div className="nvbh-tbtt">
      <div className="d-flex flex-start align-items-center">
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={formSchema}
          onSubmit={async (values, { resetForm }) => {
            setInitValues({
              selectMonthYear: values.selectMonthYear,
            } as InitValues);
            handleGet_CP_PTM_NVBH_TBTT({
              skip: skip,
              limit: limit,
              month: values.selectMonthYear.getMonth() + 1,
              year: values.selectMonthYear.getFullYear(),
            });
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className=" filter mb-3 mt-2 me-5">
                  <div className="filter-body d-flex flex-start">
                    <div className="select-filter me-5">
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
        <SearchHeader
          textSearch={textSearch}
          textHolder="Nhập thông tin ..."
          callback={(e) => {
            setTextSearch(e);
            handleGet_CP_PTM_NVBH_TBTT({
              skip: skip,
              limit: limit,
              month: initValues.selectMonthYear.getMonth() + 1,
              year: initValues.selectMonthYear.getFullYear(),
              textSearch: e,
            });
          }}
        />
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
                    <th scope="col">Tháng tính lương</th>
                    <th scope="col">Shopcode</th>
                    <th scope="col">isdn</th>
                    <th scope="col">Sub_Id</th>
                    <th scope="col">Emp_code</th>
                    <th scope="col">Code</th>
                    <th scope="col">Comm_amount</th>
                    <th scope="col">accept</th>
                    <th scope="col">description</th>
                  </tr>
                </thead>
                <tbody>
                  {(arr as any).map((item: NVBH_PTM_TBTT, index: number) => (
                    <tr key={index}>
                      <th>
                        {moment(new Date(item.pay_month)).format("DD/MM/YYYY")}
                      </th>
                      <th>{item.shop_code}</th>
                      <th>{item.isdn}</th>
                      <th>{item.sub_id}</th>
                      <th>{item.emp_code}</th>
                      <th>{item.code}</th>
                      <th>{item.comm_amount}</th>
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
