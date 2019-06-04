import If from './components/If';
import useRefFor from './hooks/useRefFor';
export declare const _export: {
    If: typeof If;
    wait: (ms: number) => Promise<{}>;
    useDebounce: <T1>(value: T1, delay: number) => any;
    useMounted: () => any;
    useRouter: () => any;
    useThrottle: <T1>(value: T1, limit?: number) => any;
    useRefFor: typeof useRefFor;
};
export default _export;
