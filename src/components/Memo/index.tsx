import * as React from 'react';

export const Memo: React.FunctionComponent<{ deps: React.DependencyList }> = ({
  deps,
  children,
}) => {
  const [cache, saveCache] = React.useState(children);

  React.useEffect(() => {
    saveCache(children);
  }, [...deps]);

  return <>{cache}</>;
};


export const MemoV2: React.FunctionComponent<{
  deps: React.DependencyList;
  timebudget?: number;
}> = ({
  deps,
  timebudget = 0,
  children,
}) => {
  const [cache, saveCache] = React.useState(children);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      saveCache(children);
    }, timebudget);
    return () => clearTimeout(timer);
  }, [...deps]);

  return <>{cache}</>;
};

export default Memo;
