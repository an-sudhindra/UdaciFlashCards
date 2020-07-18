import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/deck_reducers";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Constants from "expo-constants";
import { charcoal, persianGreen } from "./utils/colors";
import Dashboard from "./components/Dashboard";
import NewDeck from "./components/NewDeck";
import DeckDetails from "./components/DeckDetails";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import { setLocalNotification } from "./utils/helpers";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function UdacitySatatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                transculant
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}

function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Dashboard" component={Dashboard} />
            <Tab.Screen name="Add Deck" component={NewDeck} />
        </Tab.Navigator>
    );
}

export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1 }}>
                    <UdacitySatatusBar
                        backgroundColor={charcoal}
                        barStyle="light-content"
                    />
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Home"
                                component={Home}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="DeckDetails"
                                component={DeckDetails}
                                options={{
                                    headerTitle: "Details",
                                    headerStyle: { height: 45 },
                                    headerTitleAlign: "center",
                                }}
                            />
                            <Stack.Screen
                                name="AddCard"
                                component={NewCard}
                                options={{
                                    headerTitle: "Add Card",
                                    headerStyle: { height: 45 },
                                    headerTitleAlign: "center",
                                }}
                            />
                            <Stack.Screen
                                name="QuizTime"
                                component={Quiz}
                                options={{
                                    headerTitle: "Quiz Time",
                                    headerStyle: { height: 45 },
                                    headerTitleAlign: "center",
                                }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </View>
            </Provider>
        );
    }
}
