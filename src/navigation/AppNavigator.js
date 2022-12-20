import React from 'react';
import Home from '../view/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListMusic from '../view/ListAudio';

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    return (<Tab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: 'red',

        },
    }}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='ListMusic' component={ListMusic} />
    </Tab.Navigator>
    )
}