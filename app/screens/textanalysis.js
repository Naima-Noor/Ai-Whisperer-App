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

    const calculatePercentages = (predictions) => {
        const totalSentences = predictions.length;
        const aiPredictions = predictions.filter((pred) => pred === 1).length;
        const humanPredictions = totalSentences - aiPredictions;

        return {
            aiPercentage: ((aiPredictions / totalSentences) * 100).toFixed(2),
            humanPercentage: ((humanPredictions / totalSentences) * 100).toFixed(2),
        };
    };

    const renderHighlightedText = (predictions_base, predictions_large, originalText) => {
        if (!originalText || !predictions_base || !predictions_large) {
            return <Text>No text available for analysis.</Text>;
        }

        const sentences = originalText.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);

        return sentences.map((sentence, index) => {
            let backgroundColor = 'transparent';
            let color = 'black';
            let fontSize = 16;
            if (predictions_base[index] === 1 && predictions_large[index] === 1) {
                backgroundColor = '#d4c6f1';
                color = 'black';
                fontSize = 16;
            } else if (predictions_base[index] === 1) {
                backgroundColor = '#f68b8b';
                color = 'black';
                fontSize = 16;
            } else if (predictions_large[index] === 1) {
                backgroundColor = '#4fa8f9';
                color = 'black';
                fontSize = 16;
            }

            return (
                <Text
                    key={index}
                    style={{
                        backgroundColor: backgroundColor,
                        color: color,
                        padding: backgroundColor !== 'transparent' ? 3 : 0,
                        borderRadius: 3,
                        fontSize: fontSize, // Apply the larger font size here
                    }}
                >
                    {sentence + ' '}
                </Text>
            );
        });
    };

    const generateHighlightedHTML = (predictionsBase, predictionsLarge, originalText) => {
        const sentences = originalText.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s/);
        return sentences
            .map((sentence, index) => {
                let backgroundColor = 'transparent';


                if (predictionsBase[index] === 1 && predictionsLarge[index] === 1) {
                    backgroundColor = '#d4c6f1'; // Both models
                } else if (predictionsBase[index] === 1) {
                    backgroundColor = '#f68b8b'; // Base model
                } else if (predictionsLarge[index] === 1) {
                    backgroundColor = '#4fa8f9'; // Large model
                }

                return `<span style="background-color: ${backgroundColor}; padding: 2px; border-radius: 3px;">${sentence}</span>`;
            })
            .join(' ');
    };

    const handleDownload = async () => {
        if (!result) {
            Alert.alert('No Result', 'Please analyze content before downloading.');
            return;
        }

        const highlightedText = generateHighlightedHTML(
            result.predictions_base,
            result.predictions_large,
            result.original_text
        );

        const content = `
        <html>
            <body>
            <div style="margin :20px">
                <h1>Content Authenticity Analysis Results</h1>
                             
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #4fa8f9; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Large Model Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #f68b8b; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Base Model Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #d4c6f1; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Both Models Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: white; border: 1px solid #ccc; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Both Models Predicted: Human Generated</span>
    </div>
 
    <br> <br>
                <p><strong>Number of Words:</strong> ${result.num_words}</p>
                <p><strong>Number of Sentences:</strong> ${result.num_sentences}</p>
                <p><strong>Number of Paragraphs:</strong> ${result.num_paragraphs}</p>
                <h2>Base Model Prediction</h2>
                <p>AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%</p>
                <p>Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%</p>
                <h2>Large Model Prediction</h2>
                <p>AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%</p>
                <p>Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%</p>
                <h2>Highlighted Text</h2>
                <div>${highlightedText}</div>
                </div>
            </body>
        </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html: content });
            const pdfUri = FileSystem.documentDirectory + 'analysis_result.pdf';
            await FileSystem.moveAsync({
                from: uri,
                to: pdfUri,
            });

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

        const highlightedText = generateHighlightedHTML(
            result.predictions_base,
            result.predictions_large,
            result.original_text
        );

        const content = `
            <html>
                <body>
                <div style="margin :20px">
                    <h1>Content Authenticity Analysis Results</h1>
                                 
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #4fa8f9; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Large Model Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #f68b8b; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Base Model Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 15px;">
        <div style="width: 20px; height: 20px; background-color: #d4c6f1; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Both Models Predicted: AI Generated</span>
    </div>
    <div style="display: flex; align-items: center;">
        <div style="width: 20px; height: 20px; background-color: white; border: 1px solid #ccc; border-radius: 50%; margin-right: 10px;"></div>
        <span style="font-size: 16px; color: #333;">Both Models Predicted: Human Generated</span>
    </div>
 
    <br> <br>
                    <p><strong>Number of Words:</strong> ${result.num_words}</p>
                    <p><strong>Number of Sentences:</strong> ${result.num_sentences}</p>
                    <p><strong>Number of Paragraphs:</strong> ${result.num_paragraphs}</p>
                    <h2>Base Model Prediction</h2>
                    <p>AI Generated: ${calculatePercentages(result.predictions_base).aiPercentage}%</p>
                    <p>Human Generated: ${calculatePercentages(result.predictions_base).humanPercentage}%</p>
                    <h2>Large Model Prediction</h2>
                    <p>AI Generated: ${calculatePercentages(result.predictions_large).aiPercentage}%</p>
                    <p>Human Generated: ${calculatePercentages(result.predictions_large).humanPercentage}%</p>
                    <h2 style={{fontSize: 16}}>Highlighted Text</h2>
                    <div>${highlightedText}</div>
                    </div>
                </body>
            </html>
        `;

        try {

            const { uri } = await Print.printToFileAsync({ html: content });
            const pdfUri = FileSystem.documentDirectory + 'analysis_result.pdf';
            await FileSystem.moveAsync({
                from: uri,
                to: pdfUri,
            });


            const isAvailable = await MailComposer.isAvailableAsync();
            if (!isAvailable) {
                Alert.alert('Error', 'Email is not available on this device.');
                return;
            }


            await MailComposer.composeAsync({
                recipients: [],
                subject: 'Content Analysis Results',
                body: 'Please find attached the PDF containing the content analysis results.',
                attachments: [pdfUri],
            });

            Alert.alert('Email Sent', 'PDF results emailed successfully.');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to generate or send the email.');
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
            const response = await axios.post('http://192.168.1.15:5000/analyze', formData, {
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
                            <View style={styles.containers}>
                                <View style={styles.item}>
                                    <View style={[styles.circle, { backgroundColor: '#4fa8f9' }]} />
                                    <Text style={styles.text}>Large Model Predicted: AI Generated</Text>
                                </View>
                                <View style={styles.item}>
                                    <View style={[styles.circle, { backgroundColor: '#f68b8b' }]} />
                                    <Text style={styles.text}>Base Model Predicted:AI Generated</Text>
                                </View>
                                <View style={styles.item}>
                                    <View style={[styles.circle, { backgroundColor: '#d4c6f1' }]} />
                                    <Text style={styles.text}>Both Models Predicted: AI Generated</Text>
                                </View>
                                <View style={styles.item}>
                                    <View style={[styles.circle, { backgroundColor: 'white', borderWidth: 1, borderColor: '#ccc' }]} />
                                    <Text style={styles.text}>Both Models Predicted: Human Generated</Text>
                                </View>
                            </View>
                            <Text>__________________________________________________________________</Text>

                            <Text></Text>
                            <Text style={{ fontSize: 16 }}>Number of Words: {result.num_words}</Text>
                            <Text style={{ fontSize: 16 }}>Number of Sentences: {result.num_sentences}</Text>
                            <Text style={{ fontSize: 16 }}>Number of Paragraphs: {result.num_paragraphs}</Text>
                            <Text ></Text>
                            <Text style={{ fontSize: 20, color: '#f68b8b' }}>Base Model Prediction:</Text>
                            <Text style={{ fontSize: 16 }}>AI generated: {calculatePercentages(result.predictions_base).aiPercentage}%</Text>
                            <Text style={{ fontSize: 16 }}>Human generated: {calculatePercentages(result.predictions_base).humanPercentage}%</Text>
                            <Text ></Text>
                            <Text style={{ fontSize: 20, color: '#4fa8f9' }}>Large Model Prediction:</Text>
                            <Text style={{ fontSize: 16 }}>AI generated: {calculatePercentages(result.predictions_large).aiPercentage}%</Text>
                            <Text style={{ fontSize: 16 }}>Human generated: {calculatePercentages(result.predictions_large).humanPercentage}%</Text>
                            <Text ></Text>
                            <Text style={{ fontSize: 20 }}>Highlighted Text</Text>
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
            </View >
        </ImageBackground >
    );
};

const styles = StyleSheet.create({
    containers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%', // Adjust the width for 2 columns
        marginBottom: 10,
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 5,
        marginRight: 5,
    },
    text: {
        fontSize: 15,
    },
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
        fontSize: 30,
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
        backgroundColor: 'white',
        textAlignVertical: 'top',
        fontSize: 16
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
        fontSize: 16,
        textAlign: 'center',
        marginBottom: '10',
        lineHeight: 24,
    },
    use: {
        color: 'black',
        fontSize: 16,
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
        backgroundColor: 'white',
        marginTop: 20,
        width: '100%',
        padding: 15,
        borderRadius: 8,
        elevation: 3,

    },
    resultHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    resultSubHeader: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 29,

    },
    resultHeader: {
        fontSize: 24,
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
        marginBottom: 90,

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