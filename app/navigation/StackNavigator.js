import React from "react";
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LogoHeader from '../components/LogoHeader';
import GmailButton from "../components/GmailButton";

import Home from "../screens/Youtube/Home";
import Playlists from "../screens/Youtube/YoutubePlaylist";
import PlaylistItems from "../screens/Youtube/PlaylistItems";
import YoutubePlayer from "../screens/Youtube/YoutubePlayer";
import SearchVideo from "../screens/Youtube/SearchVideo";

import PlayListDetail from '../screens/Audio/PlayListDetail';
import PlayList from '../screens/Audio/PlayList';

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

            <Stack.Screen name="Player" component={YoutubePlayer}
                options={({ route }) => ({
                    title: route.params.playlistTitle,
                    headerTitleAlign: 'center',
                    // headerTitle: () => <LogoHeader />,
                    headerRight: () => <GmailButton />,
                })} />
            <Stack.Screen name="Search" component={SearchVideo}
                options={({ route }) => ({
                    title: route.params.search,
                    headerTitleAlign: 'center',
                    // headerTitle: () => <LogoHeader />,
                    headerRight: () => <GmailButton />,
                })} />
        </Stack.Navigator>
    );
}

export const PlaylistStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='PlayList' component={PlayList} />
            <Stack.Screen name='PlayListDetail' component={PlayListDetail} />
        </Stack.Navigator>
    );
}

