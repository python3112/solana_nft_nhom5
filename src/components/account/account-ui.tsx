import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  useGetBalance,
  useGetTokenAccountBalance,
  useGetTokenAccounts,
  useRequestAirdrop,
  useTransferSol,
} from "./account-data-access";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import {
  Text,
  useTheme,
  Button,
  ActivityIndicator,
  DataTable,
  TextInput,
} from "react-native-paper";
import { useState, useMemo } from "react";
import { ellipsify } from "../../utils/ellipsify";
import { AppModal } from "../ui/app-modal";

function lamportsToSol(balance: number) {
  return Math.round((balance / LAMPORTS_PER_SOL) * 100000) / 100000;
}

export function AccountBalance({ address }: { address: PublicKey }) {
  const query = useGetBalance({ address });
  return (
    <>
      <TouchableOpacity style={styles.accountBalance}>
        
        <Image source={require('../../../images/logoSol.png')} style={{ width: 30, height: 30, marginEnd: 10 , alignSelf:'center'}}>
        </Image>
        <Text variant="bodyMedium" style={{ color: 'black', fontWeight: "bold", alignSelf: 'center' }}>
          {query.data ? lamportsToSol(query.data) : "..."}
        </Text>
      </TouchableOpacity>
    </>
  );
}

export function AccountButtonGroup({ address }: { address: PublicKey }) {
  const requestAirdrop = useRequestAirdrop({ address });
  const [showSendModal, setShowSendModal] = useState(false);
  const [showAirdropModal, setShowAirdropModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  return (
    <>
      <View style={styles.accountButtonGroup}>
        <AirdropRequestModal
          hide={() => setShowAirdropModal(false)}
          show={showAirdropModal}
          address={address}
        />
        <TransferSolModal
          hide={() => setShowSendModal(false)}
          show={showSendModal}
          address={address}
        />
        <ReceiveSolModal
          hide={() => setShowReceiveModal(false)}
          show={showReceiveModal}
          address={address}
        />
        {/* <Button
          mode="contained"
          disabled={requestAirdrop.isPending}
          onPress={() => {
            setShowAirdropModal(true);
          }}
        >
          Airdrop
        </Button> */}
        {/* <TouchableOpacity

          onPress={() => setShowAirdropModal(true)}
          style={styles.btnAccount}
        >
          <Text>
            Send
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity

          onPress={() => setShowSendModal(true)}
          style={styles.btnAccount}
        >
          <Text style={styles.txtBtn}>
            Send
          </Text>
        </TouchableOpacity>

        <TouchableOpacity

          onPress={() => setShowReceiveModal(true)}
          style={styles.btnAccount}
        >
          <Text style={styles.txtBtn}>
            Received
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export function AirdropRequestModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  const requestAirdrop = useRequestAirdrop({ address });

  return (
    <AppModal
      title="Request Airdrop"
      hide={hide}
      show={show}
      submit={() => {
        requestAirdrop.mutateAsync(1).catch((err) => console.log(err));
      }}
      submitLabel="Request"
      submitDisabled={requestAirdrop.isPending}
    >
      <View style={{ padding: 4 }}>
        <Text>
          Request an airdrop of 1 SOL to your connected wallet account.
        </Text>
      </View>
    </AppModal>
  );
}

export function TransferSolModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  const transferSol = useTransferSol({ address });
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <AppModal
      title="Send SOL"
      hide={hide}
      show={show}
      submit={() => {
        transferSol
          .mutateAsync({
            destination: new PublicKey(destinationAddress),
            amount: parseFloat(amount),
          })
          .then(() => hide());
      }}
      submitLabel="Send"
      submitDisabled={!destinationAddress || !amount}
    >
      <View style={{ padding: 20, borderRadius: 20 }}>
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Wallet Address"
          value={destinationAddress}
          onChangeText={setDestinationAddress}
          mode="outlined"
        />
      </View>
    </AppModal>
  );
}

export function ReceiveSolModal({
  hide,
  show,
  address,
}: {
  hide: () => void;
  show: boolean;
  address: PublicKey;
}) {
  return (
    <AppModal title="Receive assets" hide={hide} show={show}>
      <View style={{ padding: 4 }}>
        <Text selectable={true} variant="bodyMedium">
          You can receive assets by sending them to your public key:{"\n\n"}
          <Text variant="bodyLarge">{address.toBase58()}</Text>
        </Text>
      </View>
    </AppModal>
  );
}

export function AccountTokens({ address }: { address: PublicKey }) {
  let query = useGetTokenAccounts({ address });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Items per page
  const theme = useTheme();

  const items = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return query.data?.slice(start, end) ?? [];
  }, [query.data, currentPage, itemsPerPage]);

  // Calculate the total number of pages
  const numberOfPages = useMemo(() => {
    return Math.ceil((query.data?.length ?? 0) / itemsPerPage);
  }, [query.data, itemsPerPage]);

  return (
    <>
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.onSurfaceVariant,
        }}
      >
        Token Accounts
      </Text>
      <ScrollView>
        {query.isLoading && <ActivityIndicator animating={true} />}
        {query.isError && (
          <Text
            style={{
              padding: 8,
              backgroundColor: theme.colors.errorContainer,
              color: theme.colors.error,
            }}
          >
            Error: {query.error?.message.toString()}
          </Text>
        )}
        {query.isSuccess && (
          <>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Public Key</DataTable.Title>
                <DataTable.Title>Mint</DataTable.Title>
                <DataTable.Title numeric>Balance</DataTable.Title>
              </DataTable.Header>

              {query.data.length === 0 && (
                <View style={{ marginTop: 12 }}>
                  <Text variant="bodyMedium">No token accounts found.</Text>
                </View>
              )}

              {items?.map(({ account, pubkey }) => (
                <DataTable.Row key={pubkey.toString()}>
                  <DataTable.Cell>
                    {ellipsify(pubkey.toString())}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {ellipsify(account.data.parsed.info.mint)}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    <AccountTokenBalance address={pubkey} />
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              {(query.data?.length ?? 0) > 3 && (
                <DataTable.Pagination
                  page={currentPage}
                  numberOfPages={numberOfPages}
                  onPageChange={(page) => setCurrentPage(page)}
                  label={`${currentPage + 1} of ${numberOfPages}`}
                  numberOfItemsPerPage={itemsPerPage}
                  selectPageDropdownLabel={"Rows per page"}
                />
              )}
            </DataTable>
          </>
        )}
      </ScrollView>
    </>
  );
}

export function AccountTokenBalance({ address }: { address: PublicKey }) {
  const query = useGetTokenAccountBalance({ address });
  return query.isLoading ? (
    <ActivityIndicator animating={true} />
  ) : query.data ? (
    <Text>{query.data?.value.uiAmount}</Text>
  ) : (
    <Text>Error</Text>
  );
}

const styles = StyleSheet.create({
  accountBalance: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
    height: 90,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius :15,
   

  },
  accountButtonGroup: {
    // paddingVertical: 4,
    width: '100%',
    justifyContent: 'space-around',
    height: 50,
    flexDirection: "row",
  },
  error: {
    color: "red",
    padding: 8,
  },
  btnAccount: {
    marginLeft: 6,
    borderRadius: 10,
    shadowColor: 'black',
    width: '40%',
    height: '100%',
    backgroundColor: 'gray'


  },
  txtBtn: {
    fontSize: 20,
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'

  }
});
