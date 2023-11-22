import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Button,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,  
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useRoute } from "@react-navigation/native";
import client from "../api/client";
import Icon from "react-native-vector-icons/FontAwesome";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";

const PostDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [post, setPost] = useState({});
  const scrollViewRef = useRef();
  const [activeSections, setActiveSections] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.get(`/post/${id}`);
        const responseQuestions = await client.get(
          `/question/post/${response.data.id}`
        );
        setPost(response.data);
        setSections([
          ...responseQuestions.data.map((question) => ({
            title: question.question,
            content: question.answer,
          })),
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const [playing, setPlaying] = useState(false);

  const updateSections = (activeSections) => {
    setActiveSections(activeSections.includes(undefined) ? [] : activeSections);
  };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);


 const renderSectionTitle = (section) => {
   return (
     <View style={
      {
        padding: 10,
      }
     } />
    
   );
 };

 const renderHeader = (section) => {
   return (
     <View
       style={{
         backgroundColor: "#f5f5f5",
         marginTop: 10,
         flexDirection: "row",
         justifyContent: "space-between",
         alignItems: "center",
         marginBottom: 2,
       }}
     >
       <Text
         style={{
           fontSize: 16,
           fontWeight: "bold",
         }}
       >
         {section.title}
       </Text>
       <Text
         style={{
           fontSize: 16,
           fontWeight: "bold",
           color: "#D63310",
         }}
       >
         +
       </Text>
     </View>
   );
 };

 const renderContent = (section) => {
   return (
     <View style={
      {
        padding: 10,
        marginBottom: 10,
      }
     }>
       <Text>- {section.content}</Text>
     </View>
   );
 }; 

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: "absolute",
          bottom: 10,
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
      <View
        style={{
          padding: 10,
          marginTop: 20,
        }}
      >
        <YoutubePlayer
          height={230}
          play={playing}
          videoId={post.videoUrl}
          onChangeState={onStateChange}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={{
          paddingHorizontal: 10,
          flex: 1,
          marginBottom: 50,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {post.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "justify",
          }}
        >
          {post.content}
        </Text>

          <Accordion
            sections={sections}
            activeSections={activeSections}
            renderSectionTitle={renderSectionTitle}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            
          />
      </ScrollView>

      <TouchableOpacity
        onPress={() => togglePlaying()}
        style={{
          position: "absolute",
          bottom: 10,
          right: 20,
          width: 30,
          height: 30,
          borderRadius: 20,
          backgroundColor: "#10A3D6",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Icon
          name={playing ? "stop-circle" : "play-circle"}
          size={25}
          color="#fff"
          style={{
            alignSelf: "center",
            textAlign: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostDetailScreen;
