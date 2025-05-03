import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const categories = [
  { id: 1, name: 'Mountain Rides', icon: 'terrain' },
  { id: 2, name: 'Beach Escapes', icon: 'beach-access' },
  { id: 3, name: 'City Tours', icon: 'location-city' },
  { id: 4, name: 'Wildlife', icon: 'pets' },
];

const popularDestinations = [
  { id: 1, name: 'Leh Ladakh', image: require('../assets/ladakh.jpg'), rating: 4.8 },
  { id: 2, name: 'Goa Beaches', image: require('../assets/goa.jpg'), rating: 4.6 },
  { id: 3, name: 'Kerala Backwaters', image: require('../assets/kerala.jpg'), rating: 4.7 },
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Traveler!</Text>
          <Text style={styles.subGreeting}>Where to next?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={require('../assets/profile.jpg')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#888" />
        <Text style={styles.searchPlaceholder}>Search destinations...</Text>
      </View>
      
      <Text style={styles.sectionTitle}>Explore Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.categoryIcon}>
              <Icon name={category.icon} size={28} color="#FF5722" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.popularSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {popularDestinations.map(destination => (
          <TouchableOpacity 
            key={destination.id} 
            style={styles.destinationCard}
            onPress={() => navigation.navigate('DestinationDetails', { destination })}
          >
            <Image source={destination.image} style={styles.destinationImage} />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{destination.name}</Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{destination.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <Text style={styles.sectionTitle}>Trending Travel Stories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.storiesContainer}
      >
        {[1, 2, 3].map(item => (
          <View key={item} style={styles.storyCard}>
            <Image 
              source={require('../assets/story.jpg')} 
              style={styles.storyImage}
            />
            <View style={styles.storyInfo}>
              <Text style={styles.storyTitle}>Amazing Trip to Himalayas</Text>
              <Text style={styles.storyAuthor}>By Adventurous Rider</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#888',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  popularSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF5722',
    fontSize: 14,
  },
  destinationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationImage: {
    width: '100%',
    height: 180,
  },
  destinationInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#555',
  },
  storiesContainer: {
    marginBottom: 20,
  },
  storyCard: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  storyImage: {
    width: '100%',
    height: 150,
  },
  storyInfo: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  storyAuthor: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen; 