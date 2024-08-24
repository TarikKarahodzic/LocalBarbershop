import { Text, View, StyleSheet, Image } from 'react-native';

const ProductListItem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.name}</Text>
    </View>
  );
} // This bit makes a skelet for some part of the screen
  // or a whole part. For example ill use this for the barbers section on the app
  // Can make another one for top part (services) and bottom part (products)

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});
