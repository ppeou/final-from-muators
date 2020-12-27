import {useCallback, useState} from "react";

const useToggle = (initialValue) => {
  const [state, setState] = useState(initialValue);
  const toggle = useCallback(value => {
      setState(currentState => value === true || value === false ? value : !currentState);
    },
    [setState]);
  return [state, toggle];
};

export default useToggle;