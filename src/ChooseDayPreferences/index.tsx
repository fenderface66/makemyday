import React, {FunctionComponent} from 'react';
import {Form, withFormik} from "formik";
import formikConfig from './formik';
import ChooseDayType from "./ChooseDayType";

const ChooseDayPreferences: FunctionComponent = () => (
 <Form>
   <ChooseDayType />
   <button type="submit">Submit</button>
 </Form>
);

export default withFormik(formikConfig)(ChooseDayPreferences);