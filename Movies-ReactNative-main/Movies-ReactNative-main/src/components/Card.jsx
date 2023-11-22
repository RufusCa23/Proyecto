import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Card = (post) => {
  const navigation = useNavigation();
  const route = useRoute();
  //Get current route name
  const currentRoute = route.name;

  return (
    <TouchableOpacity
      style={{
        width:  currentRoute === "Dashboard" ? 300 : 380,
        height: 300,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      onPress={() => {
        navigation.navigate("PostDetail", {
          id: post.id,
        });
      }}
    >
      <Image
        style={{
          width: "100%",
          height: 200,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        source={{ uri: post.mainImageUrl }}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {post.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#777",
          }}
          numberOfLines={2}
        >
          {post.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
