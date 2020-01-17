import * as React from 'react';

export class Try extends React.Component<
{
  onCatch?: (error: Error) => React.ReactNode;
  silent?: boolean;
}, {
  error: Error | null;
  silent: boolean;
}> {
  constructor(props: React.PropsWithChildren<{ silent?: boolean }>) {
    super(props);
    this.state = {
      error: null,
      // eslint-disable-next-line react/no-unused-state
      silent: props.silent !== false
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    const { silent } = this.props;
    if (!silent) {
      console.warn(error);
      console.warn(info);
    }
    // var prop = Object.getOwnPropertyNames(error);
    // this.setState({ error: prop.reduce((acc, key) => ({ ...acc, [key]: error[key] }), {}) });
    // this.setState({ error: error });
  }

  render() {
    const { error } = this.state;
    const { onCatch, children } = this.props;
    if (error) {
      if (onCatch) {
        return onCatch(error);
      }
      return null;
    }
    return children;
  }
}

export default Try;