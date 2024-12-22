
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ImageBackground,
} from "react-native";
import axios from "axios";
import TermsModal from './TermsModal';
import PrivacyPolicyModal from './privacypolicy';

const Signup = ({ navigation }) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [termsModalVisible, setTermsModalVisible] = useState(false);
    const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(false);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate fields
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First Name is required!";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last Name is required!";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required!";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format!";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required!";
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required!";
        }

        // Check if passwords match
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match!";
        }

        // Check if terms are accepted
        if (!isChecked) {
            newErrors.terms = "Please accept terms and conditions.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        const isValid = validateForm();
        if (!isValid) return;

        setLoading(true);
        try {
            const response = await axios.post("http://192.168.1.12:8080/api/users", formData);
            if (response.status === 201) {

                setSuccessMessageVisible(true);


                setTimeout(() => {
                    setSuccessMessageVisible(false);
                    navigation.replace('Login');
                }, 2000);
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.message);
            } else {
                Alert.alert("Error", "Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/bgggggg.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.log}>Get Started! Enjoy All the Features.</Text>
                <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    placeholder="First Name"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange("firstName", value)}
                />
                {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange("lastName", value)}
                />
                {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    keyboardType="email-address"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(value) => handleInputChange("password", value)}
                    secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => handleInputChange("confirmPassword", value)}
                    secureTextEntry
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleCheckboxChange}>
                        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]} />
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>
                        I accept the <Text style={styles.link} onPress={() => setTermsModalVisible(true)}>terms and conditions</Text> and <Text style={styles.link} onPress={() => setPrivacyPolicyModalVisible(true)}>privacy policy</Text>.
                    </Text>
                </View>
                {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.signupText}>Already have an account? Login</Text>
                </TouchableOpacity>

                {successMessageVisible && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successMessageText}>User Created Successfully!</Text>
                    </View>
                )}
            </View>

            {/* Terms and Conditions Modal */}
            <TermsModal
                visible={termsModalVisible}
                onClose={() => setTermsModalVisible(false)}
            />

            {/* Privacy Policy Modal */}
            <PrivacyPolicyModal
                visible={privacyPolicyModalVisible}
                onClose={() => setPrivacyPolicyModalVisible(false)}
            />
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#3ea1a0",
        backgroundColor: "#fff",
        color: "#3ea1a0",
    },
    inputError: {
        borderColor: "#f44336",
    },
    errorText: {
        color: "#f44336",
        fontSize: 12,
        marginBottom: 10,
        width: "100%",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#3ea1a0',
        backgroundColor: 'white',
        marginRight: 10,
        borderRadius: 4,
    },
    checkboxChecked: {
        backgroundColor: '#34717f',
        borderColor: 'white',
    },
    checkboxText: {
        color: 'white',
        fontSize: 14,
        flexWrap: "wrap",
        width: "80%",
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    button: {
        width: "100%",
        padding: 15,
        marginTop: 10,
        backgroundColor: "#3ea1a0",
        borderRadius: 30,
        alignItems: "center",
        borderColor: "#fff",
        borderWidth: 2,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    signupLink: {
        marginTop: 20,
        width: '100%',
    },
    signupText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContent: {
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        lineHeight: 24,
        color: 'black',
    },
    closeButton: {
        backgroundColor: '#3ea1a0',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
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
    },
    successMessageText: {
        color: '#3ea1a0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    log: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 40,
    },
});

export default Signup;
