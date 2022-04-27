import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import styled from "styled-components";

type Props = {
  name: string;
};

const StyledDatePickerWrapper = styled.div`
  & .datepicker {
    padding: 6px;
    margin-top: 9px;
    margin-left: 9px;
    cursor: pointer;
  }
`;

export const DatePickerField = ({ ...props }: Props) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props.name);
  return (
    <StyledDatePickerWrapper>
      <DatePicker
        {...field}
        {...props}
        className="datepicker"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
      />
    </StyledDatePickerWrapper>
  );
};
