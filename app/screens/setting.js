import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ImageBackground, Linking } from 'react-native';
import Navbar from '../components/Navbar';
import Header from '../components/header';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkMode, setDarkMode] = React.useState(false);
    const [logoutMessage, setLogoutMessage] = useState('');

    const navigation = useNavigation();

    const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setDarkMode(previousState => !previousState);

    const handleShare = () => {
        Linking.openURL('https://www.yourappwebsite.com');
    };
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
            <Header />

            {logoutMessage ? (
                <View style={styles.successMessage}>
                    <Text style={styles.successMessageText}>{logoutMessage}</Text>
                </View>
            ) : null}

            <View style={styles.mainContent}>
                <Text style={styles.title}>Settings</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Notifications</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.cardText}>Enable Notifications</Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={toggleNotifications}
                        />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Theme</Text>
                    <View style={styles.switchContainer}>
                        <Text style={styles.cardText}>Dark Mode</Text>
                        <Switch
                            value={darkMode}
                            onValueChange={toggleDarkMode}
                        />
                    </View>
                </View>


                <View style={styles.card}>
                    <Text style={styles.cardTitle}>About</Text>
                    <TouchableOpacity onPress={() => alert('This is an app about [your app description].')}>
                        <Text style={styles.cardText}>Learn more about the app</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Version</Text>
                    <Text style={styles.cardText}>1.0.0</Text>
                </View>

                {/* Share Option */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Share</Text>
                    <TouchableOpacity onPress={handleShare}>
                        <Text style={styles.cardText}>Share with others</Text>
                    </TouchableOpacity>
                </View>

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
        color: '#fff',
    },
    card: {
        width: '100%',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        color: '#fff',
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

export default SettingsScreen;
