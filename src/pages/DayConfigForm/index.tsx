import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import api from "../../api";
import Cookies from "js-cookie";
import {User} from "../../App";
import {Redirect} from 'react-router-dom'
type Values = {
  requested_day_periods: ("morning" | "afternoon" | "early_evening" | "late_evening")[]
}

export enum Status {
  HAS_INTERESTS = 'HAS_INTERESTS',
  HAS_NO_INTERESTS = 'HAS_NO_INTERESTS',
}

const DayConfigForm = () => {
  const [interestsStatus, setInterestsStatus] = useState<Status>(Status.HAS_INTERESTS);
  useEffect(() => {
    const fetchInterestsStatus = async () => {
      const res = await api(`${process.env.REACT_APP_API_URL}/interests/status`);
      const data = await res.json();
      setInterestsStatus(data.status)
    }
    fetchInterestsStatus().then();
  }, [])
  return interestsStatus === Status.HAS_NO_INTERESTS ? <Redirect to="/interests" /> : <Formik
    initialValues={{ "requested_day_periods": [] }}
    validate={(values: Values) => {
      const errors: any = {};
      if (values.requested_day_periods.length === 0) {
        errors.requested_day_periods = "You must select at least one period in the day in which you'd like events to be generated"
      }
      return errors;
    }}
    onSubmit={async (values, { setSubmitting, resetForm }) => {

      const userCookie = Cookies.get('user')
      if (!userCookie) {
        return console.error('No user cookie found');
      }

      const user: User = JSON.parse(userCookie as string)
      await api(`${process.env.REACT_APP_API_URL}/make-my-day`, {
        access_token: user.accessToken,
        ...values
      }, {
        method: 'POST',
      });
      setSubmitting(false);
      resetForm();
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <div role="group" aria-labelledby="checkbox-group">
          <label>
            <Field type="checkbox" name="requested_day_periods" value="morning" />
            Morning (9am - 12pm)
          </label>
          <label>
            <Field type="checkbox" name="requested_day_periods" value="afternoon" />
            Afternoon (12pm - 4pm)
          </label>
          <label>
            <Field type="checkbox" name="requested_day_periods" value="early_evening" />
            Early Evening (4pm - 8pm)
          </label>
          <label>
            <Field type="checkbox" name="requested_day_periods" value="late_evening" />
            Late Evening (8pm - 12pm)
          </label>
        </div>
        <div role="group" aria-labelledby="checkbox-group">
          <label>
            <Field type="checkbox" name="requested_activity_types" value="active" />
            I feel like doing something active today
          </label>
          <label>
            <Field type="checkbox" name="requested_activity_types" value="social" />
            I want to be social today
          </label>
          <label>
            <Field type="checkbox" name="requested_activity_types" value="amusement" />
            I want to have fun today
          </label>
          <label>
            <Field type="checkbox" name="requested_activity_types" value="self_improvement" />
            I feel like improving myself today
          </label>
          <label>
            <Field type="checkbox" name="requested_activity_types" value="outgoing" />
            I feel like getting out of the house today
          </label>
        </div>
        <ErrorMessage name="requested_day_periods" />
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
}


export default DayConfigForm;
