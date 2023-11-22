import { View, StatusBar, Platform, FlatList, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import client from "../api/client";
import Card from "../components/Card";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

const CategoryScreen = () => {
  const route = useRoute();
  const { category } = route.params;
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);

  const fetchPosts = async () => {
    try {
      const response = await client.get(`/post?category=${category}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          top: 10,
          left: 20,
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: "#D63310",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <IconMaterial name="arrow-back" size={25} color="#fff" />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          paddingTop: 15,
          alignSelf: "center",

        }}
      >
        {`Categoría: ${category}`}
      </Text>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </View>
  );
};

export default CategoryScreen;
