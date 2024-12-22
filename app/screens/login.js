import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    const handleLogin = async () => {
        setLoading(true);

        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.12:8080/api/auth', {
                email,
                password,
            });

            if (response.status === 200) {
                const { data } = response;
                const token = data.data;
                console.log('Login successful:', token);

                setSuccessMessageVisible(true);

                setTimeout(() => {
                    setSuccessMessageVisible(false);
                    navigation.replace('Home');
                }, 2000);
            }
        } catch (error) {
            Alert.alert('Login Failed', error.response ? error.response.data.message : 'An error occurred, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/bgggggg.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.log}>Welcome Back! Continue Your Journey.</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"

                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Log In'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupLink}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                </TouchableOpacity>

                {successMessageVisible && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successMessageText}>Logged in successfully!</Text>
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'contain',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    log: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#3ea1a0',
        backgroundColor: '#f8e6f0',
        color: '#3ea1a0',
    },
    button: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#3ea1a0',
        borderRadius: 30,
        alignItems: 'center',
        margin: 10,
        borderColor: '#fff',
        borderWidth: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupLink: {
        marginTop: 20,
        alignItems: 'left',
        justifyContent: 'center',
        width: '100%',
    },
    signupText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        flexWrap: 'wrap',
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

        alignItems: 'left'
    },
    successMessageText: {
        color: '#3ea1a0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        flexWrap: 'wrap',
    },
});

export default Login;
