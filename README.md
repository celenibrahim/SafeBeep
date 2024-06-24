<h1 align="center">SAFEBEEP</h1>
SafeBeep is an easy-to-use mobile cash register application developed using React Native. With its rich features, it helps you easily perform and track processes such as sales transactions, product and sales management. It offers advanced features such as end-of-day and sales reports, personnel management, and offline mode support.

This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
## Introduce
1. [Features and Used Technologies](#features-and-used-technologies)
2. [Getting Started and Usage](#getting-started-and-usage)
   1. [Step 1: Install](#step-1-install)
   2. [Step 2: Setup](#step-2-setup)
   3. [Step 3: Start the Metro Server](#step-3-start-the-metro-server)
   4. [Step 4: Start Your Application](#step-4-start-your-application)
   5. [Step 5: Modifying Your App](#step-5-modifying-your-app)
   6. [Optional Start](#optional-start-bulb)
3. [Mockoon](#mockoon)
4. [Troubleshooting](#troubleshooting)
5. [Learn More](#learn-more)
## Features And Used Technologies
* Responsive Design.
* Component Based Structure.
* Multi Language.
* Usable React and Custom Hooks.
* State Management with **Context Api**.
* Local Storage with **Async-Storage**.

**1. Mockoon:** **Mockoon** was used for mock services and version information was pulled from the **Mockoon**.

**2. Context Api:** Used for data flow and global state management.

**3. Hooks:** Used for managing complex state logic, retrieve data, share data between components, and define state variables.

**4. Async Storage:** Users credentials, sales history, cart informations and other data are stored in local storage.

**5. i18next:** i18next is used for multi-language support.

# Getting Started and Usage

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
## Step 1: Install
```sh
Clone this repository using with `gh repo clone lostkennedy187erz/SafeBeep`
Navigate to the project directory with `cd SafeBeep`
```
## Step 2: Setup
```sh
Install the packages using with `npm install`
```
## Step 3: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start your Application
Don't forget to connect your **Android** or **IOS** device or start an emulator.

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 5: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!
## Optional Start :bulb:
```sh
You can directly start the app with `npx react-native run-android`
```
## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Mockoon

### What's Mockoon?
Mockoon is a free and open source tool that allows you to simulate REST APIs quickly and easily. It can be used in place of real APIs in development and testing.

### Install Mockoon
To install Mockoon, follow these steps:
1. Go to the Mockoon website: [mockoon.com](https://mockoon.com)
2. Download and install the version appropriate for your operating system.
3. Once the installation is complete, launch Mockoon.

### Creating Mock API with Mockoon
To create a mock API with Mockoon, follow these steps:
1. After starting Mockoon, create a new environment.
2. Add a new endpoint and make the necessary settings (method, URL, response, etc.).
3. After configuring your mock API, start the API by clicking the "Start" button.
4. Test your mock API with the browser or tools like Postman.

### Integrating Mockoon API
To integrate the mock API you created with Mockoon into your project, follow these steps:
1. After initializing the API you created with Mockoon, get the API URL (for example, http://localhost:3000).
2. Direct API requests to this URL in your project.
3. Use the API to perform your development and testing processes.
```sh
#For example
fetch('http://localhost:3000/api/v1/resource')
  .then(response => response.json())
  .then(data => console.log(data));
```
### Important :exclamation:
If you want to use the API you created with Mockoon on your local network, you can use your computer's local IP address instead of localhost. This is especially necessary if mobile emulators or other devices on your local network want to access your API.

You can update the settings to use the IP address by following the steps below:
1. Find Your Computer's Local IP Address:
   * Windows: Find IPv4 Address using `ipconfig` command
   * macOS/Linux: Find the IP address using the `ifconfig` or `ip addr` commands.
2. Configure Mockoon with IP Address:
   * In Mockoon, open the environment settings.
   * Enter your computer's local IP address in the Hostname section.
```sh
#For Example
fetch('http://192.168.1.100:3000/api/v1/resource')
  .then(response => response.json())
  .then(data => console.log(data));
```
# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
