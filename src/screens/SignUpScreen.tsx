import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, Alert, ToastAndroid } from 'react-native';
import { TextInput } from '@react-native-material/core';

export default function SignUpScreen({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [rePassword, setRepassword] = useState('');

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
            const response = await fetch('http://192.168.1.8:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, fullname }),
            });

            if (response.ok) {
                Alert.alert('Thành công', 'Người dùng đăng ký thành công');
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
            <TextInput
                color='#57abff'
                secureTextEntry
                variant='outlined'
                label='Password'
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                color='#57abff'
                secureTextEntry
                variant='outlined'
                label='Confirm Password'
                style={styles.input}
                value={rePassword}
                onChangeText={(text) => setRepassword(text)}
            />
            <TouchableOpacity onPress={handleSignup} style={styles.btnDK}>
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
    btnText: {
        fontWeight: 'bold',
        color: '#57abff',
        fontSize: 17
    },
});
