
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import Header from '../components/header';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const [logoutMessage, setLogoutMessage] = useState('');
    const navigation = useNavigation();

    const handleLogout = () => {
        setLogoutMessage('User logged out successfully');

        setTimeout(() => {
            setLogoutMessage('');
            navigation.navigate('Login');
        }, 2000);
    };

    return (
        <ImageBackground
            source={require('../assets/bgggggg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >

            <Header style={styles.header} />

            {logoutMessage ? (
                <View style={styles.successMessage}>
                    <Text style={styles.successMessageText}>{logoutMessage}</Text>
                </View>
            ) : null}

            <View style={styles.mainContent}>
                <Text style={styles.title}>Profile</Text>
                <ImageBackground
                    source={require('../assets/Solution.png')}
                    style={styles.profileCard}
                    imageStyle={styles.profileCardImage}
                >
                    <View style={styles.profileInfo}>
                        <Image
                            source={require('../assets/character.png')}
                            style={styles.profilePic}
                        />
                        <Text style={styles.profileName}>Naima Noor</Text>
                        <Text style={styles.profileEmail}>
                            naimanoor665@gmail.com
                        </Text>
                    </View>
                </ImageBackground>


                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>

            <Navbar />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,


    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    profileCard: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'cover',
    },
    profileCardImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    profileInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    profilePic: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        width: '80%',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    card: {
        width: '100%',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        opacity: 0.8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#FF4D4D',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
        alignSelf: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successMessage: {
        position: 'absolute',
        top: 50,
        left: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '80%',
        alignItems: 'flex-start',
    },
    successMessageText: {
        color: '#3ea1a0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});

export default ProfileScreen;
