import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import AddDishScreen from './screens/AddDishScreen';

// MenuItem interface
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  image?: string;
}

type Screen = 'splash' | 'home' | 'addDish';

// Initial dishes to display on startup
const INITIAL_DISHES: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce and herbs',
    course: 'Dinner',
    price: 185.00,
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800',
  },
  {
    id: '2',
    name: 'Eggs Benedict',
    description: 'Poached eggs on English muffin with hollandaise sauce',
    course: 'Breakfast',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=800',
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan, croutons and Caesar dressing',
    course: 'Lunch',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    course: 'Dessert',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800',
  },
  {
    id: '5',
    name: 'French Toast',
    description: 'Classic French toast with maple syrup, berries and whipped cream',
    course: 'Breakfast',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
  },
  {
    id: '6',
    name: 'Beef Steak',
    description: 'Prime ribeye steak with garlic butter and roasted vegetables',
    course: 'Dinner',
    price: 225.00,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
  },
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_DISHES);

  // Handle splash screen finish
  const handleSplashFinish = () => {
    setCurrentScreen('home');
  };

  // Navigate to Add Dish screen
  const navigateToAddDish = () => {
    setCurrentScreen('addDish');
  };

  // Navigate back to Home screen
  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  // Add a new menu item
  const addMenuItem = (name: string, description: string, course: string, price: number, imageUrl?: string) => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
      image: imageUrl,
    };

    setMenuItems([...menuItems, newItem]);
  };

  // Delete a menu item
  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'home':
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );
      case 'addDish':
        return (
          <AddDishScreen
            onAddDish={addMenuItem}
            onCancel={navigateToHome}
          />
        );
      default:
        return (
          <HomeScreen
            menuItems={menuItems}
            onAddPress={navigateToAddDish}
            onDeleteItem={deleteMenuItem}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;