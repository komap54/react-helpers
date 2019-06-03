import If from './components/If';
import wait from './helpers/Wait';
import useDebounce from './hooks/useDebounce';
import useThrottle from './hooks/useThrottle';
import useMounted from './hooks/useMounted';
import useRouter from './hooks/useRouter';
import useRefFor from './hooks/useRefFor';

export const _export = {
  If,
  wait,
  useDebounce,
  useMounted,
  useRouter,
  useThrottle,
  useRefFor,
};

export default _export;
