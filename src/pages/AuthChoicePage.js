import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AuthChoicePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Escolha uma opção para continuar:</Text>
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <View style={styles.spacer} />
        <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
  },
  spacer: {
    height: 10,
  },
});

export default AuthChoicePage;