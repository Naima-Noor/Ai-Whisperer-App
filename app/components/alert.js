// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

// const CustomAlert = ({ visible, onClose, message }) => {
//     return (
//         <Modal
//             transparent={true}
//             visible={visible}
//             animationType="fade"
//             onRequestClose={onClose}
//         >
//             <View style={styles.overlay}>
//                 <View style={styles.alertBox}>
//                     <Text style={styles.alertMessage}>{message}</Text>
//                     <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                         <Text style={styles.closeButtonText}>OK</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     alertBox: {
//         width: 400,
//         padding: 20,
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     alertMessage: {
//         fontSize: 16,
//         color: '#333',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     closeButton: {
//         backgroundColor: '#3ea1a0',
//         borderRadius: 5,
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//     },
//     closeButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default CustomAlert;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

const CustomAlert = ({ visible, onClose, message }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <ScrollView contentContainerStyle={styles.messageContainer}>
                        <Text style={styles.alertMessage}>{message}</Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
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
    alertBox: {
        width: 350,
        maxHeight: '70%', // Limit the height of the alert box
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    alertMessage: {
        fontSize: 16,
        color: '#333',

        flexWrap: 'wrap', // Enable text wrapping
    },
    closeButton: {
        backgroundColor: '#3ea1a0',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomAlert;
