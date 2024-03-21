import React from 'react';
import { View, Text, SafeAreaView, FlatList } from 'react-native';

interface ItemProps {
  name: string;
  score: number;
}

const dummyData = [
  { id: 1, name: 'Nguyen van linh', score: 0.5 },
  { id: 2, name: 'Nguyen van linh', score: 0.5 },
  { id: 3, name: 'Nguyen van linh', score: 0.5 },
  { id: 4, name: 'Nguyen van linh', score: 0.5 },
  { id: 5, name: 'Nguyen van linh', score: 0.5 },
];

const ItemView: React.FC<ItemProps> = React.memo(({ name, score }) => {
  return (
    <View
      style={{
        width: '95%',
        backgroundColor: 'white',
        marginVertical: 10,
        shadowColor: 'black',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        borderWidth: 0.5,
        borderColor: 'silver',
        borderRadius: 20,
        alignSelf: 'center',
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Text style={{ color: 'black', fontSize: 15 }}>{name}</Text>
      <Text style={{ color: 'black', fontSize: 15 }}>{score}</Text>
    </View>
  );
});

const BlankScreen = () => {
  return (
    <SafeAreaView style={{ width: '90%', height: '100%', alignSelf: 'center' }}>
      <Text style={{ alignSelf: 'center', fontSize: 25, marginBottom: 20, fontWeight: "bold" }}>Bảng xếp hạng</Text>
      <FlatList
        data={dummyData}
        keyExtractor={e => e.id.toString()}
        renderItem={({ item, index }) => <ItemView name={item.name} score={item.score} />}
      />
    </SafeAreaView>
  );
};

export default BlankScreen;
