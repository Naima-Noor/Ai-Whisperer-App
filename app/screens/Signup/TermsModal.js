import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TermsModal = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Terms and Conditions</Text>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Last updated: 20-June-2024 </Text>
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Acceptance of Terms</Text>
                            {'\n'}
                            By accessing or using the Website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you disagree with any part of the terms, you may not access the Website.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Use of the Website</Text>
                            {'\n'}
                            You agree to use the Website only for lawful purposes and in accordance with these Terms and Conditions. You agree not to use the Website:
                        </Text>
                        <Text style={styles.text}>
                            {'\n'}• In any way that violates any applicable federal, state, local, or international law or regulation.
                        </Text>
                        <Text style={styles.text}>
                            • To exploit, harm, or attempt to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.
                        </Text>
                        <Text style={styles.text}>
                            • To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Intellectual Property</Text>
                            {'\n'}
                            The Website and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Termination</Text>
                            {'\n'}
                            We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Limitation of Liability</Text>
                            {'\n'}
                            In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Website; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; and (iii) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Website by any third party.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Changes to These Terms</Text>
                            {'\n'}
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Website after those revisions become effective, you agree to be bound by the revised terms.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
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
        maxHeight: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeText: {
        fontSize: 30,
        color: '#333',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 18
    },
});

export default TermsModal;
