import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Shared/Navbar';

const MyAccountPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.title}>Minha Conta</Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Nome: </Text>{user?.name || 'Não informado'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>E-mail: </Text>{user?.email}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Telefone: </Text>{user?.phone || 'Não informado'}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default MyAccountPage;
