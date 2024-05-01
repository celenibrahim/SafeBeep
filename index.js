/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import './src/i18n/i18n.config';
AppRegistry.registerComponent(appName, () => Router);
