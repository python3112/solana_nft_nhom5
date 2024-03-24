
import { View, Button, StyleSheet, SafeAreaView } from "react-native";
import { Text, Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
export default function DeitalAccountRanking({ route, navigation }: { route: any; navigation: any }) {
   const {item} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{
              uri: item.avata
            }}
            size={80} />
          <View style={{marginLeft: 20}}>
            <Title style={styles.title}>{item.fullName}</Title>
            <Caption style={styles.caption}>@{item.userName}</Caption>
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
          <Title>{item.point}</Title>
          <Caption>Poin</Caption>
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
