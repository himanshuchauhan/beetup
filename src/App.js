import { setGlobal } from 'reactn';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/Login';
import EventDetailsScreen from './screens/EventDetails';
import EventListScreen from './screens/EventList';
import UserEventsScreen from './screens/UserEvents';

import mockData from '../assets/data.json';

const AppStack = createStackNavigator(
  {
    EventListScreen: EventListScreen,
    EventDetailsScreen: EventDetailsScreen,
  },
  {
    headerMode: 'none',
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    AppStack: AppStack,
  },
  {
    contentComponent: UserEventsScreen,
    drawerPosition: 'right',
  },
);

const GlobalNavigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    App: DrawerNavigator,
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

const AppContainer = createAppContainer(GlobalNavigator);

// initalize global state object accessible by useGlobal hook from package reactn
setGlobal({
  userName: '',
  userEvents: [],
  mockData,
});

export default AppContainer;
