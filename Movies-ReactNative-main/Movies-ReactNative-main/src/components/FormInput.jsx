import {
  View,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const FormInput = ({
  icon,
  placeholder,
  keyboardType,
  value,
  property,
  secureTextEntry = false,
  onChangeText,
  maxLength,
}) => {
  return (
    <View style={styles.formInput}>
      <Icon name={`${icon}`} size={25} color="#AAAAAA" style={styles.formIcon} />
      <TextInput
        id={property}
        style={styles.formTextInput}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(property, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  formIcon: {
    width: 25,
    height: 25,
  },
  formTextInput: {
    flex: 1,
    padding: 0,
    marginLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
  },
});

export default FormInput;
