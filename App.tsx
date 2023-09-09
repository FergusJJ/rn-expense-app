import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import {UserContextProvider} from "./components/contexts/UserContext"
import {AppSettingsContextProvider} from "./components/contexts/AppSettingsContext"
//might need to add another check on app load if auth is found to make sure that the user is in firestore.


//for main page, want a pie chart with the spending and categories, should be scrollable with bars denoting the current spend and the remaining spend left in bars beneath, similar to the app dad has 
//settings DeleteAccount does't work idk why

//need to make sure that the app dekays updating context or something until all the app settings have been fetched.
export default function App() {

      return ( 
        <UserContextProvider>
          <AppSettingsContextProvider> 
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </AppSettingsContextProvider>
        </UserContextProvider>
      );
}