import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/header';

const { width, height } = Dimensions.get('window');

const Welcome3 = ({ navigation }) => {
    return (

        <View style={styles.container}>
            {/* Header fixed at the top */}
            <View style={styles.headerContainer}>
                <Header />
            </View>
            <Image
                source={require('../assets/bgggggg.jpg')}
                style={styles.backgroundImage}
            />


            <Text style={styles.title}>Your Gateway to Content Insights</Text>

            <Text style={styles.paragraph}>
                Welcome back! Log in to continue analyzing your content or sign up to unlock the power of AI-driven text authenticity checks. Join our community of creators, professionals, and students dedicated to originality and quality.
            </Text>


            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.signupButton]}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1, // Ensure the header stays above other elements
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        lineHeight: 28,
        letterSpacing: 0.5,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 70,
        borderRadius: 30,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    loginButton: {
        backgroundColor: '#34717f',
    },
    signupButton: {
        backgroundColor: '#3ea1a0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default Welcome3;
