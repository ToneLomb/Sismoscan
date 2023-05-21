import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchScreen } from "./screens/Search";
import { HomeScreen } from "./screens/Home";
import { EarthMap } from "./screens/Map";

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName = "Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                      } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                      } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                      }
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#56A8D2',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: {height: 65},
                    tabBarItemStyle: {padding: 8},
                    tabBarLabelStyle: {fontWeight: "bold"}
                  })}
            >
                <Tab.Screen 
                    name="Search" 
                    component={SearchScreen} />
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} />
                <Tab.Screen 
                    name="Map" component={EarthMap} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}