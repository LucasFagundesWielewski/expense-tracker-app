import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import useAuth from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      await resetPassword(email);
      setMessage('Verifique seu e-mail para instruções de redefinição de senha.');
    } catch (error) {
      setMessage('Erro ao redefinir a senha. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        required
      />
      <Button title="Redefinir Senha" onPress={handleSubmit} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default PasswordReset;
