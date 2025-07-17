//import Operations from "./Components/Operations";
import React from "react";
import { SafeAreaProvider, StyleSheet } from "react-native";
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
       <SafeAreaView style={styles.container}>
      <ContextProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Guess The City"
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});



export default App;
