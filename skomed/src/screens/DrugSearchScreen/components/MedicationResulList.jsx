import React, { useMemo, memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import newId from "../../../utils/newId";
import { MedicationItem } from "./MedicationItem";
import { normalize } from "./../../../utils/normalizeFontSize";

const renderItem = ({ item }) => {
  return <MedicationItem item={item} />;
};

const renderResultList = ({ medicationsList }) => {
  const memoizedRenderItem = useMemo(() => renderItem, [medicationsList]);

  return (
    <View style={styles.result__list}>
      {medicationsList && (
        <FlatList
          data={medicationsList}
          renderItem={memoizedRenderItem}
          initialNumToRender={5}
          keyExtractor={(item, index) => `${index}` + `${newId()}`}
          style={styles.flatlist}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  result__list: {
    padding: 15,
    flex: 1,
  },
  flatlist: {
    flex: 1,
    marginVertical: normalize(10),
    padding: 10,
  },
});

export default memo(renderResultList);
