import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import useAuth from './src/hooks/useAuth';
import AuthChoicePage from './src/pages/AuthChoicePage';
import LoginPage from './src/pages/LoginPage';
import RegisterPage from './src/pages/RegisterPage';
import PasswordResetPage from './src/pages/PasswordResetPage';
import Dashboard from './src/pages/Dashboard';
import MyAccountPage from './src/pages/MyAccountPage';
import ExpenseFormScreen from './src/pages/ExpenseFormScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="AuthChoice" component={AuthChoicePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="PasswordReset" component={PasswordResetPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ExpenseFormScreen" component={ExpenseFormScreen} />
          <Stack.Screen name="MyAccount" component={MyAccountPage} />
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