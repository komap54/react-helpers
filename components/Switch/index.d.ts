import * as React from 'react';
declare type Children = JSX.Element | JSX.Element[] | number | string | null;
export declare const Case: React.FC;
export declare const Default: React.FC;
export declare function Switch({ children, }: {
    children?: Children;
}): JSX.Element | null;
declare const _default: {
    Switch: typeof Switch;
    Case: React.FunctionComponent<{}>;
    Default: React.FunctionComponent<{}>;
};
export default _default;
