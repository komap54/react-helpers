/// <reference types="react" />
import useRefFor from './hooks/useRefFor';
export declare const _export: {
    If: {
        If: typeof import("./components/If").If;
        Then: import("react").FunctionComponent<{}>;
        Else: import("react").FunctionComponent<{}>;
    };
    wait: (ms: number) => Promise<{}>;
    useDebounce: <T1>(value: T1, delay: number) => T1;
    useMounted: () => boolean;
    useRouter: () => import("./hooks/useRouter").Context;
    useThrottle: <T1>(value: T1, limit?: number) => T1;
    useRefFor: typeof useRefFor;
};
export default _export;
