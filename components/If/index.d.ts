import * as React from 'react';
interface IfProps {
    condition: boolean;
    then?: (() => React.ReactElement<any>);
    else?: (() => React.ReactElement<any>);
    children?: JSX.Element[] | JSX.Element;
}
declare function If(props: IfProps): JSX.Element | null;
export default If;
