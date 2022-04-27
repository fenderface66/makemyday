import { Typography } from "@mui/material";
import styled from "styled-components";

const SubTitle = styled(Typography).attrs((props) => ({
  variant: "h5",
}))`
  margin-top: 0;
  margin-bottom: 8px;
  border-bottom: 1px solid gray;
`;

export default SubTitle;
