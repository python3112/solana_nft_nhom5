/**
 * dev: ManhThai
 */
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { useRequestAirdrop } from "../components/account/account-data-access";
import { PublicKey } from "@solana/web3.js";
import { useAuthorization } from "../utils/useAuthorization";
import { AppModal } from "../components/ui/app-modal";

// data
const missions = [
  {
    id: "1",
    title: "Connect with the app ",
    point: 1,
    completed: true,
  },
  {
    id: "2",
    title: "Set public key for account",
    point: 5,
    completed: true,
  },
  {
    id: "3",
    title: "Mission C",
    point: 2.777,
    completed: true,
  },
  {
    id: "4",
    title: "Mission D",
    point: 2,
    completed: false,
  },
  {
    id: "5",
    title: "Mission e",
    point: 2,
    completed: false,
  },
];

type Mission = {
  id: string;
  title: string;
  point: number;
  completed: boolean;
};

export default function Rewart() {
  const { selectedAccount } = useAuthorization();

  if (!selectedAccount) {
    return null;
  }

  const theme = useTheme();
  const [data, setData] = useState(missions);

  const getReward = (item :  Mission) => {
    console.log(`get reward: ${item.point}`);
    const newData = data.filter((mission) => mission.id !== item.id);
    setData(newData);
  };

  const doMission = (item :  Mission) => {
    console.log(`do mission: ${item.title}`);
    ToastAndroid.show(
      "Complete the mission to receive rewards",
      ToastAndroid.SHORT
    );
  };

  const renderItem = ({ item }:  {item : Mission}) => (
    <TouchableOpacity style={styles.item}>
      <View>
        <Text variant="titleMedium">{item.title}</Text>
        <Text
          variant="labelSmall"
          style={{
            fontStyle: "italic",
            color: item.completed
              ? theme.colors.primary
              : theme.colors.secondary,
          }}
        >
          {item.completed ? "Click to get SOL" : "Do this mission to get SOL"}
        </Text>
      </View>
      {item.completed ? (
        <GetRewardButton
          address={selectedAccount.publicKey}
          amount={item.point}
          handleSuccess={() => getReward(item)}
        />
      ) : (
        <Button
          mode="elevated"
          onPress={() => doMission(item)}
          icon="progress-alert"
        >
          SOL | {item.point}
        </Button>
      )}
    </TouchableOpacity>
  );

  return (

    

    <View style={styles.screenContainer}>
      <Text
        variant="headlineLarge"
        style={{ textAlign: "center", fontWeight: "bold", paddingBottom: 16 }}
      >
        Missions And Reward
      </Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={({ id }) => id}
      />
    </View>
  );
}
// get reward
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
    margin: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
  },
});
