import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Modal, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from 'axios';

const API_URL = 'http://192.168.1.211:3000/';

export default function ProfileScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  

  const getProfile = async () => {
    try {
      const userId = "660503df607164144755e1b0"; 
      const response = await axios.get(`${API_URL}api/users/${userId}`);
      const data = response.data;
      console.log(data)
      setName(data.payload.data.fullname);
      setUsername(data.payload.data.username);
      setAddress(data.payload.data.address);
      setPhoneNumber(data.payload.data.phoneNumber);
      setEmail(data.payload.data.email);
      setAvatarUrl(data.payload.data.avatar);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const newData = {
        fullname: name,
        username: username,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        avatar: newAvatarUrl || avatarUrl
      };
      const userId = "660503df607164144755e1b0"; 
      const response = await axios.patch(`${API_URL}api/users/${userId}`, newData);
      const updatedData = response.data;
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const saveProfile = () => {
    updateProfile();
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoSection}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              source={{ uri: newAvatarUrl || avatarUrl }}
              size={150} />
            <View style={styles.userInfo}>
              <Title style={styles.title}>{name}</Title>
              <Caption style={styles.caption}>{username}</Caption>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: '#ff0000' }]} 
              onPress={toggleModal}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcon
              name="map-marker-radius"
              color="#777777"
              size={20}/>
            <Text style={styles.labelText}>{address}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcon
              name="phone"
              color="#777777"
              size={20}/>
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcon
              name="email"
              color="#777777"
              size={20}/>
            <Text style={styles.infoText}>{email}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={styles.infoBox}>
            <Title style={styles.infoBoxTitle}>10</Title>
            <Caption style={styles.infoBoxCaption}>Received</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={styles.infoBoxTitle}>10</Title>
            <Caption style={styles.infoBoxCaption}>Mission</Caption>
          </View>
        </View>
      </View>
      
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <KeyboardAvoidingView style={styles.modalContainer} behavior="padding">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Avatar URL"
              value={newAvatarUrl}
              onChangeText={setNewAvatarUrl}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialCommunityIcon name="check-circle" color="#00FF00" size={64} />
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>Profile updated successfully.</Text>
            <TouchableOpacity onPress={() => setShowSuccessModal(false)}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#add8e6',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20, 
  },
  userInfoSection: {
    marginTop: 50,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  userInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  caption: {
    marginTop:12,
    fontSize: 17,
    color: '#000000',
    fontWeight:'bold'
  },
  infoSection: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    backgroundColor:'#ffffff'
  },
  labelText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#555',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  infoText: {
    marginLeft: 10,
    fontSize: 20,
    color: '#333',
    fontWeight:'bold',
    fontStyle:'italic'
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 30,
  },
  infoBox: {
    flex: 1,
    alignItems: 'center',
  },
  infoBoxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoBoxCaption: {
    fontSize: 14,
    color: '#777',
    marginBottom:50,
  },
  buttonContainer: {
    alignSelf: 'center',
    width:200,
    marginTop: 30,
  },
  editButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    width:100,
    textAlign: 'center'
  },
  okButtonText: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
}); 