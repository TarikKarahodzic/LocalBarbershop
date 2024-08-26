import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="/(admin)/menu/addBarber">
          <View style={styles.box}>
            <Text style={styles.boxText}>Add barber</Text>
          </View>
        </Link>
        <Link href="/(admin)/menu/addService">
          <View style={styles.box}>
            <Text style={styles.boxText}>Add service</Text>
          </View>
        </Link>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 4</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', // White background
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Space between rows
  },
  box: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light grey background for the boxes
    padding: 20,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Shadow for Android
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Darker text for contrast
  },
});
