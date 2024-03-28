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
import { Button, Icon, Text, Title, useTheme } from "react-native-paper";
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
  const [selectedItemId, setSelectedItemId] = useState(null);

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


  const btnDoing = ({id}) => {
    setSelectedItemId(id);
    setmodalDoing(true);
  }

  const closeModal = () => {
    setmodalDoing(false);
    setSelectedItemId(null);
  }




  const renderItem = ({ item }) => (

    <View style={styles.item} >


      <TouchableOpacity style={{ width: '65%', height: '100%' }} onPress={() => navigation.navigate("deital", { item:  item._id })}>
        <Text variant="titleMedium">{item.id_mission.title}</Text>
        <Text

          style={{ marginTop: 10, fontSize: 10 }}
        >
          Click To Deital
        </Text>



      </TouchableOpacity>


      {item.status === 0 ? (
        <Button mode="outlined" onPress={() => nextStatus(item._id)}>Get Mission</Button>
      ) : item.status === 1 ? (
        <Button onPress={() => btnDoing(item._id)} mode="outlined" style={{ marginStart: 20 }} textColor="black">Doing...</Button>
      ) : item.status === 2 ? (
        <Button disabled>Admin Check</Button>
      ) : item.status === 3 ? (
        <Button mode="outlined" onPress={() => { }}>Get Sol</Button>
      ) : null}


    </View>
  );

  return (



    <View style={styles.screenContainer}>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalDoing}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>

          </View>
        </View>
      </Modal>



      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ _id }) => _id}
      />


    </View>
  );
}
// get reward
async function GetRewardButton({
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
        }}
        submitLabel="Get"
        submitDisabled={requestAirdrop.isPending}
      >
        <View style={{ padding: 4 }}>
          <Text>Get {amount} SOL to your connected wallet account.</Text>
        </View>
      </AppModal>
      <Button
        mode="contained-tonal"
        icon="check"
        disabled={requestAirdrop.isPending}
        onPress={() => setShowAirdropModal(true)}
      >
        SOL | {amount}
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "row",

    alignItems: "center",
    padding: 12,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: "#fcff",
    elevation: 4,
  },
});
