import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import configApi from '../navigators/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar, MD3Colors } from 'react-native-paper';
interface MissionDetailProps {
    missionData: {
        _id: string;
        id_mission: {
            _id: string;
            description: string;
            image: string;
            point: number;
            require: string;
            title: string;
        };
        id_user: string;
        status: number;
    };
}

export default function DeitalMission({ route, navigation }: { route: any; navigation: any }) {
    const [first, setFirst] = useState<MissionDetailProps['missionData'] | null>(null);

    const { item } = route.params;






    useEffect(() => {
        const getMision = async () => {

            try {
                const checkApi = await fetch(`${configApi()}api/missions/getOne/${item}`)

                const response = await checkApi.json();
                // Await here to get the JSON data
                setFirst(response)
               
            } catch (error) {
                console.log(error)
            }

        }

        getMision()
    }, [])
    useEffect(() => {
        if (first) {
            console.log(first);
        }
    }, [first]);

    return (
        <View style={styles.screenContainer}>
               {
                first ?  (
                    <View style={{flex :  1 , flexDirection : "column"}}>
                        <View style={{width :  '100%' , height : '30%'}}>
                            <Text>
                                Title :  {first.id_mission.title}

                            </Text>
                            <Text>
                            description :  {first.id_mission.description}
                                
                            </Text>
                        </View>
                        <Image style={{
                            width : '100%', 
                            height:  '30%',
                            borderRadius:10
                        }} source={{uri :  first.id_mission.image}}>

                        </Image>
                    </View>
                ) : (
                    <ProgressBar progress={0.5} color={MD3Colors.error50} />
                )
               }

            </View>


      

    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flexDirection: 'column',
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
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    require: {
        fontSize: 16,
        marginBottom: 10,
    },
    point: {
        fontSize: 16,
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});