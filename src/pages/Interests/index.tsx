import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { css } from "@emotion/react";
import images, {Image} from './images';
import checkmark from "../../assets/checkmark.png"
import ClipLoader from "react-spinners/ClipLoader";


const SelectableImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  max-width: 300px;
  padding: 10px;
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
  width: 300px;
  height: 65px;
  overflow: hidden;
  position: absolute;
  background: linear-gradient(rgb(0,0,0,0.5), rgb(0,0,0,0.0));
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 9;
`;

const override = css`
  display: block;
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const LoadingScreen = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  position: absolute;
`

const SelectableImage = ({ image, checked } : {image: Image, checked: boolean}) => (
  <SelectableImageContainer>
    <Overlay />
    <Checkbox type="checkbox" name="interests" value={image.name} />
    <BackgroundImage src={image.src} />
    {checked ? <CheckMark src={checkmark} /> : null}
  </SelectableImageContainer>
);

const MasonryContainer = styled.div`
  display: flex;
  justify-content: center;
`

type Values = {
  interests: string[]
}

const Interests = () => {
  const [layoutComplete, setLayoutComplete] = useState<boolean>(false);
  return (
    <>
      {!layoutComplete ? <LoadingScreen>
        <ClipLoader loading={!layoutComplete} css={override} />
      </LoadingScreen> : null}
      <Formik
        initialValues={{
          interests: [],
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {}}
      >
        {({ isSubmitting, values }: FormikProps<Values>) => (
          <Form>
            <MasonryContainer role="group" aria-labelledby="checkbox-group">
                <Masonry
                  options={{
                    fitWidth: true
                  }}
                  onLayoutComplete={() => setLayoutComplete(true)}
                >
                  {images.map(image => (
                    <label>
                      <SelectableImage image={image} checked={values.interests.includes(image.name) } />
                    </label>
                  ))}
                </Masonry>
            </MasonryContainer>
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
