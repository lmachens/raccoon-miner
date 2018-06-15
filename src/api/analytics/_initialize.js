import ReactGA from 'react-ga';
import { TRACKING_ID } from '../environment';

export const initialize = () => {
  if (!TRACKING_ID) return;

  ReactGA.initialize(TRACKING_ID, {
    debug: true
  });

  // Remove failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
  ReactGA.ga('set', 'checkProtocolTask', () => {});
  ReactGA.pageview('/');
  console.info('%cAnalytics is active', 'color: blue');
};
