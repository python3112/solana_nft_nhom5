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
  Image
} from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { useRequestAirdrop } from "../components/account/account-data-access";
import { PublicKey } from "@solana/web3.js";
import { useAuthorization } from "../utils/useAuthorization";
import { AppModal } from "../components/ui/app-modal";
import configApi  from '../navigators/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// data
const missions = [
  {
    _id: "1",
    title: "Connect with the app ",
    point: 1,
    completed: true,
  },

];

type Mission = {
  _id: string;
  title: string;
  require: string;
  point: number;
  image:string;
  description:string;
};

export default function Rewart({ navigation }: { navigation: any }) {
  const { selectedAccount } = useAuthorization();
  const [data, setData] = useState(missions);
  useEffect(() => {

   const getMiss = async () => {
      const value = await AsyncStorage.getItem('user');
      const checkApi = await fetch(`${configApi()}api/missions/${value}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json", },
       
       
    })
    if(checkApi.ok){
        
    }

    }

    getMiss()
  }, [])


  const renderItem = ({ item }: { item: Mission }) => (
    <View style={styles.item} >
      <TouchableOpacity onPress={() => navigation.navigate("deital", { item })}>
        <Text variant="titleMedium">{item.title}</Text>
        <Text
          variant="labelSmall"
        >
          Click To Deital
        </Text>



      </TouchableOpacity>
      {/* <TouchableOpacity style={{ borderRadius: 10, borderWidth: 1, padding: 10, backgroundColor: "gray" }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Get Mission
        </Text>
      </TouchableOpacity> */}
      <Button mode="outlined">
        Get Mission
      </Button>
    </View>
  );

  return (



    <View style={styles.screenContainer}>




      {/* <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ _id }) => _id}
      /> */}


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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "#fcff",
    elevation: 4,
  },
});
