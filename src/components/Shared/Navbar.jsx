import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao sair:', error.message);
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.navLink}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ExpenseFormScreen')}>
        <Text style={styles.navLink}>Gerenciar Gastos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
        <Text style={styles.navLink}>Minha Conta</Text>
      </TouchableOpacity>
      {user ? (
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.navLink, styles.logout]}>Sair</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navLink}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
  },
  navLink: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logout: {
    color: '#dc3545',
  },
});

export default Navbar;