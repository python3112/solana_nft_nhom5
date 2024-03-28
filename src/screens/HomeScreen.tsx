import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity, FlatList  , Button} from "react-native";

import { Section } from "../Section";
import { useAuthorization } from "../utils/useAuthorization";
import { AccountDetailFeature } from "../components/account/account-detail-feature";
import { SignInFeature } from "../components/sign-in/sign-in-feature";
import { ProgressBarTsx } from "../utils/ProgressBar";
import {
  AccountBalance,
  AccountButtonGroup,
  AccountTokens,
} from "../components/account/account-ui";
import {
  Text,
  Avatar,
  useTheme,
  ActivityIndicator,
  DataTable,
  TextInput,
} from "react-native-paper";
import configApi from '../navigators/config';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface user {
  _id: number;
  avata: string;
  fullName: string,
  userName: string,
  userPass: string,
  adressWallet: string,
  point: number,
  pointComplete: number,
  userPms: string

}
export function HomeScreen({ navigation }: { navigation: any }) {
  const { selectedAccount } = useAuthorization();
  const [ttuser, setUser] = useState<user>();
  const [data, setData] = useState();
  const [reset, setreset] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState<string>();



  useEffect(() => {
    if (selectedAccount) {
      const connectWallet = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          const checkApi = await fetch(`${configApi()}api/users/${value}/connect-to-wallet`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({ public_key: selectedAccount.publicKey }),

          })
          if (checkApi.ok) {
            console.log('ok')
          }
        } catch (error) {
          console.log(error)
        }

      }
      connectWallet();
    } else {
      return;
    }

  }, [selectedAccount])


  useEffect(() => {
    if (reset) {
      const getMiss = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          const checkApi = await fetch(`${configApi()}api/missions?id_user=${value}`)

          const response = await checkApi.json();
          // Await here to get the JSON data

          console.log(response.payload.nhiemVu)

          setData(response.payload.nhiemVu)
        } catch (error) {
          console.log(error)
        }

      }
      getMiss()
      setreset(false);
    }

  }, [reset])



  const nextStatus = async (id: string) => {
    try {

      const checkApi = await fetch(`${configApi()}api/missions/${id}/next-status`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json", },


      })
      if (checkApi.ok) {
        setreset(true);
      }
    } catch (error) {
      console.log(error)
    }


  }


  const btnDoing = ({ id }: { id: string }) => {
    setSelectedItemId(id);
  }

  const closeModal = () => {
    setSelectedItemId('');
  }

  const renderItem = ({ item } :{item :  any}) => (
    <View >
      {item.status == 0 ? (
        <View style={styles.items} >
           
          <TouchableOpacity style={{ width: '70%', height: '100%' , flexDirection :'row' , marginStart:5  , alignItems:'center'}} onPress={() => navigation.navigate("deital", { item: item._id })}>
            <Avatar.Image size={55} source={{uri :  item.id_mission.image}} style={{marginStart : 5}}/>
            <View style={{marginStart  : 10}}>
            <Text numberOfLines={1} style={{}} variant="titleMedium">{item.id_mission.title}</Text>
            <Text style={{ marginTop: 10, fontSize: 10 , marginStart  : 5}}>
              Click To Detail
            </Text>
            </View>

          </TouchableOpacity>
          <TouchableOpacity style={{width : '25%' , height: 50, borderWidth : 1 , marginEnd :10  , borderRadius : 10 , alignItems:'center'}} onPress={()=>nextStatus(item._id)}>
           <Text style={{marginTop:10 , padding: 3, fontWeight : 'bold' , fontSize :  15 }}>
                Get Mission
           </Text>
          </TouchableOpacity>

        </View>
      ) : (null)





      }
    </View>


  );
  return (
    <View style={styles.screenContainer}>
      {selectedAccount ? (
        <View
          style={{

            width: '100%',
            height: '100%',
          }}

        >

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={({ _id }) => _id}
          />

        </View>

      ) : (

        <ProgressBarTsx isLoading={true} />
      )
      }
    </View>
  );
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
      marginRight:10,
      marginLeft:10,
  },


  items: {
    width:'100%',
    flexDirection: "row",
    justifyContent:'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#fcff",
    elevation: 4,
  },

});
