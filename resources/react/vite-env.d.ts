/// <reference types="vite/client" />

import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {

  // Axios
  interface Window {
    axios: AxiosInstance;
  }

  // Routes
  var route: typeof ziggyRoute,
    Ziggy: ZiggyConfig;
}
