import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import FormInput from "../components/FormInput";
import RoundedButton from "../components/RoundedButton";
import { useNavigation } from "@react-navigation/native";
import client from "../api/client";

export default function RegisterScreen() {
 const [values, setValues] = useState({
  firstName: "",
  lastName: "",
   email: "",
   password: "",
 });
 const navigation = useNavigation();

 const onChangeText = (key, value) => {
   setValues({
     ...values,
     [key]: value,
   });
 };

  const handleButton = async () => {
    try {
      const response = await client.post("/auth", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      if (response.data) {
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/wallpaper.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/video.png")}
        />
        <Text style={styles.logoText}>
          {"ITD Estudia \n para tus exámenes"}
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.formText}>Registrate</Text>
        <FormInput
          property="firstName"
          icon="person"
          placeholder="Nombre(s)"
          keyboardType="default"
          value={values.firstName}
          onChangeText={onChangeText}
        />
        <FormInput
          property="lastName"
          icon="person-outline"
          placeholder="Apellido(s)"
          keyboardType="default"
          value={values.lastName}
          onChangeText={onChangeText}
        />
        <FormInput
          property="email"
          icon="email"
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          value={values.email}
          onChangeText={onChangeText}
        />

        <FormInput
          property="password"
          icon="lock"
          placeholder="Contraseña"
          keyboardType="default"
          value={values.password}
          secureTextEntry
          onChangeText={onChangeText}
        />

        <View style={styles.formButtonContainer}>
          <RoundedButton text="Registrarse" onPress={() => handleButton()} />
        </View>

        <View style={styles.formRegister}>
          <Text>Ya tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.formRegisterText}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
    bottom: "30%",
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "15%",
  },
  logoImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  logoText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    height: "60%",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
  },
  formText: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  formButtonContainer: {
    marginTop: 30,
  },
  formRegister: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  formRegisterText: {
    fontStyle: "italic",
    color: "#D63310",
    borderBottomColor: "#D63310",
    borderBottomWidth: 1,
    fontWeight: "bold",
    marginLeft: 10,
  },
});