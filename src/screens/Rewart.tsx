/**
 * dev: ManhThai
 */
import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Modal

} from "react-native";
import { Button, Icon, Text, Title, useTheme, Avatar } from "react-native-paper";
import { useRequestAirdrop } from "../components/account/account-data-access";
import { PublicKey } from "@solana/web3.js";
import { useAuthorization } from "../utils/useAuthorization";
import { AppModal } from "../components/ui/app-modal";
import configApi from '../navigators/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";



export default function Rewart({ navigation }: { navigation: any }) {
  const { selectedAccount } = useAuthorization();
  const [data, setData] = useState();
  const [reset, setreset] = useState(true);
  const [modalDoing, setmodalDoing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string>();
  const [showSuccess, setshowSuccess] = useState(false)


  useEffect(() => {

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
    if (reset) {
      getMiss()
      setreset(false);
    }

    getMiss()


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






  const renderItem = ({ item }: { item: any }) => (
    <View >
      {item.status > 0 ? (
        <View style={styles.item} >

          <TouchableOpacity style={{ width: '65%', height: '100%', flexDirection: 'row', marginStart: 5, alignItems: 'center' }} onPress={() => navigation.navigate("deital", { item: item._id })}>
            <Avatar.Image size={55} source={{ uri: item.id_mission.image }} style={{ marginStart: 5 }} />
            <View style={{ marginStart: 10 }}>
              <Text numberOfLines={1} style={{}} variant="titleMedium">{item.id_mission.title}</Text>
              <Text style={{ marginTop: 10, fontSize: 10, marginStart: 5 }}>
                Click To Detail
              </Text>
            </View>

          </TouchableOpacity>

          {item.status == 1 ? (
            <TouchableOpacity style={{ width: '30%', height: 50, borderWidth: 1, marginEnd: 10, borderRadius: 10, alignItems: 'center' }} onPress={() => nextStatus(item._id)}>
              <Text style={{ marginTop: 10, padding: 3, fontWeight: 'bold', fontSize: 15 }}>
                Doing...
              </Text>
            </TouchableOpacity>
          ) : item.status == 2 ? (
            <TouchableOpacity style={{ width: '30%', height: 50, borderWidth: 1, marginEnd: 10, borderRadius: 10, alignItems: 'center' }} onPress={() => nextStatus(item._id)}>
              <Text style={{ marginTop: 10, padding: 3, fontWeight: 'bold', fontSize: 15 }}>
                Admin Check
              </Text>
            </TouchableOpacity>
          ) : item.status == 3 ? (

            <GetRewardButton address={selectedAccount?.publicKey} amount={item.id_mission.point} handleSuccess={() => {setshowSuccess(true) , nextStatus(item._id)}} />



          ) : item.status == 4 ? (

            null



          )

            : null}



        </View>
      ) : (null)





      }
    </View>
  );

  function GetRewardButton({
    address,
    amount,
    handleSuccess,

  }: {
    address: PublicKey;
    amount: number;
    handleSuccess: () => void;
  }) {
    const requestAirdrop = useRequestAirdrop({ address });
    const [showAirdropModal, setShowAirdropModal] = useState(false);


    return (
      <>
        { }
        <AppModal
          title="Get Reward"
          hide={() => setShowAirdropModal(false)}
          show={showAirdropModal}
          submit={() => {
            requestAirdrop
              .mutateAsync(amount)
              .then(handleSuccess)
              .catch((err) => {
                console.log(err);
              });
            setShowAirdropModal(false)
            
            


          }}
          submitLabel="Get"
          submitDisabled={requestAirdrop.isPending}
        >
          <View style={{ padding: 4 }}>
            <Text>Get {amount} SOL to your connected wallet account.</Text>
          </View>
        </AppModal>
        <TouchableOpacity

          style={{
            width: '30%', height: 50, marginEnd: 10, borderRadius: 10, alignItems: 'center', backgroundColor: '#2196F3', // Màu nền
            elevation: 2
          }}
          disabled={requestAirdrop.isPending}
          onPress={() => setShowAirdropModal(true)}
        >
          <Text style={{ marginTop: 10, padding: 3, fontWeight: 'bold', fontSize: 15, color: 'white' }}>
            Receive {amount} sol
          </Text>

        </TouchableOpacity>
      </>
    );
  }

  return (



    <View style={styles.screenContainer}>

      <Modal animationType='fade' transparent={true} visible={showSuccess} >
        <View style={styles.menuXoa}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', margin: 10, alignSelf: 'center' }}>Get a Success Reward</Text>
          <Avatar.Image size={65} source={require('../../images/5709755.png')} style={{ marginStart: 5 , backgroundColor :'white' , alignSelf :'center' }} />
          <View style={{ flexDirection: 'row', width: '100%', marginTop: 15, justifyContent: 'space-around' }}>
            <TouchableOpacity onPress={() => {setshowSuccess(false) , setreset(true)}} style={{ borderRadius: 10, backgroundColor: '#4d97f3', width: '40%', padding: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity

        style={{
          width: '100%', height: 40, borderRadius: 10, alignItems: 'center', alignSelf: 'center', backgroundColor: '#2196F3', // Màu nền
          elevation: 2
        }}
        onPress={() => setreset(true)}
      >
        <Text style={{ marginTop: 10, padding: 3, fontWeight: 'bold', fontSize: 15, color: 'white' }}>
          Check Mission
        </Text>

      </TouchableOpacity>


      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ _id }) => _id}
      />


    </View>
  );
}
// get reward


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  item: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#fcff",
    elevation: 4,
  },

  menuXoa: {
    backgroundColor: '#F5F5F5', width: 320, paddingBottom: 15, alignSelf: 'center', marginTop: 300, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    borderRadius: 20,
  },
});
