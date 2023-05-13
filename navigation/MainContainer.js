import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { SearchScreen } from "./screens/Search";
import { SettingsScreen } from "./screens/Settings";
import { EarthMap } from "./screens/Map";

const Tab = createBottomTabNavigator();

export default function MainContainer() {

    return(
        <NavigationContainer>
            <Tab.Navigator 
                initialRouteName = "Search"
            >
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Map" component={EarthMap} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}