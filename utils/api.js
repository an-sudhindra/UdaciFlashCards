import { AsyncStorage } from "react-native";

const STORAGE_KEY = "UdaciFlashCards:Decks";

const initialDecks = {
    Currencies: {
        title: "Currencies",
        cards: [
            {
                question: "What is currency of India?",
                answer: "Rupees",
            },
            {
                question: "What is currency of USA?",
                answer: "Dollars",
            },
            {
                question: "What is currency of Europe Union?",
                answer: "Euro",
            },
        ],
    },
    GameofThrones: {
        title: "Game of Thrones",
        cards: [
            {
                question: "Who killed Daenerys Targaryen?",
                answer: "John Snow Killed Dany",
            },
            {
                question: "Who played the role of Tyrion Lannister?",
                answer: "Peter Dinklage",
            },
        ],
    },
};

export async function getAllDecks() {
    let data = await AsyncStorage.getItem(STORAGE_KEY);
    return !data ? { ...initialDecks } : JSON.parse(data);
}

export async function createDeck(newDeckEntry) {
    await AsyncStorage.mergeItem(
        STORAGE_KEY,
        JSON.stringify({
            [newDeckEntry.id]: newDeckEntry,
        })
    );
    return;
}

export async function createNewCard(deckId, card) {
    await AsyncStorage.getItem(STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        data[deckId] = {
            ...data[deckId],
            cards: [...data[deckId].cards, card],
        };
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
    return;
}

export async function removeDeck(deckId) {
    await AsyncStorage.getItem(STORAGE_KEY).then((results) => {
        const data = JSON.parse(results);
        data[deckId] = undefined;
        delete data[deckId];
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    });
    return;
}
