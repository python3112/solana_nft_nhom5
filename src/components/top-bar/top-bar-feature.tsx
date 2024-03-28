import { StyleSheet, TouchableOpacity , Image, View } from "react-native";
import { Appbar, useTheme , Avatar } from "react-native-paper";
import { TopBarWalletButton, TopBarWalletMenu } from "./top-bar-ui";
import { useNavigation } from "@react-navigation/core";
import {useEffect , useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import configApi  from '../../navigators/config';
const ipApi = "http://192.168.1.89:3000/";

export function TopBar() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [first, setfirst] = useState<any>([]);
  useEffect(() => {
      
        const getUser = async () => {
          const user = await AsyncStorage.getItem("user");
          const check = await fetch(`${configApi()}api/users/${user}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json", }, 
        })
        if(check.ok){
          const last =  await check.json();
          console.log(last.payload.data)
          setfirst(last.payload.data);
        }else{return;}
        
    
        }
      getUser()
  }, [])



  return (
    <Appbar.Header mode="small" style={styles.topBar}>
      <View style={{marginStart : 10}}>
      <TopBarWalletMenu />
      </View>
      
       <TouchableOpacity style={{ height :'100%' , alignContent:'center' ,marginTop:20 , marginEnd : 20 }} onPress={() => {navigation.navigate("Profiles")}}>
        <Avatar.Image  style={{alignSelf:'center'}} size={40}  source={{ uri : first.avatar}}/>
       </TouchableOpacity>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    alignItems: "center",

  },
});
