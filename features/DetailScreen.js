import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


const DetailScreen = ({ navigation }) => {
    const details = navigation.getParam('details')
    console.log(details)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Name: {details.name}
            </Text>
            <Text style={styles.text}>
                Is Potentially Hazardous Asteroid: {JSON.stringify(details.isHazardous)}
            </Text>
            <Text style={styles.text}>
                Nasa Jlp Url: {details.url}
            </Text>
        </View>
    )
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        flex: 1
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 10
    }
})