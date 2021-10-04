import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styled from 'styled-components';
import outdoors from "../../assets/outdoors.jpg"
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
)

type Values = {
  interests: ("outdoor_sports")[]
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
                <Field type="checkbox" name="interests" value="outdoor_sports" />
                <SelectableImage imageSrc={outdoors} checked={values.interests.includes("outdoor_sports") } />
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
