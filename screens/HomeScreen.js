import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Clipboard, FlatList } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';
import supportedLanguages from '../utils/supportedLanguages';
import { speak } from 'expo-speech';
import { useDispatch, useSelector } from 'react-redux';
import { addTranslationToHistory } from '../redux/actions';

export default function HomeScreen(props) {
    const params = props.route.params || {};
    const dispatch = useDispatch();
    const translationHistory = useSelector(state => state.translationHistory);

    const [enteredText, setEnteredText] = useState("");
    const [resultText, setResultText] = useState("");
    const [languageTo, setLanguageTo] = useState("en-GB");
    const [languageFrom, setLanguageFrom] = useState("ru-RU");

    useEffect(() => {
        if (params.languageTo) {
            setLanguageTo(params.languageTo);
        }

        if (params.languageFrom) {
            setLanguageFrom(params.languageFrom);
        }
    }, [params.languageTo, params.languageFrom])

    const onSubmit = () => {
        if (!enteredText) {
            setResultText('');
            return;
        }

        translate();
    }

    const translate = () => {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${enteredText}&langpair=${languageFrom}|${languageTo}`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const translatedText = data.responseData.translatedText;
                setResultText(translatedText);
                dispatch(addTranslationToHistory({ text: enteredText, translation: translatedText }));
            });
    };

    const handleTextChange = (text) => {
        setEnteredText(text);
        if (!text) {
            setResultText('');
        }
    }

    const copyToClipboard = () => {
        Clipboard.setString(resultText);
    }

    const speakText = () => {
        if (resultText) {
            speak(resultText, { language: languageTo });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.languageContainer}>
                <TouchableOpacity
                    style={styles.languageOption}
                    onPress={() => props.navigation.navigate("languageSelect", { title: "Translate from", selected: languageFrom, mode: 'from' })}>
                    <Text style={styles.languageOptionText}>{supportedLanguages[languageFrom]}</Text>
                </TouchableOpacity>

                <View style={styles.arrowContainer}>
                    <AntDesign name="arrowright" size={24} color={colors.lightGrey} />
                </View>

                <TouchableOpacity
                    style={styles.languageOption}
                    onPress={() => props.navigation.navigate("languageSelect", { title: "Translate to", selected: languageTo, mode: 'to' })}>
                    <Text style={styles.languageOptionText}>{supportedLanguages[languageTo]}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder='Enter text'
                    style={styles.textInput}
                    onChangeText={handleTextChange}
                />

                <TouchableOpacity
                    disabled={enteredText === ""}
                    style={styles.iconContainer}
                    onPress={onSubmit}>
                    <Ionicons 
                        name="arrow-forward-circle-sharp"
                        size={24} 
                        color={enteredText !== "" ? colors.primary : colors.primaryDisabled} />
                </TouchableOpacity>
            </View>

            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{resultText}</Text>

                <TouchableOpacity
                    disabled={resultText === ""}
                    style={styles.iconContainer}
                    onPress={copyToClipboard}>
                    <MaterialIcons 
                        name="content-copy"
                        size={24} 
                        color={resultText !== "" ? colors.textColor : colors.textColorDisabled} />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={resultText === ""}
                    style={styles.iconContainer}
                    onPress={speakText}>
                    <MaterialIcons 
                        name="volume-up"
                        size={24} 
                        color={resultText !== "" ? colors.textColor : colors.textColorDisabled} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={translationHistory}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.historyItem}>
                        <Text style={styles.historyItemText}>{item.text}</Text>
                        <Text style={styles.historyItemText}>{item.translation}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.historyContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    languageContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1
    },
    languageOption: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15
    },
    arrowContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    languageOptionText: {
        color: colors.primary,
        fontFamily: 'regular',
        letterSpacing: 0.3
    },
    inputContainer: {
        flexDirection: 'row',
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1
    },
    textInput: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontFamily: 'regular',
        letterSpacing: 0.3,
        height: 90,
        color: colors.textColor
    },
    iconContainer: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultContainer: {
        borderBottomColor: colors.lightGrey,
        borderBottomWidth: 1,
        flexDirection: 'row',
        height: 90,
        paddingVertical: 15
    },
    resultText: {
        fontFamily: 'regular',
        letterSpacing: 0.3,
        color: colors.primary,
        flex: 1,
        marginHorizontal: 20
    },
    historyContainer: {
        backgroundColor: colors.greyBackground,
        flex: 1,
        padding: 10
    },
    historyItem: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    historyItemText: {
        color: 'white', 
    }
});
