import { StyleSheet, TouchableOpacity , Image, View } from "react-native";
import { Appbar, useTheme , Avatar } from "react-native-paper";
import { TopBarWalletButton, TopBarWalletMenu } from "./top-bar-ui";
import { useNavigation } from "@react-navigation/core";

export function TopBar() {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <Appbar.Header mode="small" style={styles.topBar}>
      <View style={{marginStart : 10}}>
      <TopBarWalletMenu />
      </View>
      
       <TouchableOpacity style={{ height :'100%' , alignContent:'center' ,marginTop:20 , marginEnd : 20 }} onPress={() => {navigation.navigate("Profiles")}}>
        <Avatar.Image  style={{alignSelf:'center'}} size={40}  source={require('../../../images/OIP.jpg')}/>
       </TouchableOpacity>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  topBar: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor : 'rgba(138, 138, 255, 0.5)'
  },
});
