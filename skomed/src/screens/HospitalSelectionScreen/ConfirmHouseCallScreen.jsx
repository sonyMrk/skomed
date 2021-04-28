import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, Alert, ScrollView } from "react-native";

import { AppBoldText } from "../../components/ui/AppBoldText";
import { THEME } from "../../theme";
import { AppTextInput } from "../../components/ui/AppTextInput";
import { AppButton } from "../../components/ui/AppButton";
import { AppText } from "../../components/ui/AppText";
import { defaultFormatDate } from "../../utils/formatDate";

export const ConfirmHouseCallScreen = ({ navigation, route }) => {
  const iin = route.params.iin;
  const organization = route.params.organization;
  const profilePhone = route.params.profilePhone;

  const [phone, setPhone] = useState(profilePhone);
  const [reason, setReason] = useState("");


  const callDoctor = () => {
    
      console.log({
        IIN: iin,
        OrgID: organization.OrgID,
        PhoneNumber: phone,
        Reason: reason,
        RecordingMethod: 1,
        Language: 1,
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppBoldText style={styles.title}>Вызов врача на дом</AppBoldText>
        </View>
        <View style={styles.date}>
          <AppText>Дата вызова</AppText>
          <AppText>{defaultFormatDate(new Date())}</AppText>
        </View>
        <View style={styles.info}>
          <AppBoldText
            style={{ color: THEME.DANGER_COLOR, textAlign: "center" }}
          >
            Внимание! Обязательно укажите корректый номер телефона, по которому
            доктор сможет связаться с пациентом и подтвердить свой визит.
          </AppBoldText>
        </View>
        <View style={styles.input}>
          <AppBoldText style={{ textAlign: "center" }}>
            Телефон пациента
          </AppBoldText>
          <AppTextInput
            placeholder="Телефон пациента"
            value={phone}
            onChange={setPhone}
            type="numeric"
            style={{ marginTop: 10 }}
          />
        </View>
        <View style={styles.input}>
          <AppBoldText style={{ textAlign: "center" }}>
            Причина вызова
          </AppBoldText>
          <AppTextInput
            placeholder="Причина вызова"
            value={reason}
            onChange={setReason}
            multiline={true}
            numberOfLines={4}
            autoCapitalize="sentences"
            style={{ height: 90, marginTop: 10 }}
          />
        </View>
        <AppButton onPress={callDoctor}>Вызвать врача</AppButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    paddingVertical: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  date: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
});
