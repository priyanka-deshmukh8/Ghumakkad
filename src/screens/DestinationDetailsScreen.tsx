import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DestinationDetailsScreen = ({ navigation, route }) => {
  const { destination } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Destination Details</Text>
      {destination ? (
        <>
          <Text style={styles.destinationName}>{destination.name}</Text>
          <Text style={styles.destinationRating}>Rating: {destination.rating}</Text>
        </>
      ) : (
        <Text>No destination details available.</Text>
      )}
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  destinationName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  destinationRating: {
    fontSize: 16,
    color: '#666',
  },
});

export default DestinationDetailsScreen; 