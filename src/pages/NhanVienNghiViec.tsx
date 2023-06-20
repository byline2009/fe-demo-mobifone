import React, { useEffect, useRef, useState } from "react";
import { getNhanVienNghiViec } from "../setup/axios/InitApi";
import ReactPaginate from "react-paginate";
import { TailSpin } from "react-loader-spinner";
import { getPageNumber } from "../helpers/ConvertHelper";

interface EmployeeOff {
  tinh: string;
  shopCode: string;
  shopName: String;
  empCode: String;
  empName: String;
  areaCode: String;
  description: String;
}
const limit = 10;

const NhanVienNghiViec = () => {
  const [arr, setArr] = useState<EmployeeOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getNhanVienNghiViec({ skip: 0, limit: limit }).then((response: any) => {
        if (response) {
          const arrTemp: EmployeeOff[] = [];
          response.data.map((item: any) => {
            const object = {
              tinh: item[0],
              shopCode: item[1],
              shopName: item[2],
              empCode: item[3],
              empName: item[4],
              areaCode: item[5],
              description: item[6],
            };
            arrTemp.push(object);
            setArr(arrTemp);
          });
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
    getNhanVienNghiViec({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      limit: limit,
    }).then((response: any) => {
      const arrTemp: EmployeeOff[] = [];
      response.data.map((item: any) => {
        const object = {
          tinh: item[0],
          shopCode: item[1],
          shopName: item[2],
          empCode: item[3],
          empName: item[4],
          areaCode: item[5],
          description: item[6],
        };
        arrTemp.push(object);
      });
      setArr(arrTemp);
      setTotalCount(response.totalCount);
      setLoading(false);
    });
    setForcePageIndex(event.selected);
  };

  return (
    <div>
      <div className="employee-off">
        <h4 className="title">Danh sách nhân viên nghỉ việc</h4>
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
                  <th scope="col">Mã Tỉnh-huyện</th>
                  <th scope="col">Lí do nghỉ việc</th>
                </tr>
              </thead>
              <tbody>
                {(arr as any).map((item: EmployeeOff, index: number) => (
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
  );
};

export default NhanVienNghiViec;
