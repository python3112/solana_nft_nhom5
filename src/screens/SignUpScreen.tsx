import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, Alert, ToastAndroid } from 'react-native';
import { TextInput } from '@react-native-material/core';
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import configApi  from '../navigators/config';
const ipApi = "http://192.168.1.89:3000/";
export default function SignUpScreen({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [rePassword, setRepassword] = useState('');
    const [hidePass, sethidePass] = useState(true)

    const handlePress = () => {
        sethidePass(!hidePass);
    };

    const handleSignup = async () => {
        if (!username || !password || !fullname || !rePassword) {
            Alert.alert('Thông tin không đầy đủ', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (username.length < 6) {
            Alert.alert('Tên', 'Tên phải nhiều hơn 6 ký tự');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Mật khẩu quá ngắn', 'Mật khẩu phải nhiều hơn 8 ký tự');
            return;
        }

        if (password !== rePassword) {
            Alert.alert('Mật khẩu không trùng khớp', 'Vui lòng xác định lại mật khẩu');
            return;
        }

        

        try {
            const response = await fetch(`${configApi()}api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, fullname }),
            });

            if (response.ok) {
                Alert.alert('Thành công', 'Người dùng đăng ký thành công');
                navigation.goBack();
                // Handle navigation or other actions upon successful signup
            } else {
                const responseData = await response.json();
                Alert.alert('Lỗi', responseData.error || 'Có gì đó sai');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Lỗi', 'Có gì đó sai');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../../images/logo.png')} />
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Username'
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                color='#57abff'
                variant='outlined'
                label='Full Name'
                style={styles.input}
                value={fullname}
                onChangeText={(text) => setFullname(text)}
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
            <View style={styles.inputPass}>
                <TextInput
                    style={{ width: "100%" }}
                    secureTextEntry={hidePass}
                    variant='outlined'
                    label='Password'
                    value={rePassword}
                    onChangeText={(text) => setRepassword(text)}
                />
                <TouchableOpacity onPress={() => handlePress()} style={styles.eyeIcon}>
                    <MaterialCommunityIcon name={hidePass ? "eye" : "eye-off"} size={25} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>handleSignup()} style={styles.btnDK}>
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
    logo: {
        width: 200,
        height: 200,
        marginVertical: 30,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        marginTop: 20,
    },
    btnDK: {
        width: '80%',
        height: 50,
        borderRadius: 5,
        borderColor: '#57abff',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 30,
        marginBottom: 20
    },
    inputPass: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        borderColor: 'gray',
        marginTop: 20,

    },
    btnText: {
        fontWeight: 'bold',
        color: '#57abff',
        fontSize: 17
    },
    eyeIcon: {
        marginTop: 5,
        position: 'absolute',
        right: 10, // Điều chỉnh khoảng cách từ phía bên phải của TextInput
        top: 10,
    },
});
