import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator, MyMusicStackNavigator } from './StackNavigator';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                backgroundColor: 'white',
            },
        }}>
            <Tab.Screen name='HomeTab' component={HomeStackNavigator}
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: () => (
                        <AntDesign name="youtube" size={24} color={'gray'} />
                    ),
                }}
            />
            <Tab.Screen name='MyMusicTab' component={MyMusicStackNavigator}
                options={{
                    title: 'My music',
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}
