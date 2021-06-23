import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import TotalSavings from './TotalSavings'
import SavingHistory from './SavingHistory'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

const TabNavi = () => {
    return (
        <Tab.Navigator
            initialRouteName='TotalSavings'
            tabBarOptions={{
                activeTintColor: '#91e63',
                style: {
                    backgroundColor: '#327A7A'
                }
            }}
            style
        >
            <Tab.Screen
                name='TotalSavings'
                component={TotalSavings}
                options={{
                    tabBarLabel: 'TotalSavings',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color="#335959" size={30} />
                    )
                }}
            />
            <Tab.Screen
                name='SavingHistory'
                component={SavingHistory}
                options={{
                    tabBarLabel: 'Updates',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="bell" color="#335959" size={30} />
                    )
                }}
            />
        </Tab.Navigator>
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

export default TabNavi;