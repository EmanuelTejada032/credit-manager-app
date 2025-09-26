import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, colors } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';
import DateTimePicker from '@react-native-community/datetimepicker';
import CreditCardPreview from '../components/CreditCardPreviews';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;
export default function AddCardScreen({ navigation, route }: Props) {
  const editingCard = route.params?.card;
  const isEditing = !!editingCard;

  const [lastFourDigits, setLastFourDigits] = useState(editingCard?.lastFourDigits || '');
  const [bankName, setBankName] = useState(editingCard?.bankName || '');
  const [cardName, setCardName] = useState(editingCard?.cardName || '');
  const [selectedColor, setSelectedColor] = useState(editingCard?.color || colors.cardColors[0].value);
  const [maxCreditLimit, setMaxCreditLimit] = useState(editingCard?.maxCreditLimit.toString() || '');
  const [availableCredit, setAvailableCredit] = useState(editingCard?.availableCredit.toString() || '');
  
  // Date states
  const [expirationDate, setExpirationDate] = useState<Date>(new Date());
  const [billingCycleClosing, setBillingCycleClosing] = useState<Date>(new Date());
  const [paymentDueDate, setPaymentDueDate] = useState<Date>(new Date());
  
  // Date picker visibility states
  const [showExpDatePicker, setShowExpDatePicker] = useState(false);
  const [showBillingDatePicker, setShowBillingDatePicker] = useState(false);
  const [showPaymentDatePicker, setShowPaymentDatePicker] = useState(false);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  // Format expiration date for card display (MM/YYYY)
  const formatExpDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const handleSave = () => {
    console.log('Card Data:', {
      lastFourDigits,
      bankName,
      cardName,
      color: selectedColor,
      maxCreditLimit,
      availableCredit,
      expirationDate: formatExpDate(expirationDate),
      billingCycleClosing: formatDate(billingCycleClosing),
      paymentDueDate: formatDate(paymentDueDate),
    });
    // We'll connect to API later
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isEditing ? 'Edit Credit Card' : 'Add Credit Card'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Card Preview */}
      <View style={styles.previewContainer}>
        <CreditCardPreview
          lastFourDigits={lastFourDigits}
          bankName={bankName}
          cardName={cardName}
          color={selectedColor}
          expirationDate={formatExpDate(expirationDate)}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Card Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last 4 digits</Text>
            <TextInput
              style={styles.input}
              value={lastFourDigits}
              onChangeText={setLastFourDigits}
              placeholder="1234"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bank name (e.g., Chase, Bank of America)</Text>
            <TextInput
              style={styles.input}
              value={bankName}
              onChangeText={setBankName}
              placeholder="Chase"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card name (e.g., Personal Chase, Business Amex)</Text>
            <TextInput
              style={styles.input}
              value={cardName}
              onChangeText={setCardName}
              placeholder="Personal Chase"
            />
          </View>
        </View>

        {/* Card Color Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Color</Text>
          <View style={styles.colorPicker}>
            {colors.cardColors.map((color) => (
              <TouchableOpacity
                key={color.value}
                onPress={() => setSelectedColor(color.value)}
                style={[
                  styles.colorOption,
                  { backgroundColor: color.value },
                  selectedColor === color.value && styles.colorSelected,
                ]}
              >
                {selectedColor === color.value && (
                  <Ionicons name="checkmark" size={20} color={colors.text.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Credit Limit & Balance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Credit Limit & Balance</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maximum credit limit</Text>
            <TextInput
              style={styles.input}
              value={maxCreditLimit}
              onChangeText={setMaxCreditLimit}
              placeholder="5000"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Available credit amount</Text>
            <TextInput
              style={styles.input}
              value={availableCredit}
              onChangeText={setAvailableCredit}
              placeholder="5000"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Important Dates Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Important Dates</Text>

          {/* Expiration Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expiration Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowExpDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatExpDate(expirationDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {showExpDatePicker && (
            <DateTimePicker
              value={expirationDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowExpDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setExpirationDate(selectedDate);
                }
              }}
            />
          )}

          {/* Billing Cycle Closing */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Billing Cycle Closing</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowBillingDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(billingCycleClosing)}</Text>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {showBillingDatePicker && (
            <DateTimePicker
              value={billingCycleClosing}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowBillingDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setBillingCycleClosing(selectedDate);
                }
              }}
            />
          )}

          {/* Payment Due Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Payment Due Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowPaymentDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(paymentDueDate)}</Text>
              <Ionicons name="calendar-outline" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          {showPaymentDatePicker && (
            <DateTimePicker
              value={paymentDueDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowPaymentDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setPaymentDueDate(selectedDate);
                }
              }}
            />
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? 'Update Credit Card' : 'Save Credit Card'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    ...theme.typography.h3,
    color: colors.text.primary,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  inputGroup: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.caption,
    color: colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    ...theme.typography.body,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: colors.text.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  saveButtonText: {
    ...theme.typography.body,
    color: colors.text.white,
    fontWeight: '600',
  },
    previewContainer: {
    padding: theme.spacing.lg,
    paddingBottom: 0,
 },
 dateInput: {
  backgroundColor: colors.surface,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
dateText: {
  ...theme.typography.body,
  color: colors.text.primary,
},
});