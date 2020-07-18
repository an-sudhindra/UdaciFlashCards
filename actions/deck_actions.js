export const GET_INITIAL_DECKS = "GET_INITIAL_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";

export function getInitialData(decks) {
    return {
        type: GET_INITIAL_DECKS,
        decks,
    };
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    };
}

export function addCard(deckId, card) {
    return {
        type: ADD_CARD,
        deckId,
        card,
    };
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId,
    };
}
