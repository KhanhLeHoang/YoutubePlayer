import React from "react";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LogoHeader from '../components.js/LogoHeader';
import GmailButton from "../components.js/GmailButton";

import Home from "../screens/Home";
import Playlists from "../screens/Playlists";
import MyMusic from "../screens/MyMusic";
import PlaylistItems from "../screens/PlaylistItems";
import Player from "../screens/Player";

const Stack = createStackNavigator();

export const HomeStackNavigator = () => {
    const { access_token, userData } = useSelector(state => state.reducer);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <Stack.Screen name="Home" component={Home}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: () => access_token && userData ? <LogoHeader /> : null,
                    headerRight: () => <GmailButton />,
                }}
            />
            <Stack.Screen name="Playlists" component={Playlists}
                options={{
                    title: 'My playlists',
                    headerTitleAlign: 'center',
                    // headerTitle: () => <LogoHeader />,
                    headerRight: () => <GmailButton />,
                }} />
            <Stack.Screen name="PlaylistItems" component={PlaylistItems}
                options={({ route }) => ({
                    title: route.params.playlistTitle,
                    headerTitleAlign: 'center',
                    // headerTitle: () => <LogoHeader />,
                    headerRight: () => <GmailButton />,
                })} />

            <Stack.Screen name="Player" component={Player}
                options={({ route }) => ({
                    title: route.params.playlistTitle,
                    headerTitleAlign: 'center',
                    // headerTitle: () => <LogoHeader />,
                    headerRight: () => <GmailButton />,
                })} />
        </Stack.Navigator>
    );
}

export const MyMusicStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyMusic" component={MyMusic} options={{ title: 'My music' }} />
        </Stack.Navigator>
    );
}

