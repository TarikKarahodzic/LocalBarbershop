import { Text, ScrollView, FlatList } from 'react-native';
import barbers from '@/assets/data/barbers';
import services from '@/assets/data/services'
import BarberListItem from '@/src/components/BarberListItem';
import ServiceListItem from '@/src/components/ServiceListItem';

export default function TabOneScreen() {
  return (
    <ScrollView>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Our Barbers</Text>

      <FlatList
        data={barbers}
        renderItem={({ item }) => <BarberListItem barber={item} />}
        ListHeaderComponent={() => (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Products</Text>
            <FlatList
              data={services}
              renderItem={({ item }) => <ServiceListItem service={item} />}
            />
          </>
        )}
      />
    </ScrollView>
  );
}