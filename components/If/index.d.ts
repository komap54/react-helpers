import * as React from 'react';
declare type Children = (() => JSX.Element) | JSX.Element | JSX.Element[] | number | string | null;
export declare const Then: React.FC;
export declare const Else: React.FC;
export declare function If({ condition, children, }: {
    condition: boolean | (() => boolean);
    children?: Children;
}): JSX.Element | null;
declare const _default: {
    If: typeof If;
    Then: React.FunctionComponent<{}>;
    Else: React.FunctionComponent<{}>;
};
export default _default;
