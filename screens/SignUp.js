import React, { useState } from "react";
import {
	Alert,
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const backImg = require("../assets/backImg.jpg");
const LogIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const onHandleSignup = () => {
		if (email !== "" && password !== "") {
			createUserWithEmailAndPassword(auth, email, password)
				.then(() => console.log("Signup success"))
				.catch((err) => Alert.alert("Log in error", err.message));
		}
	};
	return (
		<View style={styles.container}>
			<Image
				source={backImg}
				style={styles.backImage}
			/>
			<View style={styles.whiteSheet}></View>
			<SafeAreaView style={[styles.form]}>
				<Text style={styles.title}>Sign Up</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter email"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					autoCapitalize="none"
					autoCorrect={false}
					textContentType="password"
					secureTextEntry={true}
					value={password}
					onChangeText={setPassword}
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={onHandleSignup}>
					<Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
						Sign Up
					</Text>
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginVertical: 10,
					}}>
					<Text style={{ color: "gray", fontWeight: 900, marginRight: 4 }}>
						Already have account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
						<Text style={{ color: "orange", fontWeight: 700 }}>Log in</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#f57c00",
		height: 58,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	form: {
		marginHorizontal: 30,
		// flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		height: "100%",
	},
	whiteSheet: {
		width: "100%",
		height: "75%",
		position: "absolute",
		bottom: 0,
		backgroundColor: "#fff",
		borderTopLeftRadius: 60,
	},
	backImage: {
		width: "100%",
		height: 340,
		position: "absolute",
		top: 0,
		resizeMode: "cover",
	},
	input: {
		backgroundColor: "#f6f7f8",
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
		overflow: "hidden",
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: "orange",
		alignSelf: "center",
		paddingBottom: 24,
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default LogIn;
