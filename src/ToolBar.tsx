import * as React from 'react';
import {useEffect, useState} from "react";

type Props = {};

const ToolBar: React.FunctionComponent<Props> = () => {
  const [testState, setTestState] = useState<number>(2);
  useEffect(() => {
    setTestState(4);
  }, [])
  return (
      <p>{testState}</p>
  );
};

export default ToolBar;
