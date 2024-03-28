import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import configApi from '../navigators/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
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
                first ? (
                    <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: first.id_mission.image }} />
                    <View style={styles.detailsContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{first.id_mission.title}</Text>
                            <Text style={styles.point}>SOL: {first.id_mission.point}</Text>
                        </View>
                        <Text style={styles.description}>{first.id_mission.description}</Text>
                    </View>
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
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        elevation: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    point: {
        fontSize: 20,
        color: '#696969',
    },
    description: {
        fontSize: 18,
        color: '#696969',
        marginBottom: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});