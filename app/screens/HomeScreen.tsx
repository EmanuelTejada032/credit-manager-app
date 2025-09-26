import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme, colors } from '../theme';
import { CreditCard } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/navigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function  HomeScreen({ navigation }: Props) {
  const [cards, setCards] = useState<CreditCard[]>([]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="card-outline" size={80} color={colors.text.disabled} />
      </View>
      <Text style={styles.emptyTitle}>No credit cards added yet</Text>
      <Text style={styles.emptySubtitle}>
        Add your first credit card to start tracking expenses
      </Text>
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('AddCard')}
      >
        <Text style={styles.primaryButtonText}>Add Your First Card</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Cards</Text>
          <Text style={styles.headerSubtitle}>{cards.length} cards total</Text>
        </View>
        {cards.length > 0 && (
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color={colors.text.white} />
          </TouchableOpacity>
        )}
      </View>

      {cards.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={cards}
          renderItem={({ item }) => (
            <View style={styles.cardItem}>
              <Text>Card Item - Coming Soon</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...theme.typography.caption,
    color: colors.text.secondary,
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...theme.typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  primaryButtonText: {
    ...theme.typography.body,
    color: colors.text.white,
    fontWeight: '600',
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  cardItem: {
    backgroundColor: colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  },
});