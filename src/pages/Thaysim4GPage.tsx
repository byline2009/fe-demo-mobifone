import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import FormSelect from "../components/widgets/selects/FormSelect";
import { getThaySim } from "../setup/axios/thaysimAPI";
import { getPageNumber } from "../helpers/ConvertHelper";
import ReactPaginate from "react-paginate";
import { TailSpin } from "react-loader-spinner";
interface ThaySim4G {
  isdn: string;
  shopCode: string;
  shopName: String;
  shopType: String;
  issueDateTime: String;
  empCode: String;
  empName: String;
  province: String;
  districtName: String;
  reasonId: String;
  loaiTB: String;
  thangtt: String;
}
interface InitThaySim4G {
  selectMonthYear: Date;
  selectType: String;
}
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth() - 1);
const limit = 10;
const INIT_VALUES = {
  selectMonthYear: x,
  selectType: "NVBH",
} as InitThaySim4G;
const Thaysim4GPage = () => {
  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState<InitThaySim4G>(INIT_VALUES);
  const renderAfterCalled = useRef(false);
  const [arr, setArr] = useState<ThaySim4G[]>([]);
  const [loading, setLoading] = useState(true);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  useEffect(() => {
    if (!renderAfterCalled.current) {
      setLoading(true);
      getThaySim({
        skip: 0,
        limit: limit,
        type: "NVBH",
        month: initValues.selectMonthYear.getMonth() + 1,
        year: initValues.selectMonthYear.getFullYear(),
      }).then((response: any) => {
        if (response) {
          const arrTemp: ThaySim4G[] = [];
          response.data.map((item: any) => {
            const object = {
              isdn: item[0],
              shopCode: item[1],
              shopName: item[2],
              shopType: item[3],
              issueDateTime: item[4],
              empCode: item[5],
              empName: item[6],
              province: item[7],
              districtName: item[8],
              reasonId: item[9],
              loaiTB: item[13],
              thangtt: item[16],
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
    getThaySim({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      limit: limit,
      month: initValues.selectMonthYear.getMonth() + 1,
      year: initValues.selectMonthYear.getFullYear(),
      type: initValues.selectType,
    }).then((response: any) => {
      const arrTemp: ThaySim4G[] = [];
      response.data.map((item: any) => {
        const object = {
          isdn: item[0],
          shopCode: item[1],
          shopName: item[2],
          shopType: item[3],
          issueDateTime: item[4],
          empCode: item[5],
          empName: item[6],
          province: item[7],
          districtName: item[8],
          reasonId: item[9],
          loaiTB: item[13],
          thangtt: item[16],
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
    <div className="thaysim">
      <h4 className="title">Chi phí thay sim 4G</h4>
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
            type: values.selectType,
          };

          setInitValues({
            selectMonthYear: values.selectMonthYear,
            selectType: values.selectType,
          } as InitThaySim4G);
          setLoading(true);
          await getThaySim(data).then((response) => {
            const arrTemp: ThaySim4G[] = [];
            response.data.map((item: any) => {
              const object = {
                isdn: item[0],
                shopCode: item[1],
                shopName: item[2],
                shopType: item[3],
                issueDateTime: item[4],
                empCode: item[5],
                empName: item[6],
                province: item[7],
                districtName: item[8],
                reasonId: item[9],
                loaiTB: item[13],
                thangtt: item[16],
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
              <div className=" filter mb-3">
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
                  <div className="select-filter">
                    <label
                      htmlFor="type"
                      className="form-label fs-6 fw-bolder text-dark required me-2"
                    >
                      Đối tượng
                    </label>
                    <FormSelect
                      name="selectType"
                      options={[
                        { label: "NVBH", value: "NVBH" },
                        { label: "GDV", value: "GDV" },
                        { label: "AM", value: "AM" },
                        { label: "Đại lý", value: "Dai ly" },
                      ]}
                      callback={(e: any) => {
                        formikProps.handleSubmit();
                      }}
                    />
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
                    <th scope="col">Tỉnh</th>
                    <th scope="col">Shopcode</th>
                    <th scope="col">Huyện</th>
                    <th scope="col">Mã nvpt</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Ngày kích hoạt</th>
                    <th scope="col">Tháng tính lương</th>
                  </tr>
                </thead>
                <tbody>
                  {(arr as any).map((item: ThaySim4G, index: number) => (
                    <tr key={index}>
                      <th>{item.isdn}</th>
                      <th>{item.shopCode}</th>
                      <th>{item.shopName}</th>
                      <th>{item.empCode}</th>
                      <th>{item.empName}</th>
                      <th>{item.issueDateTime}</th>
                      <th>{item.thangtt}</th>
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
export default Thaysim4GPage;
