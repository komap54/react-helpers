import * as React from 'react';

class Try extends React.Component<
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
      silent: props.silent !== false ? true : false
    }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: Error, info: any) {
    if (!this.props.silent) {
      console.warn(error);
      console.warn(info);
    }
    // var prop = Object.getOwnPropertyNames(error);
    // this.setState({ error: prop.reduce((acc, key) => ({ ...acc, [key]: error[key] }), {}) });
    // this.setState({ error: error });
  }

  render() {
    if (this.state.error) {
      if (this.props.onCatch) {
        return this.props.onCatch(this.state.error);
      }
      return null;
    }
    return this.props.children;
  }
}

export default Try;
