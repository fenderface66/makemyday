// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type Values = {
  requested_day_periods: ("morning" | "afternoon" | "early_evening" | "late_evening")[]
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: new Headers({'content-type': 'application/json'}),
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response;
}

const DayConfigForm = () => (
    <Formik
      initialValues={{ "requested_day_periods": [] }}
      validate={(values: Values) => {
        const errors: any = {};
        if (values.requested_day_periods.length === 0) {
          errors.requested_day_periods = "You must select at least one period in the day in which you'd like events to be generated"
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        console.log(process.env);
        await postData(`${process.env.REACT_APP_API_URL}/make-my-day`, values);
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
          <ErrorMessage name="requested_day_periods" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
);

export default DayConfigForm;
