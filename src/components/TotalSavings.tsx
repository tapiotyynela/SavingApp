import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import * as Progress from 'react-native-progress';
import RNPickerSelect from 'react-native-picker-select';
import { getAllSavings, getAllGoals, addNewSavingToGoal } from '../api/saving'
import { Goal, Saving, DropDownValue, TotalSavingsProps } from '../interfaces/interfaces'
import { Header } from 'react-native-elements';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const TotalSavings = (props: TotalSavingsProps) => {
    const {
        savings,
        goals,
        getSavingsAndGoals,
        totalSavings
    } = props
    const [amount, setAmount] = useState('')
    const [adInfo, setAdInfo] = useState('')
    const [goalid, setGoalid] = useState(0)
    const [dropDownValues, setDropDownValues] = useState<DropDownValue[]>([])
    const [modalVisible, setModalVisible] = useState(false)

    const addSaving = () => {
        setModalVisible(true)
    }

    const addNewSaving = async (data: Saving) => {
        await addNewSavingToGoal(data)
        setAdInfo('')
        setGoalid(0)
        setAmount('')
        setModalVisible(false)
        await getSavingsAndGoals()
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

    const handleGoalChange = (goalid: any) => {
        setGoalid(goalid)
    };

    const openDropDown = () => {
        const values = goals.map(goal => {
            const data = {
                label: goal.name,
                value: goal.id,
            }
            return data
        })
        setDropDownValues(values)
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

    const closeModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <View style={{ alignItems: 'center', flex: 1, backgroundColor: '#327A7A' }}>
            <Header placement='left'
                centerComponent={{ text: 'Total Savings', style: { fontSize: 20 } }}
                containerStyle={{
                    backgroundColor: '#2E6767',
                }}

            />
            <View style={styles.circleContainer}>
                <Text style={styles.savingText}>All savings</Text>
                <Text style={styles.savingMoneyText}>{totalSavings} €</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={styles.buttonContainer} onPress={addSaving}>
                    <Text style={styles.savingText}>Add saving</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 30, marginBottom: 15 }}>New Saving</Text>
                            <Text>Choose goal:</Text>
                            <RNPickerSelect
                                onValueChange={(value) => handleGoalChange(value)}
                                items={dropDownValues}
                                onOpen={openDropDown}
                                style={{
                                    inputIOS: {
                                        backgroundColor: '#2E6767',
                                        width: width / 1.5,
                                        height: 50,
                                        borderRadius: 8,
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        marginBottom: 10
                                    }
                                }}
                            />
                            <Text>Amount:</Text>
                            <TextInput
                                onChangeText={text => setAmount(text)}
                                value={amount}
                                placeholder='Amount...'
                                placeholderTextColor='lightgrey'
                                keyboardType={'number-pad'}
                                returnKeyType='done'
                                style={{
                                    backgroundColor: '#2E6767',
                                    width: width / 1.5,
                                    height: 50,
                                    borderRadius: 8,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginBottom: 10,
                                    color: 'white'
                                }}
                            />
                            <Text>Additional info:</Text>
                            <TextInput
                                onChangeText={text => setAdInfo(text)}
                                value={adInfo}
                                placeholder='Additional info...'
                                placeholderTextColor='lightgrey'
                                returnKeyType='done'
                                style={{
                                    backgroundColor: '#2E6767',
                                    width: width / 1.5,
                                    height: 50,
                                    borderRadius: 8,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    marginBottom: 10
                                }}
                            />
                            <TextInput />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'space-around', width: width / 1.5 }}>
                                <TouchableOpacity
                                    onPress={() => closeModal()}
                                    style={{ backgroundColor: '#D35C5C', padding: 10, width: '40%', borderRadius: 8, alignItems: 'center' }}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        const data = {
                                            goalid: goalid,
                                            adinfo: adInfo,
                                            amount: parseFloat(amount)
                                        }
                                        addNewSaving(data)
                                    }}
                                    style={{ backgroundColor: '#61B564', padding: 10, width: '40%', borderRadius: 8, alignItems: 'center' }}
                                >
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        marginTop: '10%',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#497E7E",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        marginTop: 20,
        padding: 7,
        borderRadius: 10,
        backgroundColor: 'blue',
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