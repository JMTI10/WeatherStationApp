import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6", // Soft background
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#111827",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
    date: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 8,
    },
    temp: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1F2937",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: "#6B7280",
    },
    errorText: {
        fontSize: 18,
        color: "#EF4444",
        fontWeight: "bold",
    },
});
