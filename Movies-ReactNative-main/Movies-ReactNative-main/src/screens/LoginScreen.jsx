import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import client from "../api/client";
import RoundedButton from "../components/RoundedButton";
import FormInput from "../components/FormInput";
import { useAuthStore } from "../store/Auth.store";

export default function LoginScreen() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const { user, setUser, setToken, setAuth } = useAuthStore();

  useEffect(() => {
    if (user !== null) {
      navigation.navigate("Dashboard");
    }
  }, [user]);

  const onChangeText = (key, value) => {
    setValues({
      ...values,
      [key]: value,
    });
  };

  const handleButton = async () => {
    try {
      const response = await client.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      if (response.data) {
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.token);
        setAuth(true);
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
        <Text style={styles.formText}>INGRESAR</Text>
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
          <RoundedButton text="Iniciar Sesión" onPress={() => handleButton()} />
        </View>

        <View style={styles.formRegister}>
          <Text>No tienes cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.formRegisterText}>Regístrate</Text>
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
    height: "45%",
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
