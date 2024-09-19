import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Constants from "expo-constants";

import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getCurrentUser } from "../services/userService";
import { supabase } from "../supabaseClient";

const EmailScreen = () => {
  const [email, setEmail] = useState("");
  const [fontSize, setFontSize] = useState(36); // Default font size
  const [error, setError] = useState("");

  useEffect(() => {
    // Adjust font size based on the length of the text
    const calculateFontSize = () => {
      const maxLength = 20; // Maximum length for which the font size is large
      const minSize = 16; // Minimum font size
      const sizeReductionFactor = 0.5; // Amount to reduce font size for each character above the max length
      const length = email.length;

      if (length > maxLength) {
        setFontSize(
          Math.max(minSize, 20 - (length - maxLength) * sizeReductionFactor)
        );
      } else {
        setFontSize(36); // Reset to default size if length is within limit
      }
    };

    calculateFontSize();
  }, [email]);

  const setEmailInDB = async () => {
    const user = await getCurrentUser();

    const { data, error }: any = await supabase
      .from("profiles")
      .upsert({ user_id: user.uid, phonenumber: user.phone, email: email })
      .select();
  };

  const handleNext = async () => {
    const regex = /\S+@\S+\.\S+/;
    if (!email) {
      setError("Please enter your email.");
      return;
    } else if (!regex.test(email)) {
      setError("Please enter a valid email.");
      return;
    } else {
      setError("");
    }

    await setEmailInDB();
    router.push("/UsernameScreen");
  };
  const handleExit = () => {
    router.push("/"); //go to introscreen.
  };
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={handleExit}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View
          style={{
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={require("../assets/images/postcard.png")}
            style={styles.image}
          />
          <Text style={styles.text}>What's your email?</Text>
        </View>
        <TextInput
          style={[styles.input, { fontSize, marginBottom: error ? 30 : 60 }]} // Apply dynamic font size
          placeholder=""
          value={email}
          onChangeText={(text) => {
            // email validation
            const regex = /\S+@\S+\.\S+/;

            if (!text) {
              setError("Please enter your email.");
            } else if (!regex.test(text)) {
              setError("Please enter a valid email.");
            } else {
              setError("");
            }

            setEmail(text);
          }}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.textSmaller}>How can we reach you</Text>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: Constants.statusBarHeight + 120,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "poppins",
    color: "#3F407C",
  },
  textsmaller: {
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "poppins",
    textAlign: "center",
    color: "#3B429F",
    marginBottom: 16,
    zIndex: 1, // Ensure the text is above the image
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1, // Ensure the button is above the image
  },
  input: {
    width: "74%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "black",
    marginBottom: 60,
    fontSize: 30, // Increased font size for larger text
    textAlign: "center", // Center text within the input
  },
  button: {
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    alignItems: "center",
    top: 16,
    zIndex: 1, // Ensure the button is above the image
  },
  buttonText: {
    color: "#3D4353",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 1, // Ensure the button is above the image
  },
  image: {
    width: 40, // Adjust width as needed
    height: 40, // Adjust height as needed
  },

  error: {
    color: "#DF5A76",
    fontFamily: "poppins",
    fontSize: 11,
    fontWeight: "400",
    marginBottom: 30,
  },

  textSmaller: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "poppins",
    textAlign: "center",
    color: "#3B429F",
    marginBottom: 16,
    zIndex: 1,
  },
});

export default EmailScreen;
