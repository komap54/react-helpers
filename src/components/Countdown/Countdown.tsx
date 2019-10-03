import React, { useState, useEffect } from 'react';

export type CountdownLocale = 'ru' | 'ru-passive' | 'en';
export type CountdownFormat = 's' | 'ss' | 'mm ss' | 'm:s' | 'm' | 'mm';


export const puralize = (amount: number, locale: CountdownLocale): string => {
  switch (locale) {
    case ('ru'):
    case ('ru-passive'):
      switch (amount % 10) {
        case (1):
          return locale === 'ru-passive' ? 'у' : 'а';
        case (2):
        case (3):
        case (4):
          return 'ы';
        default:
          return '';
      }
    case ('en'):
    default:
      switch (amount) {
        case (1):
          return '';
        default:
          return 's';
      }
  }
}

export const formatTime = (seconds: number, format: CountdownFormat, locale: CountdownLocale): string => {
  const fullMminutesLeft = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  switch (format) {
    case ('m:s'):
      return `${fullMminutesLeft >= 10 ? '' : '0'}${fullMminutesLeft}:${secondsLeft >= 10 ? '' : '0'}${secondsLeft}`;
    case ('mm ss'):
      switch (locale) {
        case ('ru'):
        case ('ru-passive'):
          return (fullMminutesLeft > 0 ? `${fullMminutesLeft} минут${puralize(fullMminutesLeft, locale)} ` : '')
            + `${secondsLeft} секунд${puralize(secondsLeft, locale)}`;
        case ('en'):
        default:
          return (fullMminutesLeft > 0 ? `${fullMminutesLeft} minute${puralize(fullMminutesLeft, locale)} ` : '')
            + `${secondsLeft} second${puralize(secondsLeft, locale)}`;
      }
    case ('ss'):
      switch (locale) {
        case ('ru'):
        case ('ru-passive'):
          return `${seconds} секунд${puralize(seconds, locale)}`;
        case ('en'):
        default:
          return `${seconds} second${puralize(seconds, locale)}`;
      }
    case ('mm'):
      const minutesLeft = Math.ceil(seconds / 60);
      switch (locale) {
        case ('ru'):
        case ('ru-passive'):
          return `${minutesLeft} минут${puralize(minutesLeft, locale)}`;
        case ('en'):
        default:
          return `${minutesLeft} minute${puralize(minutesLeft, locale)}`;
      }
    case ('m'):
      return `${Math.ceil(seconds / 60)}`
    case ('s'):
    default:
      return `${seconds}`;
  }
}

export const Countdown = ({
  seconds,
  format = 'm:s',
  onExpire,
  locale = 'en',
}: {
  seconds: number,
  format?: CountdownFormat,
  onExpire?: () => void,
  locale?: CountdownLocale
}) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) {
        onExpire();
      }
      return () => undefined;
    } else {
      let lastReduction = Date.now();
      const interval = setInterval(() => {
        const timePassed = Date.now() - lastReduction;
        if (timePassed >= 1000) {
          lastReduction = lastReduction + timePassed;
          setTimeLeft(oldValue => oldValue - Math.ceil(timePassed / 1000));
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [seconds, timeLeft <= 0])

  return (
    <>{formatTime(timeLeft, format, locale)}</>
  );
}

export default Countdown;
