import * as React from 'react';

export const Memo: React.FunctionComponent<{ deps?: React.DependencyList }> = ({
  deps = [],
  children,
}) => {
  const [cache, saveCache] = React.useState(children);

  React.useEffect(() => {
    saveCache(children);
  }, [...deps]);

  return <>{cache}</>;
};

export default Memo;
