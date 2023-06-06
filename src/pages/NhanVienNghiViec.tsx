import React, { useEffect, useState } from "react";
import { getNhanVienNghiViec } from "../setup/axios/InitApi";
interface ReturnData {
  data: String[];
}

const NhanVienNghiViec = () => {
  const [arr, setArr] = useState<any[]>([]);

  useEffect(() => {
    getNhanVienNghiViec().then((response: any) => {
      console.log(response);
      setArr(response);
    });
  }, []);
  return (
    <div>
      {arr ? (
        <div className="employee-off">
          <h4 className="title">Danh sách nhân viên nghỉ việc</h4>
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
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
              {arr.map((item: any, index: number) => (
                <tr key={index}>
                  <th>{item[0]}</th>
                  <th>{item[1]}</th>
                  <th>{item[2]}</th>
                  <th>{item[3]}</th>
                  <th>{item[4]}</th>
                  <th>{item[5]}</th>
                  <th>{item[6]}</th>
                </tr>
              ))}
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NhanVienNghiViec;
