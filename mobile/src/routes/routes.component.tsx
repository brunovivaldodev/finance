import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "../components";
import { Home, User, Categories } from "../pages/";

//Types
import { StackNavigatorParams, TabNavigatorParams } from "./index";
import { SingIn } from "../pages/signIn";
import { SingUp } from "../pages/signUp";
import { Report } from "../pages/report";
import { TransactionProvider } from "../contexts/transactionsContext";

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export function Routes() {
  return (

    <NavigationContainer>
      <TransactionProvider>
        <Stack.Navigator
          initialRouteName="signIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="tabNavigator" component={TabNavigator} />
          <Stack.Screen name="signIn" component={SingIn} />
          <Stack.Screen name="signUp" component={SingUp} />
          <Stack.Screen name="detail" component={Report} />
        </Stack.Navigator>
      </TransactionProvider>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator<TabNavigatorParams>();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar props={props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="report" component={Report} />
      <Tab.Screen name="categories" component={Categories} />
      <Tab.Screen name="user" component={User} />
    </Tab.Navigator>
  );
}
