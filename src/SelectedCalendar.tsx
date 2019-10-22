import React, {FunctionComponent} from 'react';

type Props = {
  calendarId: string;
}

const SelectedCalendar: FunctionComponent<Props> = ({
  calendarId
}) => {
  return (
    <h1>{calendarId}</h1>
  );
};

export default SelectedCalendar;
