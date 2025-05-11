import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import useAuth from '../hooks/useAuth';
import Navbar from '../components/Shared/Navbar';

const MyAccountPage = () => {
  const { user, resetPassword } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordReset = async () => {
    setMessage('');
    setError('');
    try {
      await resetPassword(email);
      setMessage('Verifique seu e-mail para redefinir a senha.');
    } catch (err) {
      setError('Erro ao redefinir a senha. Tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.resetContainer}>
          <Text style={styles.resetTitle}>Redefinir Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button title="Redefinir Senha" onPress={handlePasswordReset} color="#2563eb" />
          {message ? <Text style={styles.success}>{message}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
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
  resetContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f6f8fa',
    borderRadius: 12,
  },
  resetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  success: {
    marginTop: 10,
    color: 'green',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

export default MyAccountPage;