import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const destinations = [
  {
    id: '1',
    name: 'Manali',
    image: require('../assets/download.jpeg'),
    location: 'Himachal Pradesh',
  },
  {
    id: '2',
    name: 'Jaipur',
    image: require('../assets/download.jpeg'),
    location: 'Rajasthan',
  },
  {
    id: '3',
    name: 'Rann of Kutch',
    image: require('../assets/download.jpeg'),
    location: 'Gujarat',
  },
  {
    id: '4',
    name: 'Andaman Islands',
    image: require('../assets/download.jpeg'),
    location: 'Andaman & Nicobar',
  },
  // Add more destinations as needed
];

const numColumns = 2;
const CARD_WIDTH = (Dimensions.get('window').width - 48) / numColumns;

const ExploreScreen: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase()) ||
    dest.location.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof destinations[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardLocationRow}>
          <Icon name="location-outline" size={14} color="#FF5722" />
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Destinations</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or location"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredDestinations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No destinations found.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 18,
    height: 44,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 8,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    overflow: 'hidden',
    minWidth: CARD_WIDTH,
    maxWidth: CARD_WIDTH,
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});

export default ExploreScreen; 