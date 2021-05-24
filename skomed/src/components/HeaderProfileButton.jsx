import React from "react";
import { TouchableOpacity } from "react-native";

import Person from "../../assets/icons/person.svg";

export const HeaderProfileButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ width: 35, height: 35 }} onPress={onPress}>
      <Person width="100%" height="100%" />
    </TouchableOpacity>
  );
};
