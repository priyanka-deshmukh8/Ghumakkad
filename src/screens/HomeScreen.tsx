import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Dimensions, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList, MainTabParamList } from '../navigation/AppNavigator';
import { Modal, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

const categories = [
  { id: 1, name: 'Mountain Rides', icon: 'terrain' },
  { id: 2, name: 'Beach Escapes', icon: 'beach-access' },
  { id: 3, name: 'City Tours', icon: 'location-city' },
  { id: 4, name: 'Wildlife', icon: 'pets' },
];

const popularDestinations = [
  { id: 1, name: 'Leh Ladakh', image: require('../assets/download.jpeg'), rating: 4.8 },
  { id: 2, name: 'Goa Beaches', image: require('../assets/download.jpeg'), rating: 4.6 },
  { id: 3, name: 'Kerala Backwaters', image: require('../assets/download.jpeg'), rating: 4.7 },
];

// Example curated destinations data
const curatedDestinations = [
  {
    id: '1',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    image: require('../assets/rishikesh.jpg'),
    highlights: ['Yoga retreats', 'White-water rafting', 'Ganga Aarti at Triveni Ghat', 'Lakshman Jhula'],
    stays: [
      { name: 'Hostels & Ashrams', price: '₹500–₹1,200/day', type: 'Hostel/Ashram' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹800–₹1,200',
    bestTime: 'September to April',
    tips: [],
  },
  {
    id: '2',
    name: 'Kasol',
    state: 'Himachal Pradesh',
    image: require('../assets/kasol.jpg'),
    highlights: ['Trekking in Parvati Valley', 'Serene landscapes', 'Vibrant café culture'],
    stays: [
      { name: 'Guesthouses & Hostels', price: '₹500–₹1,000/day', type: 'Guesthouse/Hostel' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹800–₹1,200',
    bestTime: 'March to June and October to November',
    tips: [],
  },
  {
    id: '3',
    name: 'Pondicherry (Puducherry)',
    state: 'Puducherry',
    image: require('../assets/puducherry.jpg'),
    highlights: ['French colonial architecture', 'Beaches', 'Auroville'],
    stays: [
      { name: 'Budget hotels & Guesthouses', price: '₹800–₹1,500/day', type: 'Hotel/Guesthouse' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,000–₹1,500',
    bestTime: 'October to March',
    tips: [],
  },
  {
    id: '4',
    name: 'Kodaikanal',
    state: 'Tamil Nadu',
    image: require('../assets/kodaikanal.jpg'),
    highlights: ["Kodaikanal Lake", "Coaker's Walk", "Bryant Park"],
    stays: [
      { name: 'Homestays & Budget hotels', price: '₹1,000–₹1,500/day', type: 'Homestay/Hotel' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,500–₹2,000',
    bestTime: 'October to March',
    tips: [],
  },
  {
    id: '5',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: require('../assets/varanasi.jpg'),
    highlights: ['Ganga Aarti', 'Kashi Vishwanath Temple', 'Sarnath'],
    stays: [
      { name: 'Guesthouses & Lodges', price: '₹500–₹1,000/day', type: 'Guesthouse/Lodge' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹800–₹1,200',
    bestTime: 'October to March',
    tips: [],
  },
  {
    id: '6',
    name: 'Goa',
    state: 'Goa',
    image: require('../assets/goa.jpg'),
    highlights: ['Beaches', 'Forts', 'Vibrant nightlife', 'Portuguese heritage'],
    stays: [
      { name: 'Hostels & Beach huts', price: '₹800–₹1,500/day', type: 'Hostel/Beach hut' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,000–₹1,500',
    bestTime: 'November to February',
    tips: [],
  },
  {
    id: '7',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: require('../assets/jaipur.jpg'),
    highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal'],
    stays: [
      { name: 'Budget hotels & Hostels', price: '₹800–₹1,500/day', type: 'Hotel/Hostel' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,000–₹1,500',
    bestTime: 'October to March',
    tips: [],
  },
  {
    id: '8',
    name: 'Shimla',
    state: 'Himachal Pradesh',
    image: require('../assets/shimla.jpg'),
    highlights: ['Mall Road', 'Jakhu Temple', 'Toy train ride'],
    stays: [
      { name: 'Guesthouses & Hostels', price: '₹1,000–₹1,500/day', type: 'Guesthouse/Hostel' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,500–₹2,000',
    bestTime: 'October to June',
    tips: [],
  },
  {
    id: '9',
    name: 'Hampi',
    state: 'Karnataka',
    image: require('../assets/hampi.jpg'),
    highlights: ['Ancient ruins', 'Virupaksha Temple', 'Boulder landscapes'],
    stays: [
      { name: 'Guesthouses & Homestays', price: '₹800–₹1,200/day', type: 'Guesthouse/Homestay' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,000–₹1,500',
    bestTime: 'October to March',
    tips: [],
  },
  {
    id: '10',
    name: 'McLeod Ganj',
    state: 'Himachal Pradesh',
    image: require('../assets/mcleodganj.jpg'),
    highlights: ['Dalai Lama Temple', 'Bhagsu Waterfall', 'Trekking'],
    stays: [
      { name: 'Hostels & Guesthouses', price: '₹800–₹1,200/day', type: 'Hostel/Guesthouse' },
    ],
    food: [],
    breaks: [],
    avgCost: '₹1,000–₹1,500',
    bestTime: 'March to June and September to November',
    tips: [],
  },
];

type Destination = {
  id: string;
  name: string;
  state: string;
  highlights: string[];
  image: string; // URL or local asset
  stays: { name: string; price: string; type: string; link?: string }[];
  food: { name: string; type: string; price: string; description?: string }[];
  breaks: { name: string; type: string; description?: string }[];
  avgCost: string;
  bestTime: string;
  tips: string[];
};

type HomeScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
  >;
};

// Small widget for a list item (stay, food, break, tip)
const Widget = ({ icon, title, subtitle, onPress }: { icon: string, title: string, subtitle?: string, onPress?: () => void }) => (
  <TouchableOpacity style={widgetStyles.card} onPress={onPress} activeOpacity={onPress ? 0.7 : 1}>
    <Icon name={icon} size={22} color="#FF5722" style={widgetStyles.icon} />
    <View style={{ flex: 1 }}>
      <Text style={widgetStyles.title}>{title}</Text>
      {subtitle ? <Text style={widgetStyles.subtitle}>{subtitle}</Text> : null}
    </View>
  </TouchableOpacity>
);

const widgetStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    marginRight: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 160,
    maxWidth: 220,
  },
  icon: {
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
  },
});

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedDestination, setSelectedDestination] = useState<typeof curatedDestinations[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDestination = (destination: any) => {
    setSelectedDestination(destination);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDestination(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.username}>Traveler</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image 
            source={require('../assets/profile.jpg')} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor="#aaa"
        />
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
      
      {/* Curated Destinations Section */}
      <Text style={styles.sectionTitle}>Curated Travel Guide</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginLeft: 24, marginBottom: 24 }}>
        {curatedDestinations.map(dest => (
          <TouchableOpacity
            key={dest.id}
            style={[styles.destinationCard, { width: width * 0.7 }]}
            onPress={() => openDestination(dest)}
          >
            <Image source={{ uri: dest.image }} style={styles.destinationImage} />
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName}>{dest.name}</Text>
              <Text style={{ color: '#888', fontSize: 13 }}>{dest.state}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                {dest.highlights.slice(0, 2).map(h => (
                  <View key={h} style={{ backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6, marginBottom: 4, elevation: 1 }}>
                    <Text style={{ color: '#FF5722', fontSize: 12 }}>{h}</Text>
                  </View>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for Destination Details */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFF8F3', borderRadius: 24, width: width * 0.9, maxHeight: '90%', padding: 18 }}>
            {selectedDestination && (
              <ScrollView>
                <Image source={{ uri: selectedDestination.image }} style={{ width: '100%', height: 180, borderRadius: 16, marginBottom: 12 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#222', marginBottom: 4 }}>{selectedDestination.name}</Text>
                <Text style={{ color: '#888', marginBottom: 8 }}>{selectedDestination.state}</Text>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginBottom: 6 }}>Highlights</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
                  {selectedDestination.highlights.map((h: string) => (
                    <View key={h} style={{ backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 6, marginBottom: 4, elevation: 1 }}>
                      <Text style={{ color: '#FF5722', fontSize: 12 }}>{h}</Text>
                    </View>
                  ))}
                </View>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginBottom: 6 }}>Where to Stay</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                  {selectedDestination.stays.map((stay: any) => (
                    <Widget
                      key={stay.name}
                      icon="hotel"
                      title={stay.name}
                      subtitle={`${stay.type} • ${stay.price}`}
                      onPress={stay.link ? () => Linking.openURL(stay.link) : undefined}
                    />
                  ))}
                </ScrollView>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginTop: 10, marginBottom: 6 }}>Where to Eat</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                  {selectedDestination.food.map((food: any) => (
                    <Widget
                      key={food.name}
                      icon="restaurant"
                      title={food.name}
                      subtitle={`${food.type} • ${food.price}`}
                    />
                  ))}
                </ScrollView>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginTop: 10, marginBottom: 6 }}>Where to Take a Break</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                  {selectedDestination.breaks.map((b: any) => (
                    <Widget
                      key={b.name}
                      icon="local-cafe"
                      title={b.name}
                      subtitle={b.type}
                    />
                  ))}
                </ScrollView>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginTop: 10, marginBottom: 6 }}>Travel Tips</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                  {selectedDestination.tips.map((tip: string, idx: number) => (
                    <Widget
                      key={idx}
                      icon="info"
                      title={tip}
                    />
                  ))}
                </ScrollView>
                <Text style={{ fontWeight: 'bold', color: '#FF5722', marginTop: 10 }}>Average Daily Cost</Text>
                <Text style={{ color: '#333', fontWeight: 'bold', marginBottom: 8 }}>{selectedDestination.avgCost}</Text>
                <Text style={{ fontWeight: 'bold', color: '#FF5722' }}>Best Time to Visit</Text>
                <Text style={{ color: '#333', fontWeight: 'bold', marginBottom: 8 }}>{selectedDestination.bestTime}</Text>
                <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'center', marginTop: 16, backgroundColor: '#FF5722', borderRadius: 20, paddingHorizontal: 24, paddingVertical: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F3',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    color: '#222',
    fontWeight: '600',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 24,
    marginBottom: 12,
  },
  categoriesContainer: {
    marginLeft: 24,
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
  destinationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationImage: {
    width: '100%',
    height: 120,
  },
  destinationInfo: {
    padding: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen; 