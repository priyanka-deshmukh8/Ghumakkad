import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Dimensions,
  FlatList,
  Animated,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Discover Hidden Gems',
    description: 'Explore offbeat destinations and local experiences across India',
    image: require('../assets/leh-laddakh.jpg'),
    icon: 'compass-outline'
  },
  {
    id: '2',
    title: 'Plan Your Journey',
    description: 'Create personalized itineraries and get local insights',
    image: require('../assets/download.jpeg'),
    icon: 'map-outline'
  },
  {
    id: '3',
    title: 'Connect with Travelers',
    description: 'Share experiences and connect with fellow travelers',
    image: require('../assets/download.jpeg'),
    icon: 'people-outline'
  }
];

type WelcomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Welcome'>;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login');
    }
  };

  const Paginator = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
              key={index}
            />
          );
        })}
      </View>
    );
  };

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.slideImage} />
        <View style={styles.slideContent}>
          <Icon name={item.icon} size={60} color="#FF5722" style={styles.slideIcon} />
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <Paginator />

      <View style={styles.footer}>
        {currentIndex === onboardingData.length - 1 ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Login')}
          >
              <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => navigation.navigate('Register')}
          >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.socialLoginContainer}>
              <Text style={styles.socialLoginText}>Or continue with</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-google" size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="logo-apple" size={24} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={scrollTo}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    height: height * 0.7,
  },
  slideImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  slideIcon: {
    marginBottom: 20,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  slideDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5722',
    marginHorizontal: 4,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#FF5722',
  },
  skipButton: {
    alignItems: 'center',
    padding: 10,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
  socialLoginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  socialLoginText: {
    color: '#666',
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default WelcomeScreen; 