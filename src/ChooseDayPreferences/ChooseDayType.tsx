import React, {FunctionComponent} from 'react';
import { Field } from "formik";
import {DayType} from './formik';

const ChooseDayType: FunctionComponent = () => (
  <>
    <Field as="select" name="type">
      <option value={DayType.ARTY}>Arty</option>
      <option value={DayType.SMART}>Smart</option>
      <option value={DayType.SPORTY}>Sporty</option>
    </Field>
  </>
);

export default ChooseDayType;