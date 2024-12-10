// // Navbar.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // For icons
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const Navbar = () => {
    const navigation = useNavigation(); // Access navigation object

    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 name="home" size={27} color="white" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('NotificationsScreen')}>
                <FontAwesome5 name="bell" size={27} color="white" />
                <Text style={styles.navText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
                <FontAwesome5 name="cogs" size={27} color="white" />
                <Text style={styles.navText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                <FontAwesome5 name="user" size={27} color="white" />
                <Text style={styles.navText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Evenly space out the items
        alignItems: 'center',
        height: 70, // Increased height to give space for the text
        backgroundColor: '#34717f', // Transparent background with slight opacity
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 1, // Add some padding for better alignment
        //  zIndex: 10, // Ensure navbar is above other content
    },
    navItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    navText: {
        fontSize: 12, // Increased font size to be more readable
        color: 'white', // Darker color for better contrast
        marginTop: 5,
        textAlign: 'center',
        flexWrap: 'wrap', // Allow text to wrap into multiple lines
        width: '100%', // Allow the text to use the full width
    },
});

export default Navbar;
