import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/header';
import Navbar from '../components/Navbar';

export default function Home() {
    const [greeting, setGreeting] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [featuredText, setFeaturedText] = useState('');
    const images = [
        require('../assets/Problem.png'),
        require('../assets/Solution.png'),
        require('../assets/home.png'),
    ];
    const texts = [
        'Discover New Features!',
        'Explore Our Latest Updates ',
        'Boost Your Productivity Today!',
    ];

    const navigation = useNavigation();

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) {
            setGreeting('Good Morning');
        } else if (hours < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFeaturedText(texts[(currentImageIndex + 1) % texts.length]);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImageIndex]);


    const goToTextAnalysis = () => {
        navigation.navigate('TextAnalysis');
    };


    const goToFileAnalysis = () => {
        navigation.navigate('FileAnalysis');
    };

    return (
        <ImageBackground source={require('../assets/bgggggg.jpg')} style={styles.mainContainer}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>

                <Text style={styles.helloText}>Hello, User!</Text>
                <Text style={styles.greeting}>{greeting}</Text>


                <View style={styles.featuredSection}>
                    <ImageBackground
                        source={images[currentImageIndex]}
                        style={styles.featuredImage}
                    >
                        <View style={styles.featuredTextContainer}>
                            <Text style={styles.featuredText}>{featuredText}</Text>
                        </View>
                    </ImageBackground>
                </View>

                <Text style={styles.sectionTitle}>Supported File Types</Text>
                <Text style={{ lineHeight: 20 }}></Text>
                <View style={styles.iconRow}>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="file-pdf" size={45} color="#d9534f" />
                        <Text style={styles.iconText}>PDF</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="file-word" size={45} color="#0275d8" />
                        <Text style={styles.iconText}>DOC</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="file-alt" size={45} color="#5bc0de" />
                        <Text style={styles.iconText}>TXT</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <FontAwesome5 name="keyboard" size={45} color="blue" />
                        <Text style={styles.iconText}>Text</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Quick Links</Text>
                <View style={styles.quickLinkContainer}>
                    <TouchableOpacity style={styles.quickLink} onPress={goToTextAnalysis}>
                        <FontAwesome5 name="keyboard" size={25} color="white" />
                        <View style={styles.quickLinkText}>
                            <Text style={styles.quickLinkTextLine}>Text Analysis</Text>
                            <Text style={styles.quickLinkTextLine}>Enter text in field to analyze analyze.</Text>
                        </View>
                        <FontAwesome5 name="arrow-right" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickLink} onPress={goToFileAnalysis}>
                        <FontAwesome5 name="link" size={20} color="white" />
                        <View style={styles.quickLinkText}>
                            <Text style={styles.quickLinkTextLine}>File Analysis</Text>
                            <Text style={styles.quickLinkTextLine}>Upload the files to analyze them</Text>
                        </View>
                        <FontAwesome5 name="arrow-right" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Navbar />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },

    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingRight: 20,
        paddingLeft: 20,
    },
    helloText: {
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        color: 'white',
        paddingTop: 10,
        paddingBottom: 5
    },
    greeting: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'left',
        width: '100%',
        color: 'white',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#26363f'
    },
    featuredSection: {
        width: '100%',
        height: 250,
        marginBottom: 30,
        borderRadius: 10,
        overflow: 'hidden',
    },
    featuredImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    featuredTextContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        borderRadius: 5,
    },
    featuredText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 5,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 5,
        flex: 1,
        maxWidth: '25%',
        minWidth: '22%',
    },
    iconText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
        flexWrap: 'wrap',
        width: '100%',
        color: 'white',
    },
    quickLinkContainer: {
        width: '100%',
        marginBottom: 60,
    },
    quickLink: {
        backgroundColor: '#3ea1a0',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'left',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    quickLinkText: {
        flexDirection: 'column',
    },
    quickLinkTextLine: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5,
        flexWrap: 'wrap',
        textAlign: 'left',
    },

});
