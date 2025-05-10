import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
          navigation.navigate('Login');
        }},
      ]
    );
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>💸 Expense Tracker</Text>
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.link}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExpenseFormScreen')}>
          <Text style={styles.link}>Gastos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
          <Text style={styles.link}>Minha Conta</Text>
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity onPress={handleLogout}>
            <Text style={[styles.link, styles.logout]}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    marginLeft: 16,
    fontSize: 16,
  },
  logout: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
});

export default Navbar;
