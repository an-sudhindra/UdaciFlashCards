import React from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import {
    charcoal,
    persianGreen,
    white,
    orangeYellowCrayola,
    powderBlue,
    imperialRed,
    persianBlue,
} from "../utils/colors";
import { deleteDeck } from "../actions/deck_actions";
import { removeDeck } from "../utils/api";

class DeckDetails extends React.Component {
    handleDeleteDeck = () => {
        const { deckId } = this.props;
        this.props.dispatch(deleteDeck(deckId));
        removeDeck(deckId).then(() => this.props.navigation.navigate("Home"));
    };

    handleStartQuiz = () => {
        const { deckId } = this.props;
        this.props.navigation.navigate("QuizTime", { deckId });
    };

    render() {
        const { deckId, decks } = this.props;

        const deckIds = Object.keys(decks);
        if (!deckIds.includes(deckId)) {
            return (
                <ScrollView>
                    <View style={styles.deckContainer}>
                        <Text style={styles.pageTitle}>Deck Deleted</Text>
                    </View>
                </ScrollView>
            );
        }

        const deck = decks[deckId];
        const cards = deck.cards;

        return (
            <ScrollView>
                <View style={styles.deckContainer}>
                    <View style={styles.deckContainerHead}>
                        <Text style={styles.pageTitle}>{deck.title}</Text>
                        <Text style={styles.deckTextSecondary}>
                            {cards.length === 0
                                ? " No cards in this deck."
                                : cards.length > 1
                                ? "Has " + cards.length + " Cards"
                                : "Has only one card"}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.cardList,
                            { justifyContent: "flex-start", paddingLeft: 5 },
                        ]}
                    >
                        {cards.map((card, index) => (
                            <View key={index} style={styles.questionContainer}>
                                <View
                                    style={[styles.badge, { marginRight: 10 }]}
                                >
                                    <Text
                                        style={{
                                            color: white,
                                            marginTop: 5,
                                            fontSize: 10,
                                            alignSelf: "center",
                                        }}
                                    >
                                        {index + 1}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        styles.deckTextSecondary,
                                        {
                                            justifyContent: "flex-start",
                                            marginTop: 3,
                                        },
                                    ]}
                                >
                                    {card.question}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.btn, styles.addCardBtn]}
                        onPress={() =>
                            this.props.navigation.navigate("AddCard", {
                                deckId,
                            })
                        }
                    >
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>
                    {cards.length > 0 && (
                        <TouchableOpacity
                            style={[styles.btn, styles.startQuizBtn]}
                            onPress={this.handleStartQuiz}
                        >
                            <Text style={styles.btnText}>Start Quiz</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View
                    style={[styles.buttonContainer, { alignItems: "stretch" }]}
                >
                    <TouchableOpacity
                        style={[styles.btn, styles.deleteDeckBtn]}
                        onPress={this.handleDeleteDeck}
                    >
                        <Text style={styles.btnText}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    deckContainerHead: {
        justifyContent: "center",
        alignItems: "center",
    },
    questionContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        marginTop: 5,
    },
    badge: {
        backgroundColor: charcoal,
        color: white,
        height: 22,
        width: 22,
        borderRadius: 50,
    },
    deckContainer: {
        flex: 1,
        backgroundColor: orangeYellowCrayola,
        borderRadius: 5,
        padding: 5,
        margin: 10,
        width: "85%",
        alignSelf: "center",
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: charcoal,
        textAlign: "center",
        justifyContent: "flex-start",
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
    addCardBtn: {
        backgroundColor: charcoal,
        width: "40%",
        alignSelf: "flex-start",
    },
    startQuizBtn: {
        backgroundColor: persianGreen,
        width: "40%",
        alignSelf: "flex-end",
    },
    deleteDeckBtn: {
        backgroundColor: imperialRed,
        width: "87%",
    },
    submitBtn: {
        backgroundColor: persianGreen,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
        width: 200,
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    deckTextSecondary: {
        fontSize: 14,
        fontWeight: "normal",
        color: charcoal,
    },
    buttonContainer: {
        flex: 1,
        padding: 5,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    cardList: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
});

function mapStateToProps(decks, { navigation, route }) {
    const { deckId } = route.params;
    return {
        deckId,
        decks,
        navigation,
    };
}

export default connect(mapStateToProps)(DeckDetails);
