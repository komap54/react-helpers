import * as React from 'react';
import { Children, renderChildren } from '../../utils';

export const Memo = ({
  deps,
  children,
}: {
  deps: React.DependencyList;
  children?: Children; 
}) => {
  const [cache, saveCache] = React.useState(renderChildren(children));

  React.useEffect(() => {
    saveCache(renderChildren(children));
  }, [...deps]);

  return <>{cache}</>;
};

export const MemoV2 = ({
  deps,
  timebudget = 0,
  children,
}: {
  deps: React.DependencyList;
  timebudget?: number;
  children?: Children;
}) => {
  const [cache, saveCache] = React.useState(renderChildren(children));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      saveCache(renderChildren(children));
    }, timebudget);
    return () => clearTimeout(timer);
  }, [...deps]);

  return <>{cache}</>;
};

export default Memo;
