import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import TabNavi from './components/BottomNavi'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        primary: '#327A7A',
        background: '#327A7A'
    }
}
const App = () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <TabNavi />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#327A7A',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})

export default App;