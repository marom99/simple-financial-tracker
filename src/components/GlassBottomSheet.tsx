import React from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../theme';

interface GlassBottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
}

export function GlassBottomSheet({ visible, onDismiss, children, contentStyle }: GlassBottomSheetProps) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <Pressable accessibilityLabel="Dismiss sheet" onPress={onDismiss} style={styles.backdrop} />
      <View style={[styles.sheetContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="light" style={[styles.sheet, contentStyle]}>
            <View style={styles.handle} />
            {children}
          </BlurView>
        ) : (
          <View style={[styles.sheet, styles.fallbackSheet, contentStyle]}>
            <View style={styles.handle} />
            {children}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.backdrop,
  },
  sheetContainer: {
    maxHeight: '75%',
  },
  sheet: {
    borderTopLeftRadius: radii.sheet,
    borderTopRightRadius: radii.sheet,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  fallbackSheet: {
    backgroundColor: colors.glassFallback,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.divider,
    marginBottom: 16,
  },
});
