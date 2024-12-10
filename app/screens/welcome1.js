import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../components/header';

const { width, height } = Dimensions.get('window');

const Welcome1 = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Header />
            </View>


            <Image
                source={require('../assets/bgggggg.jpg')}
                style={styles.backgroundImage}
            />

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Welcome to AI Whisperer</Text>

                <Text style={styles.paragraph}>
                    "Welcome to the Content Authenticity Checker, your ultimate tool for verifying text originality! Whether you’re a student, writer, or professional, our platform ensures your content stands out with its authenticity and quality. Let’s embark on this journey to create credible and impactful content together."
                </Text>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.skipButton]}
                    onPress={() => navigation.replace('Login')}
                >
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.nextButton]}
                    onPress={() => navigation.navigate('Welcome2')}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        paddingHorizontal: 20,
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
    skipButton: {
        backgroundColor: '#34717f',
    },
    nextButton: {
        backgroundColor: '#3ea1a0',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default Welcome1;
