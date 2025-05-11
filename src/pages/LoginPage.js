import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoginPage = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Preencha todos os campos para entrar.');
      return;
    }
    try {
      await login(email, password);
    } catch (err) {
      setError('E-mail ou senha inválidos. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#6366f1" />
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      {error !== '' && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 2,
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#e11d48',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#fde8ec',
    padding: 8,
    borderRadius: 6,
  },
});

export default LoginPage;