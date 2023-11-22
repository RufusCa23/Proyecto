import {
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import client from "../api/client";
import Card from "../components/Card";
import { useAuthStore } from "../store/Auth.store";

const DashboardScreen = () => {
  const [programming, setProgramming] = useState([]);
  const [math, setMath] = useState([]);
  const [english, setEnglish] = useState([]);
  const navigation = useNavigation();
  const { user, clearUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await client.get("/post?category=programming");
      const responseMath = await client.get("/post?category=math");
      const responseEnglish = await client.get("/post?category=english");
      setProgramming(response.data);
      setMath(responseMath.data);
      setEnglish(responseEnglish.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          top: 20,
          right: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            fetchPosts();
          }}
          style={{
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <SimpleLineIcons name="refresh" size={22} color="#D63310" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            clearUser();
            navigation.navigate("Login");
          }}
          style={{
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            marginLeft: 8,
          }}
        >
          <AntIcon name="logout" size={20} color="#D63310" />
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          paddingTop: 15,
          alignSelf: "flex-start",
        }}
      >
        {`Bienvenido, ${user.firstName}`}
      </Text>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 100,
          }}
        >
          <ActivityIndicator size="large" color="#D63310" />
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 16,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Estudia Programación
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Category", {
                  category: "programming",
                });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#D63310",
                }}
              >
                Ver más
              </Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {programming.map((value) => (
              <Card key={value.id} {...value} />
            ))}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 16,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Estudia Matemáticas
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Category", {
                  category: "math",
                });
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#D63310",
                }}
              >
                Ver más
              </Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {math.map((value) => (
              <Card key={value.id} {...value} />
            ))}
          </ScrollView>

          {english.length > 0 && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 16,
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Estudia Inglés
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate("Category", {
                      category: "english",
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#D63310",
                    }}
                  >
                    Ver más
                  </Text>
                </Pressable>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {english.map((value) => (
                  <Card key={value.id} {...value} />
                ))}
              </ScrollView>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default DashboardScreen;
