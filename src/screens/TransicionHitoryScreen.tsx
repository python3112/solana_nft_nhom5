import { format } from 'date-fns';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Button  , Image} from "react-native";
import { useEffect, useState } from 'react'
import { ProgressBar  , Avatar} from "react-native-paper";
import { useAuthorization } from "../utils/useAuthorization";
import { ProgressBarTsx } from "../utils/ProgressBar";
import { ShyftSdk, Network } from '@shyft-to/js';


interface SimplifiedTxnInfo {
    fee_payer: string;
    amount: number;
    fee: number;
    timestamp: string;
    type : string;
}

export default function TransicionHitoryScreen() {
    const { selectedAccount } = useAuthorization();
    const [listTransactions, setlistTransactions] = useState<SimplifiedTxnInfo[]>([]);

    useEffect(() => {
        console.log('vào màn history')
        const fetchData = async () => {
            if (selectedAccount) {
                const shyft = new ShyftSdk({ apiKey: "M1S8rBLftYC6xhMu", network: Network.Devnet });
                const transactions = await shyft.transaction.history({
                    network: Network.Devnet,
                    account: selectedAccount.publicKey.toString(),
                    enableRaw: true,
                });
                const simplifiedTransactions: SimplifiedTxnInfo[] = transactions.map(transaction => {

                    const amount = transaction.actions.map(action => action.info.amount)

                    return {
                        fee_payer: transaction.fee_payer,
                        amount: transaction.actions.length == 1 ? transaction.actions[0].info.amount : amount.at(2),
                        fee: transaction.fee,
                        timestamp: format(new Date(transaction.timestamp), 'dd/MM/yyyy HH:mm:ss'),
                        type: transaction.type
                    };
                });
                setlistTransactions(simplifiedTransactions);
            }
        };

        fetchData();
    }, [selectedAccount]);
   

    const renderItem = ({ item }: { item: SimplifiedTxnInfo }) =>
    (
        <TouchableOpacity style={item.fee_payer === selectedAccount?.publicKey.toString() ? styles.item2 : styles.item} >
            <View style={{marginStart  : 5}}>
            <Text style={{ fontSize: 20, color: '#FFFFFF', marginStart: 5, fontWeight:'bold' }}>Amount: {item.amount == null ? 1 : item.amount} Sol</Text>
            <Text style={{ fontSize: 20, color: '#FFFFFF', marginStart: 5  , fontWeight:'bold'}}>Fee: {item.fee} Sol</Text>
            <Text style={{ fontSize: 13, color: '#FFFFFF', marginStart: 5 , fontWeight:'bold' }}>Time: {item.timestamp}</Text>
           
            </View>
           
           

          
        </TouchableOpacity>
    )



    return (
        <View style={styles.screenContainer}>
            <Text style={{ fontWeight: "bold", marginBottom: 12, textAlign: 'center', fontSize: 25, fontStyle: 'normal' }}>
                Transactions History
            </Text>
            {selectedAccount ? (
                <FlatList
                    data={listTransactions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <ProgressBarTsx isLoading={true} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 16,
        flex: 1,
    },
    item: {
        
        backgroundColor: '#32CD32',
        paddingTop: 10,
        paddingBottom: 10,
        paddingEnd: 5,
        paddingStart: 5,
        
        marginTop: 10,
        borderRadius: 16,
        margin: 5,
        elevation: 4,
    },
    item2: {
        
        backgroundColor: '#FA8072',
        paddingTop: 10,
     
        paddingBottom: 10,
        paddingEnd: 7,
        paddingStart: 7,
        marginTop: 10,
        margin: 5,
        elevation: 4,
        borderRadius: 16,
    },
});
