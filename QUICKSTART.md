# Quick Start Guide

Get up and running with the Malleon Replay SDK Angular example in 3 steps:

## 1. Install Dependencies

```bash
npm install
```

This will install Angular dependencies and the `@malleon/replay` SDK package.

## 2. Configure Your App ID

Edit `src/environments/environment.ts` and replace `YOUR_APP_ID_HERE` with your Malleon App ID:

```typescript
export const environment = {
  production: false,
  replayAppId: 'your-actual-app-id-here'  // ← Change this!
};
```

## 3. Run the Application

```bash
npm start
```

Then open `http://localhost:4200` in your browser.

## What to Try

1. **Update User Data** - Change the username/tenant ID and click "Update User Data"
2. **Generate Console Events** - Click the Error/Warning/Log buttons and check your browser console
3. **Make API Calls** - Click the API call buttons to see network requests being captured
4. **Add Tags** - Click the tag buttons to add custom metadata

## View Your Data

After interacting with the app, check your Malleon dashboard:
- Navigate to your app (using the App ID you configured)
- View the replay sessions
- See all captured interactions, console logs, and API calls

That's it! 🎉

