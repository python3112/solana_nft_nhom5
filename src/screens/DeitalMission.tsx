import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

export default function DeitalMission({ route, navigation }: { route: any; navigation: any }) {
    const { item } = route.params;
    return (
        <View style={styles.screenContainer}>

            <TouchableOpacity style={styles.item}>
                <Text>{item.title}</Text>
                <Text>Point: {item.point}</Text>
                <Text>Status: {item.completed ? "Completed" : "Not Completed"}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    screenContainer: {
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
});