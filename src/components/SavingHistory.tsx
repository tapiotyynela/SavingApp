import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { SavingHisoryProps } from '../interfaces/interfaces'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Header } from 'react-native-elements';

const SavingHistory = (props: SavingHisoryProps) => {
    const {
        savings
    } = props
    console.log("SAVOINGS HERE", savings)
    return (
        <View style={styles.savingContainer}>
            <Header placement='left' centerComponent={{ text: 'Saving History', style: { fontSize: 20 } }} containerStyle={{
                backgroundColor: '#2E6767',
                marginBottom: 20
            }} />
            <ScrollView contentContainerStyle={styles.savingListingContainer} bounces={true} alwaysBounceVertical={true}
            >
                {
                    savings && savings.length > 0 ?
                        savings.map((saving, i) =>
                            <View key={i} style={styles.saving}>
                                <MaterialCommunityIcons name="cash-multiple" color="#335959" size={30} style={{ marginRight: 15 }} />
                                <View style={styles.savingTexts}>
                                    <Text style={styles.savingText}>Saved: {saving.amount} €</Text>
                                    <Text style={styles.savingText}>Additional info: {saving.adinfo !== 'undefined' ? saving.adinfo : ''}</Text>
                                </View>
                            </View>
                        ) :
                        <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                            <Text>EI TALLETUKSIA</Text>
                        </View>
                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    savingListingContainer: {
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
    },
    savingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 30,
        color: 'white',
    },
    savingText: {
        color: 'white',
        marginBottom: 5,
        flexShrink: 1
    },
    savingTexts: {
        flexShrink: 1
    },
    saving: {
        flexDirection: 'row',
        padding: 10,
        width: '90%',
        borderColor: '#2E6767',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#497E7E',
        marginBottom: 10,
        alignItems: 'flex-start',
        shadowColor: 'black',
        shadowRadius: 2,
        shadowOffset: {
            width: 2,
            height: 1
        },
        shadowOpacity: 0.3,

    }
})

export default SavingHistory;