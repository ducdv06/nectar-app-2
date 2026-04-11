// screens/FilterModal.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FilterModal({ 
  visible, 
  onClose, 
  onApply,
  selectedCategories = [],
  selectedBrands = [],
  onToggleCategory,
  onToggleBrand,
  onReset
}) {
  const categories = ["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"];
  const brands = ["Individual Collection", "Cocola", "Ifad", "Kazi Farmas"];

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleReset = () => {
    if (onReset) onReset();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={styles.option}
                onPress={() => onToggleCategory(cat)}
              >
                <View style={styles.checkbox}>
                  {selectedCategories.includes(cat) && (
                    <Ionicons name="checkmark" size={16} color="green" />
                  )}
                </View>
                <Text style={styles.optionText}>{cat}</Text>
              </TouchableOpacity>
            ))}

            {/* Brand */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Brand</Text>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={styles.option}
                onPress={() => onToggleBrand(brand)}
              >
                <View style={styles.checkbox}>
                  {selectedBrands.includes(brand) && (
                    <Ionicons name="checkmark" size={16} color="green" />
                  )}
                </View>
                <Text style={styles.optionText}>{brand}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Apply Button */}
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resetText: {
    fontSize: 14,
    color: "red",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 6,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "green",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});