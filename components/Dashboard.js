import React from "react";
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { getInitialData } from "../actions/deck_actions";
import { getAllDecks } from "../utils/api";
import {
    charcoal,
    orangeYellowCrayola,
} from "../utils/colors";

class Dashboard extends React.Component {
    state = {
        decks: "",
    };

    componentDidMount() {
        getAllDecks().then((data) => {
            this.props.dispatch(getInitialData(data));
        });
    }

    showDeckDetails(deckId) {
        this.props.navigation.navigate("DeckDetails", { deckId });
    }

    render() {
        return (
            <ScrollView>
                <View style={{ alignItems: "center" }}>
                    {this.props.decks &&
                        Object.keys(this.props.decks).map((deckId) => (
                            <TouchableOpacity
                                key={deckId}
                                style={styles.deck}
                                onPress={() => {
                                    this.showDeckDetails(deckId);
                                }}
                            >
                                <View style={styles.row}>
                                    <Text style={styles.deckTextPrimary}>
                                        {this.props.decks[deckId].title}
                                    </Text>
                                    <Text style={styles.deckTextSecondary}>
                                        {this.props.decks[deckId].cards
                                            .length === 0
                                            ? " No cards"
                                            : this.props.decks[deckId].cards
                                                  .length + " Cards"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        borderRadius: 5,
        alignItems: "center",
        backgroundColor: orangeYellowCrayola,
        width: 300,
        width: "85%",
    },
    deckTextPrimary: {
        fontSize: 16,
        fontWeight: "bold",
        color: charcoal,
    },
    deckTextSecondary: {
        fontSize: 14,
        fontWeight: "normal",
        color: charcoal,
    },
    row: {
        flex: 1,
        padding: 15,
        alignSelf: "stretch",
        alignItems: "center",
        borderRadius: 2,
        borderColor: "#222222",
    },
});

function mapStateToProps(state, { navigation }) {
    return {
        decks: state,
    };
}

export default connect(mapStateToProps)(Dashboard);
