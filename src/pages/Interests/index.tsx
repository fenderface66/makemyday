import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styled from 'styled-components';
import hiking_outside from "../../assets/interest_images/hiking_outside.jpg"
import book_and_glasses from "../../assets/interest_images/book_and_glasses.jpg"
import checkmark from "../../assets/checkmark.png"

const SelectableImageContainer = styled.div`
  max-height: 300px;
  max-width: 150px;
  position: relative;
  object-fit: cover;
  bottom: 20px;
`;

const BackgroundImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const CheckMark = styled.img`
  max-width: 30px;
  position: absolute;
  top: 6px;
  right: 6px;
`

const SelectableImage = ({ imageSrc, checked } : {imageSrc: string, checked: boolean}) => (
  <SelectableImageContainer>
    <BackgroundImage src={imageSrc} />
    {checked ? <CheckMark src={checkmark} /> : null}
  </SelectableImageContainer>
);

const Grid = styled.div`
  
`

type Values = {
  interests: string[]
}

const Interests = () => {
  return (
    <>
      <h1>Interests</h1>
      <Formik
        initialValues={{
          interests: [],
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {}}
      >
        {({ isSubmitting, values }: FormikProps<Values>) => (
          <Form>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="interests" value="hiking_outside" />
                <SelectableImage imageSrc={hiking_outside} checked={values.interests.includes("hiking_outside") } />
              </label>
              <label>
                <Field type="checkbox" name="interests" value="book_and_glasses" />
                <SelectableImage imageSrc={book_and_glasses} checked={values.interests.includes("book_and_glasses") } />
              </label>
            </div>
            <ErrorMessage name="requested_day_periods" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
};

export default Interests;
