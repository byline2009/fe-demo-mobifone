import React, { useEffect, useRef, useState } from "react";
import {
  getFileExcelNhanVienNghiViec,
  getNhanVienNghiViec,
} from "../setup/axios/InitApi";
import ReactPaginate from "react-paginate";
import { TailSpin } from "react-loader-spinner";
import { getPageNumber } from "../helpers/ConvertHelper";
import ConfirmModal from "../components/modals/ConfirmModal";
import { SIGKILL } from "constants";

interface EmployeeOff {
  tinh: string;
  shopCode: string;
  shopName: string;
  empCode: string;
  empName: string;
  areaCode: string;
  description: string;
}
const limit = 10;

const NhanVienNghiViec = () => {
  const [arr, setArr] = useState<EmployeeOff[]>([]);
  const [loading, setLoading] = useState(true);
  const [forcePageIndex, setForcePageIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageTotal, setPageTotal] = useState(getPageNumber(totalCount, limit));
  const renderAfterCalled = useRef(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getNhanVienNghiViec({ skip: 0, limit: limit }).then((response: any) => {
        if (response) {
          const arrTemp: EmployeeOff[] = [];
          response &&
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
    setSkip(event.selected + 1 == -1 ? 0 : event.selected * limit);
    getNhanVienNghiViec({
      skip: event.selected + 1 == -1 ? 0 : event.selected * limit,
      limit: limit,
    }).then((response: any) => {
      const arrTemp: EmployeeOff[] = [];
      response &&
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
  const handleExport = (e: string) => {
    const isCurrentPage = e === "1" ? true : false;
    setLoadingExport(true);
    getFileExcelNhanVienNghiViec({
      skip: skip,
      limit: limit,
      isCurrentPage: isCurrentPage,
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
        <h4 className="title mb-3 me-5">Danh sách nhân viên nghỉ việc</h4>
        {loading ? (
          <div className="empty-content">
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <TailSpin ariaLabel="loading-indicator" />{" "}
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-end align-items-center">
              <div className="empty"></div>
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
              <table className="table table-row-dashed table-striped  table-row-gray-300 align-middle gs-0 gy-3">
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
          </>
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

export default NhanVienNghiViec;
