import React, {FunctionComponent} from 'react';
import styled from 'styled-components';

import {Space} from "./theme";
import { Calendar } from "./Home";

type CalendarStyleProps = {
  backgroundColor: string;
}

type Props = {
  calendars: Calendar[];
  onSelect: (calendar: Calendar) => void;
}

const CalendarContainer = styled.div`
 display: grid;
 grid-column-gap: ${Space.med};
 grid-row-gap: ${Space.med};
 grid-template-columns: auto auto auto;
 padding: ${Space.med};
`;

const CalendarItem = styled.div<CalendarStyleProps>`
  background-color: ${props => props.backgroundColor};
  padding: ${Space.med};
`

const ChooseCalendar: FunctionComponent<Props> = ({
  calendars,
  onSelect
}) => {
  console.log(calendars);
  return (
    <CalendarContainer>
      {calendars.map(calendar => (
        <CalendarItem
          key={calendar.id}
          backgroundColor={calendar.backgroundColor}
          onClick={() => onSelect(calendar)}
        >
          {calendar.summary}
        </CalendarItem>
      )) }
    </CalendarContainer>

  )
}
export default ChooseCalendar;
