import React, { FC } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import CustomDateInput from "./CustomDateInput";
type PropsType = {
  name: string;
  dateFormat?: string;
  showMonthYearPicker?: boolean;
  callbackSetDate?: (e: Date) => void;
  disabled?: boolean;
};
export const DatePickerField: FC<PropsType> = ({
  name,
  dateFormat = "dd/MM/yyyy",
  showMonthYearPicker,
  callbackSetDate,
  disabled,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);
  return (
    <DatePicker
      // {...field}
      {...(name as {})}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
        callbackSetDate && callbackSetDate(val!);
      }}
      dateFormat={dateFormat ? dateFormat : "dd/MM/yyyy"}
      customInput={<CustomDateInput />}
      showMonthYearPicker={showMonthYearPicker ? showMonthYearPicker : false}
      disabled={disabled}
    />
  );
};
