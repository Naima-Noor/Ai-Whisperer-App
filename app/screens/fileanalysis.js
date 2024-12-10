import React, { useState } from 'react';
import { View, Button, Alert, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import Header from '../components/header';
import Navbar from '../components/Navbar';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';


export default function FileAnalysis() {
    const [fileInfo, setFileInfo] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState('Analyze Text');
    const [highlightedText, setHighlightedText] = useState('');

    const handleEmail = async () => {
        if (!result) {
            Alert.alert('No Result', 'Please analyze content before sending an email.');
            return;
        }

        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'Email is not available on this device.');
                return;
            }

            const content = `
    Content Authenticity Analysis Results
    
    Words: ${result.num_words}
    Sentences: ${result.num_sentences}
    Paragraphs: ${result.num_paragraphs}
    
    Base Model Prediction:
    AI Generated: ${calculatePercentage(result.predictions_base)}%
    Human Generated: ${calculatePercentage(result.predictions_large)}%
    
    Large Model Prediction:
    AI Generated: ${calculatePercentage(result.predictions_large)}%
    Human Generated: ${(100 - calculatePercentage(result.predictions_large)).toFixed(2)}%
    
    Highlighted Text:
    ${result.original_text}
    
    `;

            await MailComposer.composeAsync({
                recipients: [],
                subject: 'Content Analysis Results',
                body: content,
            });

            Alert.alert('Email Sent', 'Results emailed successfully.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send email.');
        }
    };


    const handleDownload = async () => {
        if (!result) {
            Alert.alert('No Result', 'Please analyze content before downloading.');
            return;
        }

        const content = `
    <html>
      <body>
        <h1>Content Authenticity Analysis Results</h1>
        <p><strong>Words:</strong> ${result.num_words}</p>
        <p><strong>Sentences:</strong> ${result.num_sentences}</p>
        <p><strong>Paragraphs:</strong> ${result.num_paragraphs}</p>
        <h2>Base Model Prediction</h2>
        <p>AI Generated: ${calculatePercentage(result.predictions_base)}%</p>
        <p>Human Generated: ${calculatePercentage(result.predictions_large)}%</p>
        <h2>Large Model Prediction</h2>
        <p>AI Generated: ${calculatePercentage(result.predictions_large)}%</p>
        <p>Human Generated: ${100 - calculatePercentage(result.predictions_large)}%</p>
        <h2>Highlighted Text</h2>
        <p>${result.original_text.replace(/\n/g, '<br>')}</p>
      </body>
    </html>
    `;

        try {
            const { uri } = await Print.printToFileAsync({ html: content });
            const pdfUri = FileSystem.documentDirectory + 'analysis_result.pdf';
            await FileSystem.moveAsync({ from: uri, to: pdfUri });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri);
            } else {
                Alert.alert('Download Complete', `File saved successfully at:\n${pdfUri}`);
            }
        } catch (error) {
            console.error('Error generating or sharing PDF:', error);
            Alert.alert('Error', 'Failed to generate or share PDF.');
        }
    };

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
            });

            console.log("DocumentPicker result:", result);

            if (result.canceled) {
                setFileInfo(null);
                setError(null);
            } else {
                const validFormats = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                ];

                const pickedFile = result.assets[0];

                if (validFormats.includes(pickedFile.mimeType)) {
                    setFileInfo(pickedFile);
                    setError(null);
                } else {
                    setError("Unsupported file format. Only PDF, DOC, DOCX, and TXT files are allowed.");
                    setFileInfo(null);
                }
            }
        } catch (err) {
            console.error("Error while picking document:", err);
            setError("An error occurred while selecting the document.");
            setFileInfo(null);
        }
    };

    const handleSubmit = async () => {
        if (!fileInfo) {
            setError('Please select a file');
            setResult(null);
            return;
        }
        setButtonText('Processing...');

        const formData = new FormData();
        if (fileInfo) {
            formData.append('file', {
                uri: fileInfo.uri,
                name: fileInfo.name,
                type: fileInfo.mimeType,
            });
        }

        try {
            const response = await axios.post('http://192.168.1.18:5000/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResult(response.data);
            setHighlightedText(renderHighlightedText(response.data.predictions_base, response.data.predictions_large, response.data.original_text));
            setError('');
            setButtonText('Analyze Text');
        } catch (error) {
            console.error('Error analyzing text:', error);
            setError('Error analyzing the text. Please try again.');
            setResult(null);
            setButtonText('Analyze Text');
        }
    };

    const renderHighlightedText = (predictions_base, predictions_large, originalText) => {
        if (!originalText || !predictions_base || !predictions_large) {
            return <Text>No text available for analysis.</Text>;
        }

        const sentences = originalText.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);

        return sentences.map((sentence, index) => {
            let backgroundColor = 'transparent';
            let color = '#333';

            if (predictions_base[index] === 1 && predictions_large[index] === 1) {
                backgroundColor = '#d4c6f1';
                color = '#333';
            } else if (predictions_base[index] === 1) {
                backgroundColor = '#f68b8b';
                color = '#721c24';
            } else if (predictions_large[index] === 1) {
                backgroundColor = '#4fa8f9';
                color = '#0c5460';
            }

            return (
                <Text
                    key={index}
                    style={{
                        backgroundColor: backgroundColor,
                        color: color,
                        padding: backgroundColor !== 'transparent' ? 3 : 0,
                        borderRadius: 3,
                    }}
                >
                    {sentence + ' '}
                </Text>
            );
        });
    };

    const calculatePercentage = (predictions) => {
        const total = predictions.length;
        const aiPredictions = predictions.filter(prediction => prediction === 1).length;
        return ((aiPredictions / total) * 100).toFixed(2);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <ImageBackground
                source={require('../assets/bgggggg.jpg')}
                style={styles.backgroundImage}
            >

                <Header />
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={styles.header}>Content Authenticity Checker</Text>
                    <Text style={styles.para}>Welcome to the Content Authenticity Checker! This tool is designed to help you assess the authenticity and originality of any content you provide. Whether you're a writer, student, or professional, this tool ensures that your content is unique, free from plagiarism, and of high quality</Text>
                    <Text style={styles.header}>How to use:</Text>
                    <Text style={styles.use}>
                        <Text>1. Upload your file from media to begin the text analysis.{"\n"}</Text>
                        <Text>2. Click "Analyze Text" to instantly begin processing your content.{"\n"}</Text>
                        <Text>3. Review results including AI-generated text percentage, human-generated text percentage, and other text analysis.</Text>
                    </Text>

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
                            <Text style={styles.iconText}>TXTT</Text>
                        </View>
                    </View>
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity onPress={pickDocument} style={styles.uploadButton}>
                            <Text style={styles.submitButtonText}>Upload Document</Text>
                        </TouchableOpacity>
                    </View>

                    {fileInfo && (
                        <View style={styles.fileInfoContainer}>
                            <Text style={styles.fileText}>File Name: {fileInfo.name}</Text>
                            <Text style={styles.fileText}>File Type: {fileInfo.mimeType}</Text>
                        </View>
                    )}

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>{buttonText}</Text>
                    </TouchableOpacity>


                    {result && (
                        <View style={styles.resultContainer}>
                            {result && (
                                <View>

                                    <View style={styles.actionButtons}>
                                        <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                                            <Text style={styles.actionButtonText}>Download</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
                                            <Text style={styles.actionButtonText}>Email</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            <Text style={styles.resultHeader}>Analysis Result</Text>

                            <Text>Words: {result.num_words}</Text>
                            <Text>Sentences: {result.num_sentences}</Text>
                            <Text>Paragraphs: {result.num_paragraphs}</Text>

                            {/* Displaying AI/Human predictions for both models */}
                            <Text style={styles.resultSubHeader}>Base Model Prediction:</Text>
                            <Text>AI generated: {calculatePercentage(result.predictions_base)}%</Text>
                            <Text>Human generated:  {(100 - calculatePercentage(result.predictions_large)).toFixed(2)}%</Text>

                            <Text style={styles.resultSubHeader}>Large Model Prediction:</Text>
                            <Text>AI generated: {calculatePercentage(result.predictions_large)}%</Text>
                            <Text>Human generated: {(100 - calculatePercentage(result.predictions_large)).toFixed(2)}%</Text>

                            <Text style={styles.highlightedHeader}>Highlighted Text</Text>
                            {highlightedText && <View style={styles.highlightedTextContainer}>{highlightedText}</View>}

                        </View>

                    )}
                </ScrollView>
            </ImageBackground>

            <Navbar />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        resizeMode: 'cover',

    },
    scrollViewContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,

        padding: 20,
        paddingBottom: 90,
    },
    pickerContainer: {
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    fileInfoContainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    fileText: {
        fontSize: 16,
        color: '#333',
    },
    errorContainer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#3bb19b',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
        width: '50%',
        alignSelf: 'center',
    },
    submitButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    uploadButton: {
        backgroundColor: '#3bb19b',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
        width: '50%',
        alignSelf: 'center',
    },
    resultContainer: {
        marginTop: 20,
        width: '100%',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        opacity: 0.8,
    },
    resultHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultSubHeader: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    highlightedHeader: {
        marginTop: 15,
        fontWeight: 'bold',
    },
    highlightedTextContainer: {
        marginTop: 10,
    },
    highlightedText: {
        color: 'black',
    },
    para: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: '10',
        lineHeight: 24,
        paddingLeft: 20,
    },
    use: {
        color: 'black',
        fontSize: 14,
        textAlign: 'start',
        marginBottom: '10',
        lineHeight: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    iconRow: {
        flexDirection: 'row',
        // flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 5,

    },
    iconContainer: {
        alignItems: 'center',
    },
    iconText: {
        marginTop: 10,
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    downloadButton: {
        backgroundColor: '#3bb19b',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    emailButton: {
        backgroundColor: '#4fa8f9',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
    },
    actionButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});
