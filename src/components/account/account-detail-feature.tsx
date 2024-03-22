import { ImageBackground, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useAuthorization } from "../../utils/useAuthorization";
import {
  AccountBalance,
  AccountButtonGroup,
  AccountTokens,
} from "./account-ui";

export function AccountDetailFeature() {
  const { selectedAccount } = useAuthorization();

  if (!selectedAccount) {
    return null;
  }
  const theme = useTheme();

  return (
    <>
      <ImageBackground source={require('../../../images/b91d4c41f3b6bcb94bb1605c3da89bd5_t.jpeg')}
        style={{
          marginTop: 24,// Độ dày của border
          // Màu của border
          borderRadius: 10, // Độ cong của các góc
          overflow: "hidden",
        }}>
        <AccountBalance address={selectedAccount.publicKey} />

      </ImageBackground>

    </>
  );
}
