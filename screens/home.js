import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal,
TouchableWithoutFeedback, Keyboard } from "react-native";
import Card from "../shared/card";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from '../styles/global';
import ReviewForm from "./reviewForm";

export default function Home({ navigation }) {
  
  const [modalOpen, setModalopen] = useState(false);
  const [review, setreview] = useState([
    {title: "zain ahsan full stack developer",rating: 5, body: "lorem ipsum dolor", key: "1",},
    {title: "mouzzam graphic designer", rating: 4, body: "lorem ipsum dolor", key: "2",},
    {title: "yazdani java core developer", rating: 3, body: "lorem ipsum dolor", key: "3",},
    
  ]);

  const addReview = (review) =>{
    review.key = Math.random().toString();
    setreview((currentReview)=> {
      return[review, ...currentReview];
    });
    setModalopen(false);
  }
  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={24}
            style={{...styles.modalToggle, ...styles.modalClose}}
            onPress={() => setModalopen(false)}
          />
            <ReviewForm addReview={addReview}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalopen(true)}
        />

      <FlatList
        data={review}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ReviewDetails", item)}
          >
            <Card>
              <Text style={styles.titleText}>{item.title}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding:10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom:0,
  },
  titleText: {
    paddingLeft: 20,
    paddingBottom: 15,
  },
  modalContent: {
    flex: 1,
  }
});
