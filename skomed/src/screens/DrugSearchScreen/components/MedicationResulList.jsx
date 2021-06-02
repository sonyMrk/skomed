import React, { useMemo, memo, useState, useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import newId from "../../../utils/newId";
import { MedicationItem } from "./MedicationItem";
import { normalize } from "./../../../utils/normalizeFontSize";
import { MedicationSorting } from "./MedicationSorting";

const renderItem = ({ item }) => {
  return <MedicationItem item={item} key={newId()} />;
};

function makeCaching(f) {
  var cache = {};

  return function (medicationsList, sortBy) {
    console.log(`${sortBy.field}_${sortBy.reverse}`);
    if (!cache[`${sortBy.field}_${sortBy.reverse}`]) {
      cache[`${sortBy.field}_${sortBy.reverse}`] = f.call(
        this,
        medicationsList,
        sortBy
      );
    }
    return cache[`${sortBy.field}_${sortBy.reverse}`];
  };
}

const sortingList = (list, sortBy) => {
  let sortedList;

  if (sortBy.field === "price") {
    sortedList = list.sort((a, b) => a[sortBy.field] - b[sortBy.field]);
  } else {
    sortedList = list.sort((a, b) =>
      a[sortBy.field].localeCompare(b[sortBy.field])
    );
  }

  if (sortBy.reverse) {
    return sortedList.reverse();
  }

  return sortedList;
};

const getSortedList = makeCaching(sortingList);

const renderResultList = ({ medicationsList }) => {
  const [sortBy, setSortBy] = useState({
    field: "apteka",
    reverse: false,
  });

  const flatList = useRef(null);

  const memoizedRenderItem = useMemo(() => renderItem, [medicationsList]);

  // const sortedList = useMemo(() => getSortedList(medicationsList, sortBy), [
  //   sortBy,
  // ]);

  const sortedList = useMemo(() => getSortedList(medicationsList, sortBy), [
    sortBy,
  ]);

  const handleSelectSortBy = (sortBy) => {
    setSortBy(sortBy);
    flatList.current.scrollToIndex({
      animated: true,
      index: 0,
      viewPosition: 0,
    });
  };

  console.log(sortedList?.length);
  return (
    <>
      <MedicationSorting setSortBy={handleSelectSortBy} sortBy={sortBy} />
      <View style={styles.result__list}>
        {sortedList && (
          <FlatList
            ref={flatList}
            data={sortedList}
            renderItem={memoizedRenderItem}
            initialNumToRender={15}
            keyExtractor={(item, index) => `${index}` + `${newId()}`}
            style={styles.flatlist}
            maxToRenderPerBatch={15}
            getItemLayout={(data, index) => ({
              length: normalize(60),
              offset: normalize(60) * index,
              index,
            })}
          />
        )}
      </View>
    </>
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
  separator: {
    height: 2,
    backgroundColor: "#000",
  },
});

export default memo(renderResultList);

// export default renderResultList;
