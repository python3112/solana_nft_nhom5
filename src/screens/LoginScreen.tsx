
import {
    View,
    Button,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Text
} from "react-native";

import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { useAuthorization } from "../utils/useAuthorization";
import React, { useEffect, useState } from "react";

export default function LoginScreen({ navigation }: { navigation: any }) {
    const [userName, setuserName] = useState("");
    const [passWord, setpassWord] = useState("");
    const [adressWallet, setadressWallet] = useState("");
    const [hidePassword, sethidePassword] = useState(true);
    // Chỉ định kiểu dữ liệu cho props navigation
    const { selectedAccount } = useAuthorization();
    const handlePress = () => {
        navigation.navigate('HomeStack')
    };

    const hidePass = () => {
        sethidePassword(!hidePassword)
    };
    return (
        <ImageBackground source={require('../Image/92272c7a28498b6d4c725ccbe4a38800.jpg')} style={styles.container}>

            <View style={{ marginLeft: 20, width: '90%', height: '90%', justifyContent: 'center' }}>
                <Image source={require('../Image/bannerSolana.png')} style={{ resizeMode: 'cover', width: '100%', height: '25%', marginTop: '10%' }} />


                <View style={{ width: '100%', height: '60%' }} >


                    <TextInput
                        style={styles.tip}
                        onChangeText={(text) => setuserName(text)}
                        placeholder="username"
                    />
                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        opacity: 0.8,
                        height: 55,
                        marginStart: 10,
                        marginEnd: 10,
                        paddingStart: 10,
                        marginTop: 20,
                        borderRadius: 12,
                    }}>
                        <TextInput style={{ width: '90%', height: '100%', alignItems: 'center' }}
                            onChangeText={(text) => setuserName(text)}
                            placeholder="password"
                            secureTextEntry={hidePassword}
                        />

                        <TouchableOpacity style={{ height: '100%', justifyContent: 'center' }} onPress={() => hidePass()}>
                            <MaterialCommunityIcon name={hidePassword ? "eye-off" : "eye"} size={25} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{
                        
                        width: '70%',
                        height: '10%',
                        marginTop: '10%',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        borderRadius :20,
                        borderColor : '#41C8E5',
                        borderWidth :2
                    }} onPress={() =>handlePress()}>
                        <Text style={{marginTop :  10, width: '100%', height: '100%', textAlign: 'center' ,fontSize  : 20,  fontWeight :'bold' , color :'#41C8E5' }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
     




            </View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover'

    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    tip: {
        backgroundColor: 'white',
        opacity: 0.8,
        height: 55,
        marginStart: 10,
        marginEnd: 10,
        paddingStart: 10,
        marginTop: 20,
        borderRadius: 12,

    },


});
