import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchScreen } from "./screens/Search";
import { SettingsScreen } from "./screens/Settings";
import { EarthMap } from "./screens/Map";
import { AdviceScreen } from "./screens/Advice";

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName = "Search"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                      } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                      } else if (route.name === 'Map') {
                        iconName = focused ? 'map' : 'map-outline';
                      } else if (route.name === 'Advice') {
                        iconName = focused ? 'bookmark' : "bookmark-outline";
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
                    name="Settings" 
                    component={SettingsScreen} />
                <Tab.Screen 
                    name="Map" component={EarthMap} />
                <Tab.Screen
                    name="Advice" component={AdviceScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}