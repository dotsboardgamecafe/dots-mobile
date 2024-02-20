import 'i18next'

import type id from './src/localization/id.json'

declare module '@env' {
  export const BASE_URL: string
}

declare module 'i18next' {
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      id: typeof id;
    };
    compatibilityJSON: string
  }
}