import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

type Props = {
  name: string;
};

export const DatePickerField = ({ ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};
