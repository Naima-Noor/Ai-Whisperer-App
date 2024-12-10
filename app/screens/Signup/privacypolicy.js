import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Privacypolicy = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Privacy Policy</Text>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.text}>Last updated: 20-June-2024</Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Introduction</Text>
                            {'\n'}
                            AI Whisperer is committed to protecting and respecting your privacy. This Privacy Policy
                            explains how we collect, use, disclose, and safeguard your information when you visit our
                            website, as well as your rights in relation to that information.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Information We Collect</Text>
                            {'\n'}
                            We may collect information about you in a variety of ways. The information we may collect on the
                            website includes:
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Personal Data:</Text> Personally identifiable information, such as your name,
                            shipping address, email address, and telephone number, and demographic information, such as
                            your age, gender, hometown, and interests, that you voluntarily give to us when you register
                            with the website or when you choose to participate in various activities related to the
                            website.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Derivative Data:</Text> Information our servers automatically collect when you access
                            the website, such as your IP address, your browser type, your operating system, your access
                            times, and the pages you have viewed directly before and after accessing the website.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Financial Data:</Text> Financial information, such as data related to your payment
                            method (e.g., valid credit card number, card brand, expiration date) that we may collect when
                            you purchase, order, return, exchange, or request information about our services from the
                            website.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Use of Your Information</Text>
                            {'\n'}
                            Having accurate information about you permits us to provide you with a smooth, efficient, and
                            customized experience. Specifically, we may use information collected about you via the website to:
                        </Text>
                        <Text style={styles.text}>• Administer sweepstakes, promotions, and contests.</Text>
                        <Text style={styles.text}>• Create and manage your account.</Text>
                        <Text style={styles.text}>• Email you regarding your account or order.</Text>
                        <Text style={styles.text}>• Fulfill and manage purchases, orders, payments, and other transactions related to the website.</Text>
                        <Text style={styles.text}>• Generate a personal profile about you to make future visits to the website more personalized.</Text>
                        <Text style={styles.text}>• Increase the efficiency and operation of the website.</Text>
                        <Text style={styles.text}>• Monitor and analyze usage and trends to improve your experience with the website.</Text>
                        <Text style={styles.text}>• Perform other business activities as needed.</Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Disclosure of Your Information</Text>
                            {'\n'}
                            We may share information we have collected about you in certain situations. Your information may be
                            disclosed as follows:
                        </Text>
                        <Text style={styles.text}>• By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</Text>
                        <Text style={styles.text}>• Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</Text>
                        <Text style={styles.text}>• Third-Party Service Providers: We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Security of Your Information</Text>
                            {'\n'}
                            We use administrative, technical, and physical security measures to help protect your personal
                            information. While we have taken reasonable steps to secure the personal information you provide to
                            us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and
                            no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Policy for Children</Text>
                            {'\n'}
                            We do not knowingly solicit information from or market to children under the age of 13. If we learn
                            that we have collected information from a child under age 13 without verification of parental consent,
                            we will delete that information as quickly as possible. If you become aware of any data we have
                            collected from children under age 13, please contact us at [Contact Information].
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Changes to This Privacy Policy</Text>
                            {'\n'}
                            We may update this Privacy Policy from time to time in order to reflect, for example, changes to our
                            practices or for other operational, legal, or regulatory reasons. We will notify you of any changes
                            by posting the new Privacy Policy on this page.
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.bold}>Contact Us</Text>
                            {'\n'}
                            If you have questions or comments about this Privacy Policy, please contact us at:
                            {'\n'} AI Whisperer {'\n'} Ai-whisperer@gmail.com {'\n'} 0311-1234567
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '85%',
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
    bold: {
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
});

export default Privacypolicy;
