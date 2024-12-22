import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
} from 'react-native';
import DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import axios from 'axios';
import Header from '../components/header';
import Navbar from '../components/Navbar';

const Textanalysis = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [buttonText, setButtonText] = useState('Analyze Text');


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
        <p>AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%</p>
        <p>Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%</p>
        <h2>Large Model Prediction</h2>
        <p>AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%</p>
        <p>Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%</p>
        <h2>Highlighted Text</h2>
        <p>${result.original_text.replace(/\n/g, '<br>')}</p>
      </body>
    </html>
    `;

        try {
            // Generate PDF
            const { uri } = await Print.printToFileAsync({ html: content });

            // Move PDF to a shared location
            const pdfUri = FileSystem.documentDirectory + 'analysis_result.pdf';
            await FileSystem.moveAsync({
                from: uri,
                to: pdfUri,
            });

            // Open or share the PDF file
            if (Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(pdfUri);
            } else {
                Alert.alert('Download Complete', `File saved successfully at:\n${pdfUri}`);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to generate or save PDF.');
        }
    };

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
    Content Authenticity Analysis Results:
    
    Words: ${result.num_words}
    Sentences: ${result.num_sentences}
    Paragraphs: ${result.num_paragraphs}
    
    Base Model Prediction:
    - AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%
    - Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%
    
    Large Model Prediction:
    - AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%
    - Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%
    
    Highlighted Text:
    ${result.original_text}
    `;

            await MailComposer.composeAsync({
                recipients: [], // Add default recipient email if needed
                subject: 'Content Analysis Results',
                body: content, // Directly include results in the email body
            });

            Alert.alert('Email Sent', 'Results emailed successfully.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send email.');
        }
    };


    const handleTextChange = (input) => {
        setText(input);
        setResult(null);
        setError('');
        setFile(null);
    };

    const handleFilePick = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.plainText, DocumentPicker.types.pdf],
            });
            setFile(res);
            setText('');
            setResult(null);
            setError('');
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                setError('Failed to pick the file. Please try again.');
            }
        }
    };

    const handleSubmit = async () => {
        if (!text.trim() && !file) {
            setError('Please enter text or select a file');
            return;
        }

        setButtonText('Processing...');
        const formData = new FormData();
        if (text.trim()) {
            formData.append('text', text);
        }

        try {
            const response = await axios.post('http://192.168.9.209:5000/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Error analyzing the content. Please try again.');
        } finally {
            setButtonText('Analyze Text');
        }
    };

    const calculatePercentages = (predictions) => {
        const totalSentences = predictions.length;
        const aiPredictions = predictions.filter((pred) => pred === 1).length;
        const humanPredictions = totalSentences - aiPredictions;

        return {
            aiPercentage: ((aiPredictions / totalSentences) * 100).toFixed(2),
            humanPercentage: ((humanPredictions / totalSentences) * 100).toFixed(2),
        };
    };

    const renderHighlightedText = (predictionsBase, predictionsLarge, originalText) => {
        if (!originalText || !predictionsBase || !predictionsLarge) {
            return <Text style={styles.errorText}>No text available for analysis.</Text>;
        }

        const sentences = originalText.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);

        return sentences.map((sentence, index) => {
            let backgroundColor = 'transparent';

            if (predictionsBase[index] === 1 && predictionsLarge[index] === 1) {
                backgroundColor = '#d4c6f1'; // Both models
            } else if (predictionsBase[index] === 1) {
                backgroundColor = '#f68b8b'; // Base model
            } else if (predictionsLarge[index] === 1) {
                backgroundColor = '#4fa8f9'; // Large model
            }

            return (
                <Text
                    key={index}
                    style={{
                        backgroundColor,
                        color: backgroundColor === 'transparent' ? '#000' : '#fff',
                        paddingHorizontal: 2,
                        borderRadius: 3,
                    }}
                >
                    {sentence + ' '}
                </Text>
            );
        });
    };

    return (
        <ImageBackground
            source={require('../assets/bgggggg.jpg')}
            style={styles.backgroundImage}
        >
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Content Authenticity Checker</Text>
                    <Text style={styles.para}>Welcome to the Content Authenticity Checker! This tool is designed to help you assess the authenticity and originality of any content you provide. Whether you're a writer, student, or professional, this tool ensures that your content is unique, free from plagiarism, and of high quality</Text>
                    <Text style={styles.header}>How to use:</Text>
                    <Text style={styles.use}>
                        <Text>1. Enter the text you want to check into the provided text box.{"\n"}</Text>
                        <Text>2. Click "Analyze Text" to instantly begin processing your content.{"\n"}</Text>
                        <Text>3. Review results including AI-generated text percentage, human-generated text percentage, and other text analysis.</Text>
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Enter text to analyze"
                        value={text}
                        onChangeText={handleTextChange}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}


                    {result && (
                        <View style={styles.resultContainer}>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                                    <Text style={styles.actionButtonText}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
                                    <Text style={styles.actionButtonText}>Email</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.resultHeader}>Analysis Result</Text>
                            <Text>Words: {result.num_words}</Text>
                            <Text>Sentences: {result.num_sentences}</Text>
                            <Text>Paragraphs: {result.num_paragraphs}</Text>
                            <Text style={styles.resultSubHeader}>Base Model Prediction:</Text>
                            <Text>AI generated: {calculatePercentages(result.predictions_base).aiPercentage}%</Text>
                            <Text>Human generated: {calculatePercentages(result.predictions_base).humanPercentage}%</Text>
                            <Text style={styles.resultSubHeader}>Large Model Prediction:</Text>
                            <Text>AI generated: {calculatePercentages(result.predictions_large).aiPercentage}%</Text>
                            <Text>Human generated: {calculatePercentages(result.predictions_large).humanPercentage}%</Text>
                            <Text style={styles.highlightedHeader}>Highlighted Text</Text>
                            <View style={styles.highlightedTextContainer}>
                                {renderHighlightedText(
                                    result.predictions_base,
                                    result.predictions_large,
                                    result.original_text
                                )}




                            </View>

                        </View>
                    )}
                </ScrollView>
                <Navbar />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    container: {
        flexGrow: 1,
        padding: 20,
        borderRadius: 10,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        minHeight: 60,
        maxHeight: 240,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
        opacity: 0.7
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
    para: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: '10',
        lineHeight: 24,
    },
    use: {
        color: 'black',
        fontSize: 14,
        textAlign: 'start',
        marginBottom: '10',
        lineHeight: 24,
    },
    errorText: {
        color: '#f00',
        textAlign: 'center',
        marginVertical: 10,
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultSubHeader: {
        marginTop: 10,
        fontWeight: 'bold',
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
        marginBottom: 90
    },
    highlightedText: {
        color: 'black',
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

export default Textanalysis;
eh highlighted wla header

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ImageBackground,
} from 'react-native';
import DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import axios from 'axios';
import Header from '../components/header';
import Navbar from '../components/Navbar';

const Textanalysis = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [buttonText, setButtonText] = useState('Analyze Text');

    const handleDownload = async () => {
        if (!result) {
            Alert.alert('No Result', 'Please analyze content before downloading.');
            return;
        }

        const highlightedHTML = generateHighlightedHTML(
            result.predictions_base,
            result.predictions_large,
            result.original_text
        );

        const content = `
        <html>
          <body>
            <h1>Content Authenticity Analysis Results</h1>
            <p><strong>Words:</strong> ${result.num_words}</p>
            <p><strong>Sentences:</strong> ${result.num_sentences}</p>
            <p><strong>Paragraphs:</strong> ${result.num_paragraphs}</p>
            <h2>Base Model Prediction</h2>
            <p>AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%</p>
            <p>Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%</p>
            <h2>Large Model Prediction</h2>
            <p>AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%</p>
            <p>Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%</p>
            <h2>Highlighted Text</h2>
            ${highlightedHTML}
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
            console.error(error);
            Alert.alert('Error', 'Failed to generate or save PDF.');
        }
    };

    const handleEmail = async () => {
        if (!result) {
            Alert.alert('No Result', 'Please analyze content before sending an email.');
            return;
        }

        const highlightedHTML = generateHighlightedHTML(
            result.predictions_base,
            result.predictions_large,
            result.original_text
        );

        const content = `
        Content Authenticity Analysis Results:
        
        Words: ${result.num_words}
        Sentences: ${result.num_sentences}
        Paragraphs: ${result.num_paragraphs}
        
        Base Model Prediction:
        - AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%
        - Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%
        
        Large Model Prediction:
        - AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%
        - Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%
        
        Highlighted Text:
        ${highlightedHTML}
        `;

        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'Email is not available on this device.');
                return;
            }

            await MailComposer.composeAsync({
                recipients: [],
                subject: 'Content Analysis Results',
                body: content,
                isHtml: true,
            });

            Alert.alert('Email Sent', 'Results emailed successfully.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send email.');
        }
    };

    const handleTextChange = (input) => {
        setText(input);
        setResult(null);
        setError('');
        setFile(null);
    };

    const handleFilePick = async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.plainText, DocumentPicker.types.pdf],
            });
            setFile(res);
            setText('');
            setResult(null);
            setError('');
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                setError('Failed to pick the file. Please try again.');
            }
        }
    };

    const handleSubmit = async () => {
        if (!text.trim() && !file) {
            setError('Please enter text or select a file');
            return;
        }

        setButtonText('Processing...');
        const formData = new FormData();
        if (text.trim()) {
            formData.append('text', text);
        }

        try {
            const response = await axios.post('http://192.168.9.209:5000/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResult(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Error analyzing the content. Please try again.');
        } finally {
            setButtonText('Analyze Text');
        }
    };

    const calculatePercentages = (predictions) => {
        const totalSentences = predictions.length;
        const aiPredictions = predictions.filter((pred) => pred === 1).length;
        const humanPredictions = totalSentences - aiPredictions;

        return {
            aiPercentage: ((aiPredictions / totalSentences) * 100).toFixed(2),
            humanPercentage: ((humanPredictions / totalSentences) * 100).toFixed(2),
        };
    };

    const generateHighlightedHTML = (predictionsBase, predictionsLarge, originalText) => {
        if (!originalText || !predictionsBase || !predictionsLarge) {
            return '<p>No text available for analysis.</p>';
        }

        const sentences = originalText.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);
        let html = '';

        sentences.forEach((sentence, index) => {
            let backgroundColor = 'transparent';

            if (predictionsBase[index] === 1 && predictionsLarge[index] === 1) {
                backgroundColor = '#d4c6f1';
            } else if (predictionsBase[index] === 1) {
                backgroundColor = '#f68b8b';
            } else if (predictionsLarge[index] === 1) {
                backgroundColor = '#4fa8f9';
            }

            html += `<span style="background-color: ${backgroundColor}; color: ${backgroundColor === 'transparent' ? '#000' : '#fff'
                }; padding: 2px; border-radius: 3px;">${sentence} </span>`;
        });

        return `<div>${html}</div>`;
    };

    return (
        <ImageBackground source={require('../assets/bgggggg.jpg')} style={styles.backgroundImage}>
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.header}>Content Authenticity Checker</Text>
                    <Text style={styles.para}>
                        Use this tool to analyze and validate the originality of your content.
                    </Text>

                    <TextInput
                        style={styles.textInput}
                        multiline
                        placeholder="Enter text to analyze"
                        value={text}
                        onChangeText={handleTextChange}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>{buttonText}</Text>
                    </TouchableOpacity>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {result && (
                        <View style={styles.resultContainer}>
                            <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                                <Text style={styles.actionButtonText}>Download</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
                                <Text style={styles.actionButtonText}>Email</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
                <Navbar />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: { flex: 1 },
    container: { flexGrow: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold' },
    textInput: { borderWidth: 1, padding: 10, marginBottom: 20 },
    submitButton: { backgroundColor: '#3bb19b', padding: 10 },
    submitButtonText: { color: '#fff' },
    errorText: { color: 'red' },
    resultContainer: { marginTop: 20 },
    downloadButton: { backgroundColor: '#3bb19b', padding: 10 },
    emailButton: { backgroundColor: '#4fa8f9', padding: 10 },
    actionButtonText: { color: '#fff' },
});

export default Textanalysis;
