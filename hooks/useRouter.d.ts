import * as Router from 'react-router';
export declare type Context = {
    match: {
        params: {
            [key: string]: string;
        };
    };
} & Router.RouteComponentProps;
declare const _default: () => Context;
export default _default;
