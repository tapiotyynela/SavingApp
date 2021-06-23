import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Modal, TextInput } from 'react-native'
import * as Progress from 'react-native-progress';
import { getAllSavings, getAllGoals } from '../api/saving'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

interface Goal {
    id: number
    name: string
    moneygoal: number
    adInfo: string
}

interface Saving {
    amount: number
    adInfo: string
    goalid: number
}

const TotalSavings = () => {
    const [savings, setSavings] = useState<Saving[]>([])
    const [goals, setGoals] = useState<Goal[]>([])
    const [saving, setSaving] = useState(0)
    const [totalSavings, setTotalSavings] = useState(0)

    useEffect(() => {
        getSavingsAndGoals()
        countTotalSavings()
    }, [savings])

    const getSavingsAndGoals = async () => {
        const savings = await getAllSavings()
        const goals = await getAllGoals()
        setSavings(savings)
        setGoals(goals)
    }

    const addSaving = () => {
        console.log("SA", saving)
    }

    const countTotalSavings = () => {
        let savingTotalSum = 0
        for (let i = 0; i < savings.length; i++) {
            savingTotalSum = savingTotalSum + savings[i].amount
        }
        setTotalSavings(savingTotalSum)
    }

    const countProgress = (goal: number, savings: number, addedSaving?: number) => {
        if (addedSaving) {
            const total = addedSaving + savings
            const percentage = total / goal
            return percentage
        } else {
            return savings / goal
        }
    }

    const renderProgressForGoal = (goal: Goal, i: number) => {
        const goalSavings = savings.filter(s => s.goalid === goal.id)
        let savingsSum = 0
        for (let i = 0; i < goalSavings.length; i++) {
            savingsSum = savingsSum + goalSavings[i].amount
        }
        return (
            <View key={i} style={styles.progressView}>
                <Text style={styles.savingText}>{goal.name}</Text>
                <Progress.Bar progress={countProgress(goal.moneygoal, savingsSum)} width={300} height={20} style={styles.progress} borderColor='#2E6767' color='#2E6767'>
                    <Text style={{ position: 'absolute', flex: 0, marginLeft: 10, color: 'white' }}>{savingsSum} / {goal.moneygoal}</Text>
                </Progress.Bar>
            </View>
        )
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, backgroundColor: '#327A7A' }}>
            <View style={styles.circleContainer}>
                <Text style={styles.savingText}>All savings</Text>
                <Text style={styles.savingMoneyText}>{totalSavings} €</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={addSaving}>
                    <Text style={styles.savingText}>Add saving</Text>
                </TouchableOpacity>
                <View>
                    {
                        goals.length > 0 ? (
                            goals.map((goal, i) => (
                                renderProgressForGoal(goal, i)
                            ))
                        ) : <></>
                    }
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    circleContainer: {
        marginTop: height / 8,
        width: width / 1.7,
        height: height / 4,
        borderRadius: 150,
        backgroundColor: '#2E6767',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {
            width: 5,
            height: 4
        },
        shadowOpacity: 0.3,
    },
    buttonContainer: {
        backgroundColor: '#2E6767',
        borderRadius: 20,
        height: 50,
        marginTop: 50,
        marginBottom: 20,
        width: width / 1.7,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.3,
    },
    progressView: {
        padding: 10,
        borderColor: '#2E6767',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#497E7E',
        marginBottom: 10,
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 1
        },
        shadowOpacity: 0.3,
    },
    input: {
        marginTop: 20,
        padding: 7,
        borderRadius: 10,
        backgroundColor: '#2E6767',
        width: width / 2,
        color: 'white'
    },
    progress: {
        marginTop: 5,
    },
    savingText: {
        color: 'white',
        fontSize: 20
    },
    savingMoneyText: {
        color: 'white',
        fontSize: 30,
    }
})

export default TotalSavings;