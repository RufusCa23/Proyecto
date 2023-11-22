import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const RoundedButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.roundedButton}>
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundedButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#D63310",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RoundedButton;
