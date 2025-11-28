// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Replace this with your Malleon App ID
  // You can find your App ID in your Malleon account dashboard
  replayAppId: 'e61adbb2-d13d-428f-a2f3-95ca1b9406f5',
  // Set to true to use local compiled replay.es.js file (for development)
  // Set to false to use npm package @malleon/replay (for production)
  useLocalReplaySDK: true
};

