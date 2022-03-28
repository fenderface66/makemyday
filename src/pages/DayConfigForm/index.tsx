import React, { useEffect, useState } from "react";
import { DayPeriod, ActivityType } from "make-my-day-common";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../api";
import { Redirect, useHistory } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { Checkbox } from "formik-mui";

import TodoistLoginButton from "../../components/TodoistLoginButton";
import Grid from "@mui/material/Grid";
import { DatePickerField } from "../../components/DatepickerField";
import { cpuUsage } from "process";

type Values = {
  requested_day_periods: DayPeriod[];
  requested_activity_types: ActivityType[];
};

export enum Status {
  HAS_INTERESTS = "HAS_RECORDED_INTERESTS",
  HAS_NO_INTERESTS = "HAS_NO_RECORDED_INTERESTS",
}

const DayConfigForm = () => {
  let history = useHistory();
  const [interestsStatus, setInterestsStatus] = useState<Status>(
    Status.HAS_INTERESTS
  );
  useEffect(() => {
    const fetchInterestsStatus = async () => {
      const res = await api(
        `${process.env.REACT_APP_API_URL}/interests/status`
      );
      const data = await res.json();
      setInterestsStatus(data.status);
    };
    fetchInterestsStatus().then();
  }, []);
  return interestsStatus === Status.HAS_NO_INTERESTS ? (
    <Redirect to="/interests" />
  ) : (
    <Container>
      <Formik
        initialValues={{
          schedule_date: new Date().toUTCString(),
          requested_day_periods: [],
          requested_activity_types: [],
        }}
        validate={(values: Values) => {
          const errors: any = {};
          if (values.requested_day_periods.length === 0) {
            errors.requested_day_periods =
              "You must select at least one period in the day in which you'd like events to be generated";
          }
          if (values.requested_activity_types.length < 3) {
            errors.requested_activity_types =
              "You must select at least 3 activity types";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const res = await api(
            `${process.env.REACT_APP_API_URL}/schedule/create`,
            {
              ...values,
              schedule_date: new Date(values.schedule_date).toISOString(),
            },
            {
              method: "POST",
            }
          );
          if (res.status === 201) {
            const schedule = await res.json();
            history.push("/schedule", { schedule, ...values });
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2>Which day would you like your scheduled?</h2>
            <DatePickerField name="schedule_date" />
            <h2>When in the day would you like activities to be scheduled?</h2>
            <div role="group" aria-labelledby="checkbox-group">
              <Box>
                <label>
                  <Field
                    data-testid="requested_day_periods_morning"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_day_periods"
                    value="morning"
                  />
                  Morning (9am - 12pm)
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_day_periods_afternoon"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_day_periods"
                    value="afternoon"
                  />
                  Afternoon (12pm - 4pm)
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_day_periods_early_evening"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_day_periods"
                    value="early_evening"
                  />
                  Early Evening (4pm - 8pm)
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_day_periods_late_evening"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_day_periods"
                    value="late_evening"
                  />
                  Late Evening (8pm - 12pm)
                </label>
              </Box>
            </div>
            <div role="group" aria-labelledby="checkbox-group">
              <h2>What kind of day would you like to have scheduled?</h2>
              <Box>
                <label>
                  <Field
                    data-testid="requested_activity_types_active"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_activity_types"
                    value="active"
                  />
                  I feel like doing something active today
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_activity_types_social"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_activity_types"
                    value="social"
                  />
                  I want to be social today
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_activity_types_amusement"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_activity_types"
                    value="amusement"
                  />
                  I want to have fun today
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_activity_types_self_improvement"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_activity_types"
                    value="self_improvement"
                  />
                  I feel like improving myself today
                </label>
              </Box>
              <Box>
                <label>
                  <Field
                    data-testid="requested_activity_types_self_outgoing"
                    type="checkbox"
                    component={Checkbox}
                    name="requested_activity_types"
                    value="outgoing"
                  />
                  I feel like getting out of the house today
                </label>
              </Box>
            </div>
            <Box
              sx={{
                my: 1,
              }}
            >
              <ErrorMessage name="requested_day_periods" />
            </Box>
            <Box>
              <ErrorMessage name="requested_activity_types" />
            </Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  data-testid="submit_button"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <TodoistLoginButton />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default DayConfigForm;
