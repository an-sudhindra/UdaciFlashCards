import React from "react";
import { connect } from "react-redux";
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
} from "react-native";
import {
    charcoal,
    persianGreen,
    white,
    orangeYellowCrayola,
    powderBlue,
    imperialRed,
    persianBlue,
} from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";
import { addCard } from "../actions/deck_actions";
import { createNewCard } from "../utils/api";

class NewCard extends React.Component {
    state = {
        question: "",
        answer: "",
        disabled: true,
    };

    changeQuestion = async (question) => {
        await this.setState(() => ({ question }));
        return this.validateInput()
            ? this.enableSubmit()
            : this.disableSubmit();
    };

    changeAnswer = async (answer) => {
        await this.setState(() => ({ answer }));
        return this.validateInput()
            ? this.enableSubmit()
            : this.disableSubmit();
    };

    validateInput() {
        return this.state.question.trim().length > 0 &&
            this.state.answer.trim().length > 0
            ? true
            : false;
    }

    enableSubmit = () => {
        this.setState({ disabled: false });
    };

    disableSubmit = () => {
        this.setState({ disabled: true });
    };

    submitCard = () => {
        const card = {
            question: this.state.question,
            answer: this.state.answer,
        };

        const { deckId } = this.props.route.params;
        this.props.dispatch(addCard(deckId, card));

        this.setState(() => ({
            question: "",
            answer: "",
            disabled: true,
        }));

        createNewCard(deckId, card);

        this.props.navigation.goBack();
    };

    render() {
        const { deckId, decks } = this.props;
        const deck = decks[deckId];

        return (
            <ScrollView>
                <View style={styles.cardContainer}>
                    <Text style={styles.pageTitle}>
                        Add Crad to {deck.title}
                    </Text>
                    <View style={styles.addCardContainer}>
                        <Text style={styles.textSecondary}>
                            Enter Question :
                        </Text>
                        <TextInput
                            onChangeText={(value) => this.changeQuestion(value)}
                            value={this.state.question}
                            style={[styles.textInput, { marginBottom: 10 }]}
                        />
                        <Text style={styles.textSecondary}>Enter Answer :</Text>
                        <TextInput
                            onChangeText={(value) => this.changeAnswer(value)}
                            value={this.state.answer}
                            style={styles.textInput}
                        />
                    </View>
                    <TouchableOpacity
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.submitCard();
                        }}
                        style={[
                            styles.btn,
                            styles.submitBtn,
                            {
                                marginTop: 20,
                                backgroundColor: this.state.disabled
                                    ? "#607D8B"
                                    : persianGreen,
                            },
                        ]}
                    >
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: orangeYellowCrayola,
        borderRadius: 5,
        padding: 5,
        margin: 10,
        alignSelf: "center",
        width: "85%",
    },
    addCardContainer: {
        flex: 1,
        marginTop: 10,
        padding: 5,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: charcoal,
        textAlign: "center",
        justifyContent: "flex-start",
    },
    textInput: {
        alignSelf: "stretch",
        height: 40,
        borderColor: charcoal,
        borderRadius: 5,
        borderWidth: 1,
    },
    btn: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
        borderRadius: 5,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
    },
    submitBtn: {
        backgroundColor: persianGreen,
        alignSelf: "stretch",
    },
    btnText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    textSecondary: {
        fontSize: 14,
        fontWeight: "normal",
        color: charcoal,
    },
});

function mapStateToProps(state, { navigation, route }) {
    const { deckId } = route.params;
    return {
        deckId,
        decks: state,
    };
}
export default connect(mapStateToProps)(NewCard);
