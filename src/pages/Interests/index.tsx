import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import { css } from "@emotion/react";
import images, {Image} from './images';
import checkmark from "../../assets/checkmark.png"
import ClipLoader from "react-spinners/ClipLoader";
import api from "../../api";
import {interestSceneMap} from "./interestSceneMap";
import {useHistory} from "react-router";
import {Button, Box, Container} from "@mui/material";


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
    <Checkbox type="checkbox" name="interest_scenes" value={image.name} />
    <BackgroundImage src={image.src} />
    {checked ? <CheckMark src={checkmark} /> : null}
  </SelectableImageContainer>
);

const MasonryContainer = styled.div`
  display: flex;
  justify-content: center;
`

type Values = {
  interest_scenes: string[]
}

const Interests = () => {
  let history = useHistory();
  const [layoutComplete, setLayoutComplete] = useState<boolean>(false);
  return (
    <>
      {!layoutComplete ? <LoadingScreen>
        <ClipLoader loading={!layoutComplete} css={override} />
      </LoadingScreen> : null}
      <Box sx={{
        my: 2
      }}>
      <Container sx={{
        textAlign: 'center',
      }}>
        <Formik
          initialValues={{
            interest_scenes: [],
          }}
          validate={(values: Values) => {
            const errors: any = {};
            if (values.interest_scenes.length < 8) {
              errors.interest_scenes = "You must select at least 8 interest images"
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const interests = values.interest_scenes.map(scene => interestSceneMap[scene]).flat();
            const uniqueInterests = [...new Set(interests)];
            const res = await api(`${process.env.REACT_APP_API_URL}/interests`, {
              interests: uniqueInterests,
            }, {
              method: 'POST',
            });
            if (res.status === 201) {
              return history.push('/');
            }
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting, values }: FormikProps<Values>) => (
            <Form>
              <h2>Please select the images that best represent your interests</h2>
              <MasonryContainer role="group" aria-labelledby="checkbox-group">
                  <Masonry
                    options={{
                      fitWidth: true
                    }}
                    onLayoutComplete={() => setLayoutComplete(true)}
                  >
                    {images.map(image => (
                      <label key={`label-${image.name}`}>
                        <SelectableImage key={image.name} image={image} checked={values.interest_scenes.includes(image.name) } />
                      </label>
                    ))}
                  </Masonry>
              </MasonryContainer>
              <Box>
                <ErrorMessage name="interest_scenes" />
              </Box>
              <Box sx={{
                my: 2,
              }}>
                <Button data-testid="interests-submit" role="button" size="large" color="primary" variant="contained" type="submit"  disabled={isSubmitting}>
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
      </Box>
    </>
  )
};

export default Interests;
