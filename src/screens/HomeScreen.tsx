import React from "react";
import { StyleSheet, View, Image, ImageBackground, TouchableOpacity } from "react-native";

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
  Button,
  ActivityIndicator,
  DataTable,
  TextInput,
} from "react-native-paper";

export function HomeScreen() {
  const { selectedAccount } = useAuthorization();

  return (
    <View style={styles.screenContainer}>
      {selectedAccount ? (
        <View
          style={{

            width: '100%',
            height: '30%',
          }}

        >
          <View style={{
            width: '100%',
            height: '100%',

            alignItems: 'center'
          }}>
            <AccountBalance address={selectedAccount.publicKey} />
            <AccountButtonGroup address={selectedAccount.publicKey} />

          </View>


          <View>
            <TouchableOpacity style={styles.item}>
              <View style={{flexDirection:'row' , alignItems:'center'}}>

              <Avatar.Image size={50} source={require('../../images/logoSol.png')} />
              <Text style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                    marginStart:10
                  

                  }}>
                  Solana
              </Text>
              </View>
              
              <View style={{flexDirection :'row'}}>
              <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                  

                  }}
                >
                  4.3$
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontStyle: "italic",
                    fontSize: 11,
                    color: 'red'

                  }}
                >
                  ~20%
                </Text>
              </View>



            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <View style={{flexDirection:'row' , alignItems:'center'}}>

              <Avatar.Image size={50} style={{backgroundColor :'white'}} source={require('../../images/logoEth.png')} />
              <Text style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                    marginStart:10
                  

                  }}>
                Ethereum
              </Text>
              </View>
              
              <View style={{flexDirection :'row'}}>
              <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                  

                  }}
                >
                  22.12$
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontStyle: "italic",
                    fontSize: 11,
                    color: 'red'

                  }}
                >
                  ~12%
                </Text>
              </View>



            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <View style={{flexDirection:'row' , alignItems:'center'}}>

              <Avatar.Image size={50} style={{backgroundColor :'white'}} source={require('../../images/shiba-inu-shib-logo.png')} />
              <Text style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                    marginStart:10
                  

                  }}>
                Shiba Inu
              </Text>
              </View>
              
              <View style={{flexDirection :'row'}}>
              <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight:'bold',
                    fontSize: 22,
                    color: 'black',
                  

                  }}
                >
                  15.3$
                </Text>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontStyle: "italic",
                    fontSize: 11,
                    color: 'blue'

                  }}
                >
                  ~5%
                </Text>
              </View>



            </TouchableOpacity>
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
    alignItems: 'center',

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
