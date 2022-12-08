import React from 'react';
import Home from '../../Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    return (<Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
    </Tab.Navigator>
    )
}