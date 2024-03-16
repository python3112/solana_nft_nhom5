import React from "react";
import { StyleSheet, View , Image } from "react-native";
import { Text } from "react-native-paper";

import { Section } from "../Section";
import { useAuthorization } from "../utils/useAuthorization";
import { AccountDetailFeature } from "../components/account/account-detail-feature";
import { SignInFeature } from "../components/sign-in/sign-in-feature";



export function HomeScreen() {
  const { selectedAccount } = useAuthorization();

  return (
    <View style={styles.screenContainer}>
      <Text
        style={{ fontWeight: "bold", marginBottom: 12 ,textAlign :'center' }}
        variant="displaySmall"
      >
        Home Wallet
      </Text>
      {selectedAccount ? (
        <AccountDetailFeature />
      ) : (
        <>
            <View style={{alignItems : "center"}}>
                <Image source={require('../Image/solanaBanner.png')}/>
            </View>
          <SignInFeature />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
    flex: 1,
  },
  buttonGroup: {
    flexDirection: "column",
    paddingVertical: 4,
  },
});
