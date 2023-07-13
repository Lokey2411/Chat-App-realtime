import { createStackNavigator } from "@react-navigation/stack";
import Chat from "./screens/Chat";
import { NavigationContainer } from "@react-navigation/native";
import LogIn from "./screens/LogIn";
import { StatusBar } from "expo-status-bar";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

const Stack = createStackNavigator();
export const AuthenticatorCheck = createContext({});

const AuthenticatorProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	return (
		<AuthenticatorCheck.Provider value={{ user, setUser }}>
			{children}
		</AuthenticatorCheck.Provider>
	);
};

const ChatStack = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen
				name="Home"
				component={Home}
			/>
			<Stack.Screen
				name="Chat"
				component={Chat}
			/>
		</Stack.Navigator>
	);
};

const AuthStack = () => {
	return (
		<Stack.Navigator
			initialRouteName="LogIn"
			screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="LogIn"
				component={LogIn}
			/>
			<Stack.Screen
				name="SignUp"
				component={SignUp}
			/>
		</Stack.Navigator>
	);
};

const RootNavigator = () => {
	const { user, setUser } = useContext(AuthenticatorCheck);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const unsubcribe = onAuthStateChanged(auth, async (authenticateUser) => {
			setUser(authenticateUser ? authenticateUser : null);
			setLoading(false);
		});
		return () => unsubcribe();
	}, [user]);
	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size={"large"} />
			</View>
		);
	}
	return (
		<NavigationContainer>
			<StatusBar style="light" />
			{user ? <ChatStack /> : <AuthStack />}
		</NavigationContainer>
	);
};
export default function App() {
	return (
		<AuthenticatorProvider>
			<RootNavigator />
		</AuthenticatorProvider>
	);
}
