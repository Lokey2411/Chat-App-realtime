import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
	const navigation = useNavigation();
	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<Feather
					name="search"
					size={24}
					color="black"
				/>
			),
			headerRight: () => (
				<TouchableOpacity onPress={() => console.log("ccc")}>
					<Image
						source={require("../assets/maradona.jpg")}
						style={{ width: 40, height: 40, marginRight: 10 }}
					/>
				</TouchableOpacity>
			),
		});
	}, [navigation]);
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate("Chat")}>
				<Entypo
					name="chat"
					size={50}
					color="black"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "orange",
		justifyContent: "center",
		alignItems: "center",
	},
});
