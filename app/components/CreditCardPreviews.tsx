import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme, colors } from '../theme';

interface Props {
  lastFourDigits: string;
  bankName: string;
  cardName: string;
  color: string;
  expirationDate: string;
}

export default function CreditCardPreview({
  lastFourDigits,
  bankName,
  cardName,
  color,
  expirationDate,
}: Props) {
  // Format the card number display
  const formatCardNumber = () => {
    const digits = lastFourDigits.padEnd(4, '•');
    return `•••• •••• •••• ${digits}`;
  };

  // Format expiration date
  const formatExpDate = () => {
    if (!expirationDate) return 'MM/YYYY';
    return expirationDate;
  };

  return (
    <View style={[styles.cardContainer, { backgroundColor: color }]}>
      {/* Card Top Section */}
      <View style={styles.cardTop}>
        <Text style={styles.bankName}>{bankName || 'Bank Name'}</Text>
      </View>

      {/* Card Chip */}
      <View style={styles.chipContainer}>
        <View style={styles.chip} />
      </View>

      {/* Card Number */}
      <Text style={styles.cardNumber}>{formatCardNumber()}</Text>

      {/* Card Bottom Section */}
      <View style={styles.cardBottom}>
        <View style={styles.cardInfo}>
          <Text style={styles.label}>CARD HOLDER</Text>
          <Text style={styles.cardHolder}>{cardName || 'Your Name'}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.label}>EXPIRES</Text>
          <Text style={styles.expDate}>{formatExpDate()}</Text>
        </View>
      </View>

      {/* Card Design Elements */}
      <View style={styles.circleDecor1} />
      <View style={styles.circleDecor2} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankName: {
    ...theme.typography.body,
    color: colors.text.white,
    fontWeight: '700',
    fontSize: 18,
  },
  chipContainer: {
    marginTop: theme.spacing.sm,
  },
  chip: {
    width: 45,
    height: 35,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardNumber: {
    ...theme.typography.h3,
    color: colors.text.white,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: theme.spacing.sm,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
    fontWeight: '600',
  },
  cardHolder: {
    ...theme.typography.body,
    color: colors.text.white,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  expDate: {
    ...theme.typography.body,
    color: colors.text.white,
    fontWeight: '600',
  },
  circleDecor1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -100,
    right: -50,
  },
  circleDecor2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    bottom: -75,
    left: -30,
  },
});