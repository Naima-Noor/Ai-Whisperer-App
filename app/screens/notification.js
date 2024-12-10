import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Navbar from '../components/Navbar';
import Header from '../components/header';

const NotificationsScreen = () => {
    // Mock notifications data
    const notifications = [
        { id: 1, title: 'New Message', description: 'You have a new message from John.' },
        { id: 2, title: 'App Update', description: 'Version 2.0 is now available. Update your app.' },
        { id: 3, title: 'Event Reminder', description: 'Don\'t forget the meeting at 3 PM today.' },
        { id: 4, title: 'System Alert', description: 'Your battery is low, please charge your device.' },
        { id: 5, title: 'Promotion', description: 'Get 20% off on your next purchase.' },
    ];

    return (
        <ImageBackground
            source={require('../assets/bgggggg.jpg')}
            style={styles.container}
            resizeMode="cover"
        >

            <Header />


            <ScrollView style={styles.mainContent}>
                <Text style={styles.notificationsTitle}>Notifications</Text>


                {notifications.map((notification) => (
                    <View key={notification.id} style={styles.notificationCard}>
                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                        <Text style={styles.notificationDescription}>{notification.description}</Text>
                    </View>
                ))}
            </ScrollView>


            <Navbar />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    mainContent: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
    },
    notificationsTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    notificationCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    notificationDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});

export default NotificationsScreen;
