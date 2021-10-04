import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import images, {Image} from './images';
import checkmark from "../../assets/checkmark.png"


const SelectableImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  max-width: 300px;
`;

const BackgroundImage = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const CheckMark = styled.img`
  max-width: 30px;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 10;
`

const Checkbox = styled(Field)`
  position: absolute;
  left: 50%;
  top: 50%;
  visibility: hidden;
`

const Overlay = styled.div`
  width: 100%;
  height: 65px;
  overflow: hidden;
  position: absolute;
  background: linear-gradient(rgb(0,0,0,0.5), rgb(0,0,0,0.0));
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 9;
`;

const SelectableImage = ({ image, checked } : {image: Image, checked: boolean}) => (
  <SelectableImageContainer>
    <Overlay />
    <Checkbox type="checkbox" name="interests" value={image.name} />
    <BackgroundImage src={image.src} />
    {checked ? <CheckMark src={checkmark} /> : null}
  </SelectableImageContainer>
);

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
                <Masonry>
                  {images.map(image => (
                    <label>
                      <SelectableImage image={image} checked={values.interests.includes(image.name) } />
                    </label>
                  ))}
                </Masonry>
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
