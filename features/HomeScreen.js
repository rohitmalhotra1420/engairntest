import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Form, Item, Input, Button, Toast } from 'native-base'
import { getDataFromAsteroidId, getBrowseAsteroidData } from './api';
class HomeScreen extends Component {
    state = {
        inputValue: null,
        loadingData: false
    }
    showToast = (text) => {
        Toast.show({
            text,
            duration: 3000
        })
    }
    handleInputChange = (newValue) => {
        this.setState({
            inputValue: newValue ? newValue : null
        })
    }
    handleSubmit = (inputValue) => {
        this.setState({ loadingData: true })
        const { navigation: { navigate } } = this.props;
        getDataFromAsteroidId(inputValue)
            .then(response => {
                this.setState({ loadingData: false })
                console.log('ASTEROID ID DATA', response)
                if (response && response.data && response.data.name) {
                    const details = {
                        isHazardous: response.data.is_potentially_hazardous_asteroid,
                        name: response.data.name,
                        url: response.data.nasa_jpl_url
                    }
                    navigate('Detail', { details })
                } else {
                    this.showToast('Oops! Something went wrong')
                }
            })
            .catch(error => {
                this.setState({ loadingData: false })
                this.showToast(error.message)
            })
    }
    getRandomItem = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    handleRandomAsteroid = () => {
        this.setState({ loadingData: true })
        getBrowseAsteroidData()
            .then(response => {
                console.log("BROWSE RESPONSE", response)
                if (response &&
                    response.data &&
                    response.data.near_earth_objects &&
                    response.data.near_earth_objects.length > 0) {
                    let randomAsteroid = this.getRandomItem(response.data.near_earth_objects)
                    this.handleSubmit(randomAsteroid.id)
                } else {
                    this.showToast('Oops! Something went wrong')
                }
            })
            .catch(error => {
                this.setState({ loadingData: true })
                this.showToast(error.message)
            })
    }
    render() {
        const { inputValue, loadingData } = this.state
        return (
            <View style={styles.container}>
                {loadingData && <Text style={styles.loadingText}>
                    Loading...
                </Text>}
                <Text style={styles.loadingText}>
                    Asteroid ID for testing: 3542519
                </Text>
                <Form>
                    <Item style={styles.input}>
                        <Input
                            placeholder="Enter Asteroid ID"
                            onChangeText={this.handleInputChange}
                            value={inputValue}
                            editable={!loadingData}
                        />
                    </Item>
                    <Button
                        primary
                        style={styles.btn}
                        onPress={() => this.handleSubmit(inputValue)}
                        disabled={inputValue ? false : true}
                    >
                        <Text style={styles.btnText}>
                            Submit
                        </Text>
                    </Button>
                    <Button success style={styles.btn} onPress={this.handleRandomAsteroid}>
                        <Text style={styles.btnText}>
                            Random Asteroid
                        </Text>
                    </Button>
                </Form>
            </View>

        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    btn: {
        margin: 15,
        justifyContent: 'center'
    },
    input: {
        marginBottom: 10
    },
    loadingText: {
        textAlign: 'center',
        marginVertical: 20
    }
})