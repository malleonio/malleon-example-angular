# Malleon Replay SDK - Angular Example

This is a complete Angular example application demonstrating how to integrate the **Malleon Replay SDK** into your Angular application. The example shows how to capture user interactions, console logs, API calls, and custom metadata.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Malleon account with an App ID

### Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your App ID**
   
   Open `src/environments/environment.ts` and replace `YOUR_APP_ID_HERE` with your actual Malleon App ID:
   
   ```typescript
   export const environment = {
     production: false,
     replayAppId: 'your-actual-app-id-here'
   };
   ```
   
   You can find your App ID in your Malleon account dashboard.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:4200` to see the example application.

## 📖 What This Example Demonstrates

### 1. SDK Initialization
The `ReplayService` automatically initializes the SDK when your app starts, using the App ID from your environment configuration.

### 2. User Data Configuration
- Set username, tenant ID, email, and role
- These values are sent to Malleon and associated with the replay session
- Update user data dynamically as users interact with your app

### 3. Console Event Capture
The SDK automatically captures:
- **Errors** - JavaScript errors and exceptions
- **Warnings** - Console warnings
- **Logs** - Console log messages

Try clicking the buttons to generate different console events!

### 4. API Call Capture
The SDK automatically captures:
- **Successful API calls** - HTTP requests that complete successfully
- **Failed API calls** - HTTP requests that fail or return errors
- Request/response data, headers, and timing information

### 5. Custom Tags and Metadata
Add custom tags to enrich your replay data:
- **Single tags** - Add individual tags with different data types (string, number, boolean, date)
- **Multiple tags** - Add multiple tags at once
- **State transitions** - Track when users move between different states in your application

## 🏗️ Project Structure

```
malleon-example-angular/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Main component with demo buttons
│   │   ├── app.component.html         # Component template
│   │   ├── app.component.css          # Component styles
│   │   └── replay.service.ts          # Service wrapping the Replay SDK
│   ├── environments/
│   │   ├── environment.ts             # Development environment config
│   │   └── environment.prod.ts         # Production environment config
│   ├── index.html                     # Application entry point
│   ├── main.ts                        # Bootstrap file
│   └── styles.css                     # Global styles
├── angular.json                       # Angular CLI configuration
├── package.json                       # Dependencies (includes @malleon/replay)
└── README.md                          # This file
```

## 🔧 Integration Guide

### Step 1: Install the Replay SDK

Install the Malleon Replay SDK from npm:

```bash
npm install @malleon/replay
```

The SDK includes TypeScript type definitions, so no additional type packages are needed.

### Step 2: Create a Replay Service

Create a service that wraps the SDK functionality. See `src/app/replay.service.ts` for a complete example.

Key points:
- Import the SDK: `import * as ReplaySDK from '@malleon/replay'`
- Import types: `import type { ReplayUserData, ReplayTag, TagType } from '@malleon/replay'`
- Initialize with your App ID: `ReplaySDK.initReplay(appId)`
- Provide methods to update user data and add tags

### Step 3: Use the Service in Your Components

Inject the `ReplayService` into your components and use it to:
- Update user data when users log in or change context
- Add custom tags for important events
- Track state transitions

Example:
```typescript
constructor(private replayService: ReplayService) {}

async onUserLogin(user: User) {
  await this.replayService.updateUserData({
    username: user.name,
    tenantId: user.tenantId,
    userEmail: user.email
  });
}
```

## 📊 Viewing Your Data

After interacting with the example application:

1. **Open your Malleon dashboard**
2. **Navigate to your app** (using the App ID you configured)
3. **View replays** - You'll see a new replay session for each browser session
4. **Inspect captured data**:
   - User interactions (clicks, scrolls, form inputs)
   - Console logs, errors, and warnings
   - API calls with request/response data
   - Custom tags and metadata

## 🎯 Key Features Demonstrated

✅ **Automatic Capture**
- User interactions (clicks, scrolls, form inputs)
- Console logs, errors, and warnings
- Network requests (AJAX/fetch calls)
- Page navigation and state changes

✅ **Manual Configuration**
- User metadata (username, tenant ID, email, role)
- Custom tags with different data types
- State transition tracking

✅ **TypeScript Support**
- Full type definitions for the SDK
- Type-safe integration with Angular

## 🗺️ Uploading Source Maps

Source maps allow Malleon Replay to show you the original source code locations in stack traces instead of minified code. Follow these steps to upload source maps:

### Step 1: Install the Replay CLI

```bash
npm install -g @malleon/replay-cli
```

### Step 2: Build Your Application

```bash
npm run build
```

This will create source map files (`.map`) in your `dist/` directory alongside the compiled JavaScript files.

### Step 3: Get Your Source Map Token

1. Log into the Malleon Replay dashboard
2. Navigate to **Apps** → Select your app → **App Details**
3. Click **"Generate Source Map Token"** or **"Regenerate Source Map Token"**
4. Copy the token (you'll need it for the upload command)

### Step 4: Upload Source Maps

Run the CLI command with your app details:

```bash
replay-cli upload \
  --app-id YOUR_APP_ID \
  --token YOUR_SOURCE_MAP_TOKEN \
  --host localhost \
  --base-url http://localhost:4200 \
  --release 1.0.0 \
  --source-map-dir dist/malleon-example-angular/browser
```

**Parameters:**
- `--app-id`: Your Malleon App ID (same as in `environment.ts`)
- `--token`: The source map token from Step 3
- `--host`: The hostname where your app is served (e.g., `localhost`, `myapp.com`)
- `--base-url`: The full base URL where your app is served (e.g., `http://localhost:4200`, `https://myapp.com`)
- `--release`: Optional release version (e.g., `1.0.0`)
- `--source-map-dir`: Path to your built source maps directory (default: `dist`)

For Angular apps, the source maps are typically in `dist/malleon-example-angular/browser` after building.

### Step 5: Test Source Maps

1. After uploading source maps, trigger an error with a stack trace:
   - Click the **"Generate Error with Stack Trace"** button in the example app
   - Or trigger any error in your application
2. Navigate to **Error Analytics** in the Malleon dashboard
3. View the error details - you should see the original source file names, function names, and line numbers instead of minified code!

### Troubleshooting Source Maps

- **Source maps not working?**
  - Verify the source map files (`.map`) exist in your build output
  - Check that the `--host` and `--base-url` match where your app is actually served
  - Ensure the token is correct and hasn't been regenerated
  - Make sure you're viewing errors that occurred AFTER uploading the source maps

- **Wrong file paths in stack traces?**
  - The `--host` and `--base-url` should match the actual URL where your app is served
  - For local development: `--host localhost --base-url http://localhost:4200`
  - For production: `--host myapp.com --base-url https://myapp.com`

## 🛠️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. Make sure to update `environment.prod.ts` with your production App ID.

**Don't forget to upload source maps after building for production!**

## 📝 API Reference

### ReplayService Methods

#### `updateUserData(userData: ReplayUserData)`
Update user metadata for the current replay session.

```typescript
await replayService.updateUserData({
  username: 'john_doe',
  tenantId: 'tenant-123',
  userEmail: 'john@example.com',
  userRole: 'admin'
});
```

#### `addTag(name: string, value: any, type: TagType)`
Add a single tag to the replay.

```typescript
await replayService.addTag('feature', 'checkout', 'STR');
await replayService.addTag('score', 95, 'NUM');
await replayService.addTag('isActive', true, 'BOOL');
```

#### `addTags(tags: ReplayTag[])`
Add multiple tags at once.

```typescript
await replayService.addTags([
  { name: 'version', value: '1.0.0', type: 'STR' },
  { name: 'timestamp', value: new Date(), type: 'DATETIME' }
]);
```

#### `trackStateTransition(stateName: string)`
Track when users transition between states.

```typescript
await replayService.trackStateTransition('checkout-started');
```

## 🐛 Troubleshooting

### SDK not initializing
- Check that your App ID is set correctly in `environment.ts`
- Check the browser console for error messages
- Ensure `@malleon/replay` is installed: `npm install @malleon/replay`

### Data not appearing in Malleon
- Verify your App ID is correct
- Check your network tab to see if requests are being sent
- Ensure you're viewing the correct app in your Malleon dashboard

### TypeScript errors
- Ensure `@malleon/replay` is installed: `npm install @malleon/replay`
- Check that your TypeScript version is compatible (5.2+)
- Verify imports are using `@malleon/replay` instead of local file paths

## 📚 Learn More

- [malleon.io](https://malleon.io) — live app and account
- [Malleon documentation (GitHub)](https://github.com/malleonio/malleon-documentation)
- [Replay SDK guide](https://github.com/malleonio/malleon-documentation/blob/main/docs/sdk/replay-sdk.md)
- [@malleon/replay on npm](https://www.npmjs.com/package/@malleon/replay)

## 🤝 Support

If you have questions or need help integrating the SDK, please contact Malleon support or check the documentation.

---

**Happy Replaying! 🎬**

