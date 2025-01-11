import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {

    return (
        <View style={styles.header}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 2,
        padding: 25,
        height: 70,
        justifyContent: 'flex-start',
        marginTop: 30,
    },
    logo: {
        width: 230,
        height: 120,
        resizeMode: 'contain',
    },
});

export default Header;
