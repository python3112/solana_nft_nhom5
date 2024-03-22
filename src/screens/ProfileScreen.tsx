
import { View, Button, StyleSheet, SafeAreaView } from "react-native";
import { Text, Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: 'https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png'
            }}
            size={80} />
          <View style={{marginLeft: 20}}>
            <Title style={styles.title}>Nguyễn Văn A</Title>
            <Caption style={styles.caption}>@nguyenvana</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcon
          name="map-marker-radius"
          color="#777777"
          size={20}/>
          <Text style={{marginLeft: 5}}>Hanoi, Vietnam</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcon
          name="phone"
          color="#777777"
          size={20}/>
          <Text style={{marginLeft: 5}}>0983597743</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcon
          name="email"
          color="#777777"
          size={20}/>
          <Text style={{marginLeft: 5}}>nguyenvana@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={styles.infoBox}>
          <Title>10</Title>
          <Caption>Received</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>10</Title>
          <Caption>Mission</Caption>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    borderRightColor: '#dddddd',
    borderRightWidth: 1
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
