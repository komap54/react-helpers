import { useContext, useEffect, useState } from 'react';
import * as Router from 'react-router';

export type Context = {
  match: {
    params: { [key: string]: string };
  }
} & Router.RouteComponentProps;

export default function useRouter() {
  const [__, forceUpdate] = useState(Symbol('__'));
  // eslint-disable-next-line no-underscore-dangle
  const routerContext: Context = useContext((Router as any).__RouterContext);
  useEffect(
    () => routerContext.history.listen(arg0 => forceUpdate(Symbol('__'))),
    [routerContext],
  );
  return routerContext;
};
