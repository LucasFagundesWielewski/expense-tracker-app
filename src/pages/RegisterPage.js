import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!name || !email || !password || !phone) {
      setError('Preencha todos os campos para registrar.');
      return;
    }
    try {
      await register(email, password, name, phone);
    } catch (err) {
      setError('Erro ao registrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#6366f1" />
      </TouchableOpacity>
      <Text style={styles.title}>Registrar</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Registrar" onPress={handleSubmit} color="#2563eb" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
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
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
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

export default RegisterPage;