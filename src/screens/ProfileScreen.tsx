import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Modal, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import configApi  from '../navigators/config';

const API_URL = 'http://192.168.1.211:3000/';
const DEFAULT_AVATAR_URL = 'https://example.com/default_avatar.jpg';

export default function ProfileScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const getProfile = async () => {
    try{
      const userId = await AsyncStorage.getItem('user');
      const response = await axios.get(`${configApi()}api/users/${userId}`);
      const data = response.data;
      setName(data.payload.data.fullname);
      setUsername(data.payload.data.username);
      setPassword(data.payload.data.password)
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
        password: password,
        avatar: newAvatarUrl || avatarUrl || DEFAULT_AVATAR_URL
      };
      const userId = await AsyncStorage.getItem('user');
      const response = await axios.patch(`${configApi()}api/users/${userId}`, newData);
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
        <View style={styles.avatarContainer}>
          <Avatar.Image
            source={{ uri: newAvatarUrl || avatarUrl || DEFAULT_AVATAR_URL }}
            size={150} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: '#ff0000' }]} 
            onPress={toggleModal}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcon
              name="account"
              color="#777777"
              size={20}/>
            <Text style={styles.labelText}>{name}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcon
              name="account-box"
              color="#777777"
              size={20}/>
            <Text style={styles.infoText}>{username}</Text>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcon
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                color="#777777"
                size={24}
              />
            </TouchableOpacity>
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
            {/* <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            /> */}
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcon
                  // name={showPassword ? "eye-off-outline" : "eye-outline"}
                  color="#777777"
                  size={24}
                />
              </TouchableOpacity>
            </View>
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
  avatarContainer: {
    alignItems: 'center',
    marginTop:100
  },
  infoSection: {
    marginBottom:70,

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
    marginLeft: 20,
    fontSize: 20,
    color: '#555',
    fontWeight:'bold',
  },
  infoText: {
    marginLeft: 20,
    fontSize: 20,
    color: '#333',
    fontWeight:'bold',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor:'#ffffff',
   
  },
  showPasswordButton: {
    position: 'absolute',
    right: 15,
    bottom: 22,
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
    borderRadius: 20,
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
    marginTop:10
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