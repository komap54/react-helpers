import React from 'react';
import { Countdown, CountdownProps} from '../components/Countdown';

export const useCountdown = () => {
  const [update, setUpdate] = React.useState(Symbol('-__-'));
  const [key, setKey] = React.useState(Symbol('-__-'));
  const paused = React.useRef(false);
  
  return [
    React.useCallback(
      (props: CountdownProps) => <React.Fragment><Countdown {...props} pause={props.pause || paused.current}/></React.Fragment>,
      [key],
    ),
    {
      reset: () => setKey(Symbol('-__-')),
      pause: () => { 
        paused.current = true;
        setUpdate(Symbol('-__-'));
      },
      resume: () => { 
        paused.current = false;
        setUpdate(Symbol('-__-'));
      },
    }
  ] as  [
    (props: CountdownProps) => JSX.Element,
    {
      reset: () => void;
      pause: () => void;
      resume: () => void;
    }
  ];
}

export default useCountdown;