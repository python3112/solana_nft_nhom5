import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text
} from "react-native";

import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { useAuthorization } from "../utils/useAuthorization";
import React, { useEffect, useState } from "react";
import { TextInput } from "@react-native-material/core";
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SignUpScreen({ navigation }: { navigation: any }) {
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [birthDay, setBirthday] = useState('');
    const [rePassword, setRepassword] = useState('');
  
    // Chỉ định kiểu dữ liệu cho props navigation
    const { selectedAccount } = useAuthorization();
    const handlePress = () => {
        navigation.navigate('HomeStack')
    };

 
    return (
        <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 30, color: '#57abff',fontWeight:'bold',fontStyle:'italic'}}>
          Chào mừng bạn đến với
        </Text>
              <Text style={{marginBottom:20, fontSize: 40, color: '#57abff',fontWeight:'bold'}}>DevTales</Text>
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Tài khoản'
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Họ và tên'
                style={styles.input}
                value={fullname}
                onChangeText={(text) => setFullname(text)}
            />
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Ngày sinh'
                style={styles.input}
                value={birthDay}
                onChangeText={(text) => setBirthday(text)}
            />
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Email'
                keyboardType='email-address'
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                color='#57abff'
                secureTextEntry
                variant='outlined'
                label='Mật khẩu'
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
           <TextInput
              color='#57abff'
                secureTextEntry
                variant='outlined'
                label='Nhập lại mật khẩu'
                style={styles.input}
                value={rePassword}
                onChangeText={(text) => setRepassword(text)}
            />
           <TouchableOpacity onPress={() =>{}} style={styles.btnDK}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
            </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0FFFF',
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginStart: 23,        
        marginTop:15,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    logo: {
        width: 200,
        height: 200,
        marginVertical: 50,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        marginTop:20,
    },
    btnDN: {
        width: "80%",
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#57abff',
        marginBottom: 20,
        marginTop: 30,
    },
    btnText: {
        fontWeight: 'bold',
        color: '#57abff',
        fontSize: 17
    },
    btnDK: {
        width: "80%",
        height: 50,
        borderRadius: 5,
        borderColor: '#57abff',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop:30,
        marginBottom: 20
    },
    viewDNK: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    btnDNK: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40
    },
    textDNK: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        width: '21%',
        height: 1,
        backgroundColor: 'gray'
    },
    orText: {
        fontSize: 16
    }

});