import React, { useState , useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, StyleSheet , Image } from 'react-native';
import { Button, Icon, Text, useTheme, Avatar } from "react-native-paper";
const ipApi = "http://192.168.20.91:3000/";
import configApi  from '../navigators/config';
interface ItemProps {
  _id: number;
  avatar: string;
  fullname:string,
  username:string,
  password:string, 
  public_key : string,
  point :number,
  role:string

}

export default function Rewart({ navigation }: { navigation: any }) {

  const [listdata, setlistdata] = useState([])

  useEffect( () => {
    const downloadData = async () => {
      try {
        const response = await fetch(`${configApi()}api/users/top-10-points`);
        const apiData = await response.json();
        console.log(apiData.payload.data)
        setlistdata(apiData.payload.data);
      } catch (error) {
        console.log(error);
      }
    };
    downloadData();
  
    
  }, [])



  const getRewardImage = (index: number) => {
    if (index === 0) {
      return require('../../images/winner.png');
    } else if (index === 1) {
      return require('../../images/silver-medal.png');
    } else if (index === 2) {
      return require('../../images/bronze-medal.png');
    } else {
      return require('../../images/top10.png') ;
    }
  };
  
  
  const renderItem = ({ item , index }: { item: ItemProps ; index : number   }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("deitalAcc", { item })}>
  
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={50} source={item.avatar ===  null ? require('../../images/man.png') : {uri :  item.avatar} } />
          <Text style={{ marginStart: 10 }} variant="titleMedium">{item.fullname}</Text>
        </View>
      
        <Image source={getRewardImage(index)}/>
  
      </View>
  
      
      <View style={{flexDirection :'row' , justifyContent :'space-between' , width :'100%'}}>
  
        
  
      </View>
  
  
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={{ width: '90%', height: '100%', alignSelf: 'center' }}>
      <FlatList
        data={listdata}
        keyExtractor={e => e._id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    margin: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 4,
  },
});


