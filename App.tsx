import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import Navbar from './src/components/Shared/Navbar';
import Dashboard from './src/pages/Dashboard';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import PasswordResetPage from './src/pages/PasswordResetPage';
import ExpenseForm from './src/components/Expenses/ExpenseForm';
import MyAccountPage from './src/pages/MyAccountPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        {/* Navbar */}
        <Navbar />
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />
          <Stack.Screen name="Register" component={RegisterPage} options={{ title: 'Registrar' }} />
          <Stack.Screen name="PasswordReset" component={PasswordResetPage} options={{ title: 'Redefinir Senha' }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
          <Stack.Screen name="ExpenseForm" component={ExpenseForm} options={{ title: 'Gerenciar Gasto' }} />
          <Stack.Screen name="MyAccount" component={MyAccountPage} options={{ title: 'Minha Conta' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});