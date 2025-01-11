import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();

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
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#34717f',
        borderTopWidth: 1,
        borderTopColor: '#dcdcdc',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 1,

    },
    navItem: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    navText: {
        fontSize: 12,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        flexWrap: 'wrap',
        width: '100%',
    },
});

export default Navbar;
