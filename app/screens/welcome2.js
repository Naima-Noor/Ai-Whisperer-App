import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/header';

const { width, height } = Dimensions.get('window');

const Welcome2 = ({ navigation }) => {
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


            <Text style={styles.title}>How It Works</Text>

            <Text style={styles.paragraph}>
                Getting started is simple! Upload your document, and our AI-powered tool will analyze it in seconds. We provide insights into the originality of your content, highlighting AI-generated and human-written sections. It’s fast, accurate, and user-friendly—making content analysis a breeze.
            </Text>


            <View style={styles.buttonContainer}>
                {/* Skip Button */}
                <TouchableOpacity
                    style={[styles.button, styles.previousButton]}
                    onPress={() => navigation.replace('Welcome1')}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={[styles.button, styles.getstartedButton]}
                    onPress={() => navigation.navigate('Welcome3')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
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
        zIndex: 1,
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
    logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
        position: 'absolute',
        top: 50,
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
        paddingHorizontal: 55,
        borderRadius: 30,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    previousButton: {
        backgroundColor: '#34717f',
    },
    getstartedButton: {
        backgroundColor: '#3ea1a0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default Welcome2;
