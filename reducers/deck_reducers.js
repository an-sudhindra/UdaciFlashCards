import {
    GET_INITIAL_DECKS,
    ADD_DECK,
    ADD_CARD,
    DELETE_DECK,
} from "../actions/deck_actions";

export default function allDecks(state = {}, action) {
    switch (action.type) {
        case GET_INITIAL_DECKS:
            return {
                ...state,
                ...action.decks,
            };
        case ADD_DECK:
            const { deck } = action;
            return {
                ...state,
                [deck.id]: deck,
            };
        case ADD_CARD:
            const { deckId, card } = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    cards: [...state[deckId].cards, card],
                },
            };
        case DELETE_DECK:
            const newState = { ...state };
            delete newState[action.deckId];
            return newState;
        default:
            return state;
    }
}
