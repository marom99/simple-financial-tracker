import React, { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { GlassBottomSheet } from '../../components/GlassBottomSheet';
import { DEFAULT_CATEGORIES } from './categoryDefaults';
import { createDefaultExpenseInput } from './expenseStore';
import { useExpenseStore } from './ExpenseStoreContext';
import type { ExpenseValidationError } from './types';
import { colors, radii, spacing, typography } from '../../theme';
import { toDateInputValue } from '../../utils/dateLabels';

interface AddExpenseSheetProps {
  visible: boolean;
  onClose: () => void;
}

const ERROR_MESSAGES: Record<ExpenseValidationError, string> = {
  missing_amount: 'Enter an amount to save this expense.',
  invalid_amount: 'Amount must be greater than zero.',
  missing_label: 'Add a merchant or note.',
  missing_category: 'Choose a category.',
  invalid_date: 'Enter a valid date.',
};

export function AddExpenseSheet({ visible, onClose }: AddExpenseSheetProps) {
  const store = useExpenseStore();
  const [amount, setAmount] = useState('');
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState<string>(DEFAULT_CATEGORIES[0]);
  const [date, setDate] = useState(toDateInputValue(new Date()));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      const defaults = createDefaultExpenseInput();
      setAmount('');
      setLabel('');
      setCategory(defaults.category);
      setDate(defaults.date);
      setError(null);
    }
  }, [visible]);

  const handleSave = async () => {
    setSaving(true);
    const digits = amount.replace(/[^\d]/g, '');
    if (!digits) {
      setSaving(false);
      setError(ERROR_MESSAGES.missing_amount);
      return;
    }
    const parsedAmount = Number(digits);
    const result = await store.addExpense({
      amount: parsedAmount,
      label,
      category,
      date,
    });
    setSaving(false);

    if (result.error) {
      setError(ERROR_MESSAGES[result.error]);
      return;
    }

    if (result.storageError) {
      setError(store.getError() ?? 'Unable to save expense.');
      return;
    }

    onClose();
  };

  return (
    <GlassBottomSheet onDismiss={onClose} visible={visible}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add expense</Text>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          accessibilityLabel="Expense amount"
          autoFocus
          keyboardType="number-pad"
          onChangeText={setAmount}
          placeholder="50000"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={amount}
        />

        <Text style={styles.label}>Merchant or note</Text>
        <TextInput
          accessibilityLabel="Merchant or note"
          onChangeText={setLabel}
          placeholder="KFC"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={label}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          {DEFAULT_CATEGORIES.map((item) => {
            const selected = item === category;
            return (
              <Pressable
                key={item}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setCategory(item)}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.label}>Date</Text>
        <TextInput
          accessibilityLabel="Expense date"
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={date}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Save expense"
          disabled={saving}
          onPress={() => void handleSave()}
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        >
          <Text style={styles.saveButtonText}>{saving ? 'Saving…' : 'Save expense'}</Text>
        </Pressable>
      </ScrollView>
    </GlassBottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.sheetTitle,
    color: colors.text,
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.divider,
    borderRadius: radii.input,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text,
    backgroundColor: colors.background,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.category,
    backgroundColor: colors.categoryBg,
  },
  chipSelected: {
    backgroundColor: colors.accent,
  },
  chipText: {
    ...typography.caption,
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.background,
    fontWeight: '600',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.sm,
  },
  saveButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radii.input,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: '600',
  },
});
