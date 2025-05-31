import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  // Dummy user data
  const user = {
    name: 'Priyanka Deshmukh',
    email: 'priyanka@example.com',
    avatar: require('../assets/profile.jpg'),
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon!');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Logout functionality coming soon!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
          <Icon name="create-outline" size={22} color="#FF5722" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
          <Icon name="log-out-outline" size={22} color="#fff" />
          <Text style={[styles.actionText, { color: '#fff' }]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Settings')}>
          <Icon name="settings-outline" size={22} color="#FF5722" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: '#888',
  },
  actions: {
    width: '100%',
    marginTop: 30,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
});

export default ProfileScreen; 