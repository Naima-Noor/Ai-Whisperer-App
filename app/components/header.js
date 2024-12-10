// Header.js
import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

const Header = () => {

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
            <Image
                source={require('../assets/logo.png')} // Replace with the path to your logo
                style={styles.logo}
            />
        </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', // Align the logo to the left
        alignItems: 'center',
        paddingLeft: 2,
        padding: 25, // Space from the edges
        height: 70, // Height of the header
        justifyContent: 'flex-start',
        // shadowRadius: 2, // Optional shadow for iOS
        marginTop: 30,
        // backgroundColor: 'blue',
    },
    logo: {

        width: 230, // Width of the logo
        height: 120, // Height of the logo
        resizeMode: 'contain', // Ensures logo fits without distortion
    },
});

export default Header;
