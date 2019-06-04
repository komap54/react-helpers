import * as React from 'react';

interface IfProps {
  condition: boolean;
  then?: (() => React.ReactElement<any>);
  else?: (() => React.ReactElement<any>);
  children?: JSX.Element[] | JSX.Element;
}

function If(props: IfProps) {
  const { condition } = props;

  if (condition) {
    return (
      <>
        {props.then ? props.then() : null}
        {props.children || null}
      </>
    );
  }

  return props.else ? props.else() : null;
};

export default If;
