import * as React from 'react';


export type IframeProps = {
  src: string;
  fit?: boolean;
  onMessage?: (event: MessageEvent) => void;
  onLoad?: () => void;
  onFail?: () => void;
  skipHeadCheck?: boolean;
} & React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;

export interface IframeRefObject {
  amIIframe: () => boolean;
  sendMessage: (message: string, targetOrigin?: string) => void;
  onMessage: (listener: (event: MessageEvent) => void) => (() => void);
};

export const ParentProxy: IframeRefObject = {
  amIIframe: () => window !== window.top,
  sendMessage: (message, targetOrigin = document.referrer) => {
    return window.parent.postMessage(message, targetOrigin);
  },
  onMessage: (listener: (event: MessageEvent) => void) => {
    const secureListener = (event: MessageEvent) => {
      if (event.origin === window.document.referrer) {
        return listener(event);
      }
      return null;
    };

    window.addEventListener(
      'message',
      secureListener,
      false,
    );

    return () => {
      window.removeEventListener('message', secureListener);
    };
  }
};

export const Iframe = React.forwardRef((
  {
    src,
    fit = false,
    skipHeadCheck = false,
    onMessage,
    onLoad,
    onFail,
    ...other
  }: IframeProps,
  ref: React.Ref<IframeRefObject>,
) => {
  const [canBeLoaded, setCanBeLoaded] = React.useState(false);
  const iframe = React.createRef<HTMLIFrameElement>();
  // eslint-disable-next-line no-param-reassign
  delete (other as any).computedMatch;

  React.useEffect(() => {
    if (skipHeadCheck) {
      setCanBeLoaded(true);
    } else {
      setCanBeLoaded(false);
      fetch(
        src,
        {
          method: 'HEAD',
          mode: 'no-cors'
        },
      ).then(
        ({ status }) => {
          if (status !== 0) {
            throw new TypeError('Failed to fetch');
          }
          setCanBeLoaded(true);
        }
      ).catch(
        () => onFail && onFail()
      );
    }
  }, [src, skipHeadCheck]);

  React.useEffect(() => {
    const targetOrigin = new URL(src).origin;
    if (canBeLoaded) {
      const proxy = {
        amIIframe: () => false,
        onMessage: (listener: (event: MessageEvent) => void) => {
          const secureListener = (event: MessageEvent) => {
            if (event.origin === targetOrigin) {
              return listener(event);
            }
            return null;
          };

          window.addEventListener('message', secureListener, false);

          return () => window.removeEventListener('message', secureListener);
        },
        sendMessage: (message: string) => iframe.current
          && iframe.current.contentWindow
          && iframe.current.contentWindow.postMessage(message, targetOrigin),
      } as IframeRefObject;

      if (ref) {
        // eslint-disable-next-line no-param-reassign
        (ref as any).current = proxy;
      }

      if (onMessage) {
        return proxy.onMessage(onMessage);
      }
    }

    return () => undefined;
  }, [onMessage, canBeLoaded]);

  React.useEffect(() => {
    if (iframe.current && canBeLoaded) {
      iframe.current.onload = () => {
        if (onLoad) {
          onLoad();
        }
        if (fit && !!iframe.current && iframe.current.contentWindow) {
          iframe.current.width = `${iframe.current.contentWindow.document.body.scrollWidth}`;
          iframe.current.height = `${iframe.current.contentWindow.document.body.scrollHeight}`;
        }
      };
    }
    return () => {
      if (iframe.current) {
        delete iframe.current.onload;
      }
    };
  }, [iframe.current, canBeLoaded]);

  if (!canBeLoaded) {
    return null;
  }

  return (
    <iframe
      title="react-iframe"
      src={src}
      frameBorder="0"
      {...other}
      ref={iframe}
    />
  );
});

export default Iframe;
