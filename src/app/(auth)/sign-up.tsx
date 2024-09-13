import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, Stack } from 'expo-router';

import Button from '../../components/Button';
import Colors from '../../constants/Colors';

import { supabase } from '@/src/lib/supabase';

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    // Sign up the user with email and password
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert(error.message);
    } else if (data.user) {
      // Use UPSERT to avoid duplicate key error on primary key 'id'
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,         // Use the user's ID from the sign-up response
          full_name: fullName,      // Add full name
          email: data.user.email,   // Add email (fetched from the user object)
          phonenumber: phoneNumber, // Add phone number
        });

      if (profileError) {
        Alert.alert("Profile creation error", profileError.message);
      } else {
        Alert.alert("Success", "Account created successfully!");
      }
    }

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }} />

      <Text style={styles.label}>Full name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="John Doe"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="387123456"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button onPress={signUpWithEmail} disabled={loading} text={loading ? "Creating account" : "Create account"} />
      <Link href="/sign-in" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#003972',
    marginVertical: 10,
  },
});

export default SignUpScreen;
