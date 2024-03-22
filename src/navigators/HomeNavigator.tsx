import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TopBar } from "../components/top-bar/top-bar-feature";
import { HomeScreen } from "../screens/HomeScreen";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import BlankScreen from "../screens/BlankScreen";
import Rewart from "../screens/Rewart";
import { Image, TouchableOpacity, View  , Text } from 'react-native'
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
       tabBarShowLabel:false,
        tabBarStyle: { position: 'absolute', bottom: 20, left: 20, right: 20, height: 70  , elevation : 0 ,  borderRadius : 15 },
        header: () => <TopBar />,
        // tabBarIcon: ({ focused, color, size }) => {
        //   switch (route.name) {
        //     case "Home":
        //       return (
        //         <MaterialCommunityIcon
        //           name={
        //             focused ? "chart-areaspline" : "chart-areaspline"
        //           }
        //           size={25}
        //           color={color}
        //         />

        //       );
        //     case "Rank":
        //       return (
        //         <MaterialCommunityIcon
        //           name={
        //             focused ? "chart-areaspline" : "chart-areaspline"
        //           }
        //           size={size}
        //           color={color}
        //         />
        //       );
        //     case "Reward":
        //       return (
        //         <MaterialCommunityIcon
        //           name={
        //             focused ? "widgets" : "widgets-outline"
        //           }
        //           size={size}
        //           color={color}

        //         />
        //       );
        //     case "History":
        //       return (
        //         <MaterialCommunityIcon
        //           name={
        //             focused ? "history" : "history"
        //           }
        //           size={size}
        //           color={color}
        //         />
        //       );
        //   }
        // },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen}
       options={{
        tabBarIcon :({ focused }) => (
          <View style={{backgroundColor : focused ?"rgba(169, 169, 169, 0.3)" : '' , borderRadius : 25 ,padding : 10}}>
              <Image source={require('../../images/house.png')} />
              <Text style={{ color : focused ? "red" :  "black" , fontSize : 12 , fontWeight :"bold" }}>
                Home
              </Text>

             
          </View>
        ),
      }}/>
      <Tab.Screen name="Rank" component={BlankScreen} 
      options={{
        headerShown:false,
        tabBarIcon :({ focused }) => (
          <View style={{backgroundColor : focused ?"rgba(169, 169, 169, 0.3)" : '' , borderRadius : 25 ,padding : 10}}>
              <Image source={require('../../images/ranking2.png')} />
              <Text style={{ color : focused ? "red" :  "black" , fontSize : 12 , fontWeight :"bold" }}>
                Rank
              </Text>

             
          </View>
        ),
      }} />
      <Tab.Screen name="Reward" component={Rewart}  options={{
        headerShown:false,
        tabBarIcon :({ focused }) => (
          <View style={{backgroundColor : focused ?"rgba(169, 169, 169, 0.3)" : '' , borderRadius : 25 ,padding : 10}}>
              <Image source={require('../../images/reward.png')} />
              <Text style={{ color : focused ? "red" :  "black" , fontSize : 12 , fontWeight :"bold" }}>
                Rewart
              </Text>

             
          </View>
        ),
      }} />
      <Tab.Screen name="History" component={TransicionHitoryScreen}  options={{
        headerShown:false,
        tabBarIcon :({ focused }) => (
          <View style={{backgroundColor : focused ?"rgba(169, 169, 169, 0.3)" : '' , borderRadius : 25 ,padding : 10}}>
              <Image source={require('../../images/file.png')} />
              <Text style={{ color : focused ? "red" :  "black" , fontSize : 12 , fontWeight :"bold" }}>
                History
              </Text>

             
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}
