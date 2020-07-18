import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions/deck_actions";
import { createDeck } from "../utils/api";
import {
    charcoal,
    persianGreen,
    white,
    orangeYellowCrayola,
} from "../utils/colors";

class NewDeck extends React.Component {
    state = {
        title: "",
    };

    changeText = (title) => {
        this.setState(() => ({ title }));
    };

    submitDeck = async () => {
        let newDeckEntry = {
            id: this.state.title.replace(/\s/g, ""),
            title: this.state.title,
            cards: [],
        };

        this.props.dispatch(addDeck(newDeckEntry));

        await createDeck(newDeckEntry);

        this.setState(() => ({ title: "" }));
        const deckId = newDeckEntry.id;
        this.props.navigation.navigate("DeckDetails", { deckId });
    };

    render() {
        return (
            <View style={{ padding: 20, marginTop: 20 }}>
                <Text style={styles.pageTitle}>
                    Enter the Deck Title / Name
                </Text>
                <TextInput
                    onChangeText={(value) => this.changeText(value)}
                    value={this.state.title}
                    style={[styles.textInput, { marginTop: 30 }]}
                />
                <TouchableOpacity
                    disabled={this.state.title.trim() === ""}
                    onPress={() => {
                        this.submitDeck();
                    }}
                    style={[
                        styles.submitBtn,
                        {
                            backgroundColor:
                                this.state.title.trim() === ""
                                    ? "#607D8B"
                                    : persianGreen,
                        },
                    ]}
                >
                    <Text style={styles.submitBtnText}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: charcoal,
        textAlign: "center",
    },
    textInput: {
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        margin: 20,
        borderColor: charcoal,
        borderRadius: 5,
        borderWidth: 1,
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
    submitBtnText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

function mapStateToProps(props) {
    return {
        decks: props,
    };
}

export default connect(mapStateToProps)(NewDeck);
