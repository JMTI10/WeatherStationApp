import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { db } from "../services/firebaseconfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function TempScreen() {
  const [temperatures, setTemperatures] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "temperatures"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temps: any[] = [];
      querySnapshot.forEach((doc) => {
        temps.push({ ...doc.data(), id: doc.id });
      });
      setTemperatures(temps);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Temperature Readings
      </Text>
      <FlatList
        data={temperatures}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>
            {new Date(item.timestamp.seconds * 1000).toLocaleString()} -{" "}
            {item.value}°C
          </Text>
        )}
      />
    </View>
  );
}
