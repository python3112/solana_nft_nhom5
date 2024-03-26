
import {
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Text,
    ToastAndroid
} from "react-native";

import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { useAuthorization } from "../utils/useAuthorization";
import React, { useEffect, useState } from "react";
import { TextInput } from "@react-native-material/core";
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface UserData {
    username: string;
    userpass: string;
    _id: string;
}

const ipApi = "http://192.168.1.89:3000/";
export default function LoginScreen({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState<UserData[]>([])
    const [rememberPassword, setRememberPassword] = useState(false);
    const [hidePass, sethidePass] = useState(true)
    // Chỉ định kiểu dữ liệu cho props navigation
    const { selectedAccount } = useAuthorization();
    const handlePress = () => {
        sethidePass(!hidePass);
    };

    useEffect(() => {
        checkRememberPassword();

    }, [])



    const checkRememberPassword = async () => {
        try {
            const value = await AsyncStorage.getItem('rememberPassword');
            setRememberPassword(value === 'true');
        } catch (error) {
            console.log(error);
        }
    };






    const handleLogin = async () => {
        if (username.trim() === '') {
            ToastAndroid.show("Vui lòng nhập đúng tài khoản", ToastAndroid.SHORT);
        } else if (password.trim() === '') {
            ToastAndroid.show("Vui lòng nhập mật khẩu", ToastAndroid.SHORT);
        } else {
            const check = await fetch(`${ipApi}api/auth/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ username: username, password: password }),
            })

            if (check.ok) {
                const responseData = await check.json();
                console.log(responseData.payload.data._id);
                navigation.navigate('HomeStack');
                await AsyncStorage.setItem("user", responseData.payload.data._id);
                if (rememberPassword) {

                } else {
                    setUsername("")
                    setPassword("")
                }


                // await AsyncStorage.setItem('userID', check._id);

            } else {
                ToastAndroid.show("Vui lòng nhập tài khoản", ToastAndroid.SHORT);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../../images/logo.png')} />
            <TextInput
                variant='outlined'
                label='Username'
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <View style={styles.inputPass}>
                <TextInput
                    style={{ width: "100%" }}
                    secureTextEntry={hidePass}
                    variant='outlined'
                    label='Password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={() => handlePress()} style={styles.eyeIcon}>
                    <MaterialCommunityIcon name={hidePass ? "eye" : "eye-off"} size={25} />
                </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    title='Remmember'
                    checked={rememberPassword}
                    onPress={() => setRememberPassword(!rememberPassword)}
                    containerStyle={styles.checkbox}
                />
            </View>

            <TouchableOpacity onPress={() => handleLogin()} style={styles.btnDN}>
                <Text style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 17
                }}>Login</Text>
            </TouchableOpacity>
            <View style={styles.textDNK}>
                <View style={styles.divider} />
                <Text style={styles.orText}>Or Login With</Text>
                <View style={styles.divider} />
            </View>
            <View style={styles.viewDNK}>
                <TouchableOpacity style={styles.btnDNK}>
                    <Image style={styles.icon} source={require('../../images/facebook.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnDNK}>
                    <Image style={styles.icon} source={require('../../images/google.png')} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.btnDK}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginTop: 15,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    logo: {
        width: 200,
        height: 200,
        marginVertical: 40,
    },
    input: {

        width: '80%',
        height: 50,
        borderColor: 'gray',
        marginTop: 20,
    },

    inputPass: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderColor: 'gray',
        marginTop: 20,

    },
    eyeIcon: {
        marginTop: 5,
        position: 'absolute',
        right: 10, // Điều chỉnh khoảng cách từ phía bên phải của TextInput
        top: 10,
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
