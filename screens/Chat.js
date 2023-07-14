import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
const colectionRef = collection(firestore, "chats");

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const navigation = useNavigation();
	const onSignOut = () => {
		signOut(auth).catch((error) => console.log(error));
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={onSignOut}>
					<MaterialIcons
						name="logout"
						size={24}
						color="black"
					/>
				</TouchableOpacity>
			),
		});
		const q = query(colectionRef, orderBy("createAt", "desc"));
		const unsubcribe = onSnapshot(q, (snapshot) => {
			setMessages(
				snapshot.docs.map((item) => {
					return {
						_id: item.id,
						createAt: item.data().createAt,
						text: item.data().text,
						user: item.data().user,
					};
				})
			);
			return unsubcribe;
		});
	}, [navigation, auth]);
	const onSend = useCallback(async (messages = []) => {
		try {
			setMessages((previousMessages) =>
				GiftedChat.append(previousMessages, messages)
			);
			// console.log(messages);

			const { _id, text, user } = messages[0];
			await addDoc(colectionRef, {
				_id,
				createAt: Date.now(),
				text,
				user,
			});
		} catch (error) {
			console.log(error);
		}
	});
	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: auth?.currentUser?.email,
				avatar: "https://placeimg.com/140/140/any",
			}}
			messagesContainerStyle={{
				backgroundColor: "#fff",
			}}
		/>
	);
};

export default Chat;

const styles = StyleSheet.create({});
