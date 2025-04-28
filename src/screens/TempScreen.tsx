import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, Dimensions } from "react-native";
import { db } from "../services/firebaseconfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { styles } from "./TempScreen.styles";
import { LineChart } from "react-native-chart-kit";

export default function TempScreen() {
  const [temperatures, setTemperatures] = useState<any[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "temperatures"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temps: any[] = [];
      const values: number[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        temps.push({ ...data, id: doc.id });
        values.push(data.value);
      });
      setTemperatures(temps);
      setChartData(values);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
        {item.timestamp?.seconds
          ? new Date(item.timestamp.seconds * 1000).toLocaleString()
          : "No Time"}
      </Text>
      <Text style={styles.temp}>{item.value}°C</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🌡️ Temperature Readings</Text>

      <LineChart
        data={{
          labels: [], // can add time labels later
          datasets: [
            {
              data: chartData,
            },
          ],
        }}
        width={Dimensions.get("window").width - 30}
        height={220}
        yAxisSuffix="°C"
        chartConfig={{
          backgroundColor: "#f3f4f6",
          backgroundGradientFrom: "#f3f4f6",
          backgroundGradientTo: "#f3f4f6",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#3B82F6",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      <FlatList
        data={temperatures}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
}
