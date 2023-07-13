// Import the functions you need from the SDKs you need
// import { firebase } from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
	apiKey: "AIzaSyCkJKKqjeJxNZSZUAwpZ2gzA0WXj3i1yx8",
	authDomain: "chat-app-realtime-ac46d.firebaseapp.com",
	projectId: "chat-app-realtime-ac46d",
	storageBucket: "chat-app-realtime-ac46d.appspot.com",
	messagingSenderId: "200043487405",
	appId: "1:200043487405:web:718cca6515b61062716624",
	measurementId: "G-2BB5W2SQ8E",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export default firebaseApp;
