import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { DatePickerField } from "../components/widgets/datePickers/DatePickerField";
import FormSelect from "../components/widgets/selects/FormSelect";
import { getThaySim } from "../setup/axios/thaysimAPI";
const INIT_VALUES = {
  selectMonthYear: new Date(),
  selectType: { label: "Nvbh", value: "nvbh" },
};
const Thaysim4GPage = () => {
  const formSchema = Yup.object().shape({});
  const [initValues, setInitValues] = useState(INIT_VALUES);

  return (
    <div className="thaysim">
      <h4 className="title">Chi phí thay sim 4G</h4>
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        validationSchema={formSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log("values", values);
          const data = {
            year: values.selectMonthYear.getFullYear(),
            month: values.selectMonthYear.getMonth(),
            skip: 0,
            limit: 10,
            type: values.selectType.value,
          };
          await getThaySim(data).then((resolve) => {
            console.log("resolve", resolve);
          });
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <div className=" filter">
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
                        console.log("e", e);
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
                        { label: "Nvbh", value: "nvbh" },
                        { label: "Gdv", value: "gdv" },
                        { label: "Am", value: "am" },
                        { label: "Đại lý", value: "daily" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Thaysim4GPage;
