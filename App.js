import Operations from "./Components/Operations";
import GamePlay from "./Components/GamePlay";
import Api from "./Components/Api";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalcContext, CalcContextProvider } from "./Operations/calcContext";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <CalcContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Calculator"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#1976d2",
            tabBarInactiveTintColor: "#888",
            tabBarStyle: { backgroundColor: "#e3f2fd" },
          }}
        >
          <Tab.Screen name="Guess The City" component={GamePlay} options={{ tabBarLabel: "Home" }} />
          <Tab.Screen name="Database" component={Operations} options={{ tabBarLabel: "Database" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </CalcContextProvider>
  );
};

export default App;
