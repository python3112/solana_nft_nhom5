import React from 'react';
import { View, ActivityIndicator, StyleSheet , Text } from 'react-native';

interface ProgressBarProps {
  isLoading: boolean; // Thêm một prop để chỉ định liệu biểu tượng nên hiển thị hoặc không
  size?: 'small' | 'large'; // Kích thước của biểu tượng xoay tròn
  color?: string; // Màu của biểu tượng xoay tròn
}

export const ProgressBarTsx: React.FC<ProgressBarProps> = ({ isLoading, size = 'large', color = '#0000ff' }) => {
  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size={size} color={color} />}
      <Text>
            Connect to Wallet
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});




