import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
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


export function HomeScreen() {
  const { selectedAccount } = useAuthorization();

  return (
    <View style={styles.screenContainer}>
      {selectedAccount ? (
        <View
          style={{

            width: '100%',
            height: '30%',
            backgroundColor: 'rgba(138, 138, 255, 0.8)',


            // Màu của border
            // Cần thiết để bo tròn các góc khi sử dụng borderRadius

          }}

        >
          <View style={{
            width: '100%',
            height: '100%',
          }}>
            <AccountBalance address={selectedAccount.publicKey} />
          </View>
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
    alignItems: 'center'

  },

});
