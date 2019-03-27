import * as React from 'react';

interface InterfaceProps {
  condition: boolean;
  then?: (() => React.ReactElement<any>);
  else?: (() => React.ReactElement<any>);
  children?: JSX.Element[] | JSX.Element;
}

function If(props: InterfaceProps) {
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
