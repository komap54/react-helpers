import * as React from 'react';
declare type Children = JSX.Element | JSX.Element[] | number | string | null;
declare const Try: React.FunctionComponent<{
    catch?: (error: Error) => Children;
}>;
export default Try;
