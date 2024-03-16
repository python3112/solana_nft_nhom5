import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TopBar } from "../components/top-bar/top-bar-feature";
import { HomeScreen } from "../screens/HomeScreen";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import BlankScreen from "../screens/BlankScreen";
import Rewart from "../screens/Rewart";
import TransicionHitoryScreen from "../screens/TransicionHitoryScreen";

const Tab = createBottomTabNavigator();

/**
 * This is the main navigator with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function HomeNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <TopBar />,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <MaterialCommunityIcon
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            case "Rank":
              return (
                <MaterialCommunityIcon
                  name={
                    focused ? "chart-areaspline" : "chart-areaspline"
                  }
                  size={size}
                  color={color}
                />
              );
              case "Reward":
                return (
                  <MaterialCommunityIcon
                    name={
                      focused ? "widgets" : "widgets-outline"
                    }
                    size={size}
                    color={color}
                  />
                );
                case "History":
                  return (
                    <MaterialCommunityIcon
                      name={
                        focused ? "history" : "history"
                      }
                      size={size}
                      color={color}
                    />
                  );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Rank" component={BlankScreen} />
      <Tab.Screen name="Reward" component={Rewart} />
      <Tab.Screen name="History" component={TransicionHitoryScreen} />
    </Tab.Navigator>
  );
}
