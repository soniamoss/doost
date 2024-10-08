import { Colors } from "@/constants/Colors";
import { scaleWidth } from "@/constants/layout";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface DoostButtonProps {
  onPress: () => void;
}

// TODO: I recommend doing restyle instead =>https://shopify.github.io/restyle/
const DoostButton = ({ onPress }: DoostButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Create Account/Sign In</Text>
    </TouchableOpacity>
  );
};

export { DoostButton };

const styles = StyleSheet.create({
  button: {
    paddingVertical: scaleWidth(15),
    paddingHorizontal: scaleWidth(30),
    backgroundColor: Colors.light.subtext,
    borderRadius: scaleWidth(30),
    padding: scaleWidth(15),
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins",
  },
});
