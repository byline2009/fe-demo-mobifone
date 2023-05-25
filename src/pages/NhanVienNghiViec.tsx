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
        <>
          <h1>Danh sách nhân viên nghỉ việc</h1>
          {/* <pre>{arr}</pre> */}
          <table>
            {arr.map((item: any) => (
              <tr>
                <th></th>
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
        </>
      ) : null}
    </div>
  );
};

export default NhanVienNghiViec;
