import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from "js-cookie";
import api from "../../api";
import {User} from "../../App";
import {Redirect, useHistory} from 'react-router-dom'
import { Button, Container, Box } from '@mui/material';
import {Checkbox} from "formik-mui";

export type RequestedDayPeriods = ("morning" | "afternoon" | "early_evening" | "late_evening")[];

export type RequestedActivityTypes = ("active" | "social" | "amusement" | "self_improvement" | "outgoing")[]

type Values = {
  requested_day_periods: RequestedDayPeriods;
  requested_activity_types: RequestedActivityTypes;
}

export enum Status {
  HAS_INTERESTS = 'HAS_RECORDED_INTERESTS',
  HAS_NO_INTERESTS = 'HAS_NO_RECORDED_INTERESTS',
}

const DayConfigForm = () => {
  let history = useHistory();
  const [interestsStatus, setInterestsStatus] = useState<Status>(Status.HAS_INTERESTS);
  useEffect(() => {
    const fetchInterestsStatus = async () => {
      const res = await api(`${process.env.REACT_APP_API_URL}/interests/status`);
      const data = await res.json();
      setInterestsStatus(data.status)
    }
    fetchInterestsStatus().then();
  }, [])
  return interestsStatus === Status.HAS_NO_INTERESTS ? <Redirect to="/interests" /> :
    <Container><Formik
    initialValues={{ "requested_day_periods": [], "requested_activity_types": [] }}
    validate={(values: Values) => {
      const errors: any = {};
      if (values.requested_day_periods.length === 0) {
        errors.requested_day_periods = "You must select at least one period in the day in which you'd like events to be generated"
      }
      if (values.requested_activity_types.length === 0) {
        errors.requested_activity_types = "You must select at least one activity type"
      }
      return errors;
    }}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      const res = await api(`${process.env.REACT_APP_API_URL}/schedule/create`, {
        ...values
      }, {
        method: 'POST',
      });
      if (res.status === 201) {
        const schedule = await res.json();
        history.push('/schedule', {schedule, ...values});
      }
      setSubmitting(false);
      resetForm();
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <h2>When would you like activities scheduled in your day?</h2>
        <div role="group" aria-labelledby="checkbox-group">
          <Box>
            <label>
              <Field type="checkbox" component={Checkbox} name="requested_day_periods" value="morning" />
              Morning (9am - 12pm)
            </label>
          </Box>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_day_periods" value="afternoon" />
            Afternoon (12pm - 4pm)
          </label>
          </Box>
            <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_day_periods" value="early_evening" />
            Early Evening (4pm - 8pm)
          </label>
            </Box>
              <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_day_periods" value="late_evening" />
            Late Evening (8pm - 12pm)
          </label>
              </Box>
        </div>
        <div role="group" aria-labelledby="checkbox-group">
          <h2>What kind of day would you like to have scheduled?</h2>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_activity_types" value="active" />
            I feel like doing something active today
          </label>
          </Box>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_activity_types" value="social" />
            I want to be social today
          </label>
          </Box>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_activity_types" value="amusement" />
            I want to have fun today
          </label>
          </Box>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_activity_types" value="self_improvement" />
            I feel like improving myself today
          </label>
          </Box>
          <Box>
          <label>
            <Field type="checkbox" component={Checkbox} name="requested_activity_types" value="outgoing" />
            I feel like getting out of the house today
          </label>
          </Box>
        </div>
        <Box sx={{
          my: 1,
        }}>
          <ErrorMessage name="requested_day_periods" />
        </Box>
        <Box>
          <ErrorMessage name="requested_activity_types" />
        </Box>
        <Box sx={{
          my: 1,
        }}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Form>
    )}
    </Formik></Container>
}


export default DayConfigForm;
