import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      "Confirmar Logout",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", onPress: async () => {
          await logout();
        }},
      ]
    );
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>💸 Expense Tracker</Text>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="home-outline" size={22} color="#6366f1" />
          <Text style={styles.tabLabel}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('ExpenseFormScreen')}>
          <MaterialIcons name="add-circle-outline" size={22} color="#22c55e" />
          <Text style={styles.tabLabel}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('MyAccount')}>
          <Ionicons name="person-outline" size={22} color="#6366f1" />
          <Text style={styles.tabLabel}>Conta</Text>
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity style={styles.tabBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={22} color="#ef4444" />
            <Text style={[styles.tabLabel, styles.logout]}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.tabBtn} onPress={() => navigation.navigate('Login')}>
            <Ionicons name="log-in-outline" size={22} color="#6366f1" />
            <Text style={styles.tabLabel}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#fff',
    paddingTop: 44,
    paddingBottom: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    elevation: 4,
    shadowColor: '#22223b',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  title: {
    color: '#22223b',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    borderRadius: 16,
    marginHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 2,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 13,
    color: '#6366f1',
    marginTop: 2,
    fontWeight: '600',
  },
  logout: {
    color: '#ef4444',
  },
});

export default Navbar;