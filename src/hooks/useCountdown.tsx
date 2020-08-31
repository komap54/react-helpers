import React from 'react';
import { Countdown, CountdownProps} from '../components/Countdown';

export const useCountdown = () => {
  const [key, setKey] = React.useState(Symbol('-__-'));
  
  return [
    React.useCallback(
      (props: CountdownProps) => <React.Fragment><Countdown {...props}/></React.Fragment>,
      [key],
    ),
    () => setKey(Symbol('-__-')),
  ] as  [
    (props: CountdownProps) => JSX.Element,
    () => void,
  ];
}

export default useCountdown;