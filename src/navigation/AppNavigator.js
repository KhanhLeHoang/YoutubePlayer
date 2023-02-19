import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator, MyMusicStackNavigator } from './StackNavigator';
import { AntDesign } from '@expo/vector-icons'; import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

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
                    title: 'Youtube',
                    headerShown: false,
                    tabBarIcon: () => (
                        <AntDesign name="youtube" size={24} color={'gray'} />
                    ),
                }}
            />
            {/* <Tab.Screen name='MyMusicTab' component={MyMusicStackNavigator}
                options={{
                    title: 'My music',
                    headerShown: false,
                    tabBarIcon: () => (
                        <Fontisto name="music-note" size={24} color="gray" />
                    ),
                }}
            /> */}
            <Tab.Screen
                name='AudioList'
                component={MyMusicStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='headset' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='Player'
                component={MyMusicStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name='compact-disc' size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name='PlayList'
                component={MyMusicStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='library-music' size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
