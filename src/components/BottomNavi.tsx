import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import TotalSavings from './TotalSavings'
import SavingHistory from './SavingHistory'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getAllSavings, getAllGoals } from '../api/saving'
import { Goal, Saving } from '../interfaces/interfaces'

const Tab = createBottomTabNavigator();

const TabNavi = () => {
    const [savings, setSavings] = useState<Saving[]>([])
    const [goals, setGoals] = useState<Goal[]>([])
    const [totalSavings, setTotalSavings] = useState(0)


    useEffect(() => {
        getSavingsAndGoals()
    }, [])

    const getSavingsAndGoals = async () => {
        const savings = await getAllSavings()
        const goals = await getAllGoals()
        setSavings(savings)
        setGoals(goals)
        countTotalSavings(savings)
    }

    const countTotalSavings = (savings: Saving[]) => {
        let savingTotalSum = 0
        for (let i = 0; i < savings.length; i++) {
            savingTotalSum = savingTotalSum + savings[i].amount
        }
        setTotalSavings(savingTotalSum)
    }

    return (
        <Tab.Navigator
            initialRouteName='TotalSavings'
            tabBarOptions={{
                activeTintColor: '#91e63',
                style: {
                    backgroundColor: '#327A7A'
                },
                labelStyle: {
                    fontSize: 12
                }
            }}
            style
        >
            <Tab.Screen
                name='TotalSavings'
                children={() => <TotalSavings savings={savings} goals={goals} getSavingsAndGoals={getSavingsAndGoals} totalSavings={totalSavings} />}
                options={{
                    tabBarLabel: 'Total Savings',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home" color="#335959" size={30} />
                    ),
                    title: 'My home',
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTintColor: '#ffff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Tab.Screen
                name='SavingHistory'
                children={() => <SavingHistory savings={savings} />}
                options={{
                    tabBarLabel: 'Saving History',
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