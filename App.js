//import Operations from "./Components/Operations";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GamePlay from "./Components/GamePlay";
import Api from "./Components/Api";
import { ContextProvider } from "./Operations/Context";

const Tab = createBottomTabNavigator();

const App = () => {
  // const styles = useAppStyles();
  console.log("App component rendered");

  return (
    <>
      <ContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Guess The City"
            backBehavior="history" // This will keep the history of the navigation stack
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "#1976d2",
              tabBarInactiveTintColor: "#888",
              tabBarStyle: { backgroundColor: "#e3f2fd" },
            }}
          >
            <Tab.Screen name="Guess The City" component={GamePlay} options={{ tabBarLabel: "Home" }} />
            {/* <Tab.Screen name="Database" component={Operations} options={{ tabBarLabel: "Database" }} /> */}
            <Tab.Screen name="Weather" component={Api} options={{ tabBarLabel: "Weather" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </>
  );
};

export default App;
