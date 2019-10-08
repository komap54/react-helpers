import * as React from 'react';


export type IframeProps = {
  src: string,
  onMessage?: (event: MessageEvent) => void
  onLoad?: () => void;
  onError?: () => void;
  skipHeadCheck?: boolean;
} & React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;

export interface IframeRefObject {
  amIIframe: () => boolean;
  sendMessage: (message: string) => void;
  onMessage: (listener: (event: MessageEvent) => void) => (() => void);
};

export const ParentProxy: IframeRefObject = {
  amIIframe: () => window !== window.top,
  sendMessage: (message: string) => window.top.postMessage(message, document.referrer),
  onMessage: (listener: (event: MessageEvent) => void) => {
    const secureListener = (event: MessageEvent) => {
      if (event.origin === window.document.referrer) {
        return listener(event);
      }
      return;
    }

    window.addEventListener(
      'message',
      secureListener,
      false,
    );

    return () => {
      window.removeEventListener('message', secureListener);
    }
  }
};

export const Iframe = React.forwardRef(({
  src,
  skipHeadCheck = false,
  onMessage,
  onLoad,
  onError,
  ...other
}: IframeProps,
  ref: React.Ref<IframeRefObject>,
) => {
  const [canBeLoaded, setCanBeLoaded] = React.useState(false);
  const iframe = React.createRef<HTMLIFrameElement>();
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
        err => onError && onError(err)
      );
    }
  }, [src, skipHeadCheck])

  React.useEffect(() => {
    const targetOrigin = new URL(src).origin;
    if (canBeLoaded) {
      (ref as any).current = {
        amIIframe: () => false,
        onMessage: (listener: (event: MessageEvent) => void) => {
          const secureListener = (event: MessageEvent) => {
            if (event.origin === targetOrigin) {
              return listener(event);
            }
            return;
          };

          window.addEventListener('message', secureListener, false);

          return () => window.removeEventListener('message', secureListener);
        },
        sendMessage: (message: string) => iframe.current
          && iframe.current.contentWindow
          && iframe.current.contentWindow.postMessage(message, targetOrigin),
      } as IframeRefObject;

      if (onMessage) {
        return (ref as any).current.onMessage(onMessage);
      }
    }

    return () => undefined
  }, [onMessage, canBeLoaded]);

  React.useEffect(() => {
    if (iframe.current && canBeLoaded) {
      iframe.current.onload = () => {
        onLoad && onLoad();
      }
    }
    return () => {
      if (iframe.current) {
        delete iframe.current.onload
      }
    }
  }, [iframe.current, canBeLoaded])

  if (!canBeLoaded) {
    return null;
  }

  return (
    <iframe
      src={src}
      frameBorder="0"
      {...other}
      ref={iframe}
    />
  )
});

export default Iframe;
