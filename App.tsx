import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import Dashboard from './src/pages/Dashboard';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import PasswordResetPage from './src/pages/PasswordResetPage';
import AuthChoicePage from './src/pages/AuthChoicePage';
import ExpenseFormScreen from './src/pages/ExpenseFormScreen';


const Stack = createStackNavigator();


function AppNavigator() {
  const { user, loading } = useAuth();


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }


  return (
    <Stack.Navigator initialRouteName={user ? 'Dashboard' : 'AuthChoice'}>
      {!user ? (
        <>
          {/* Auth Choice Page */}
          <Stack.Screen
            name="AuthChoice"
            component={AuthChoicePage}
            options={{ title: 'Bem-vindo' }}
          />


          {/* Login Page */}
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ title: 'Login' }}
          />


          {/* Register Page */}
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{ title: 'Registrar' }}
          />


          {/* Password Reset Page */}
          <Stack.Screen
            name="PasswordReset"
            component={PasswordResetPage}
            options={{ title: 'Redefinir Senha' }}
          />
        </>
      ) : (
        <>
          {/* Dashboard */}
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'Dashboard' }}
          />


          {/* Expense Form (Add/Edit Expense) */}
          <Stack.Screen
            name="ExpenseForm"
            component={ExpenseFormScreen}
            options={{ title: 'Gerenciar Gasto' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});



