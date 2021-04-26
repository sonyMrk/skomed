import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SET_USER_DATA,
  SET_USER_FAMILY,
  ADD_PERSON_FAMILY,
  EDIT_PERSON_FAMILY,
  REMOVE_PERSON_FAMILY,
  SET_USER_IIN,
  SET_USER_LOADING,
  SET_USER_PROFILE,
  SET_ERROR,
} from "../types";
import { userApi } from "../../services/userApi";

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const setUserProfile = (payload) => ({
  type: SET_USER_PROFILE,
  payload,
});

export const setUserFamily = (payload) => ({
  type: SET_USER_FAMILY,
  payload,
});

export const addPersonFamily = (payload) => ({
  type: ADD_PERSON_FAMILY,
  payload,
});

export const editPersonFamily = (payload) => ({
  type: EDIT_PERSON_FAMILY,
  payload,
});

export const removePersonFamily = (payload) => ({
  type: REMOVE_PERSON_FAMILY,
  payload,
});

export const setUserIin = (payload) => ({
  type: SET_USER_IIN,
  payload,
});

export const setUserLoading = (payload) => ({
  type: SET_USER_LOADING,
  payload,
});

export const setUserError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const createUserProfile = (userData) => async (dispatch) => {
  
  try {
    setUserLoading(true);
    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({ ...userData, family: [] })
    );
    dispatch(loadUserProfile());
  } catch (error) {
    dispatch(setUserError("Ошибка при создании пользователя"));
    console.log(error);
  } finally {
    setUserLoading(false);
  }
};

export const loadUserProfile = () => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");
    if (userProfile) {
      dispatch(setUserProfile(JSON.parse(userProfile)));
      dispatch(loadUserData(JSON.parse(userProfile).iin));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log(error);
  }
};

export const loadUserData = (iin) => async (dispatch) => {
  try {
    setUserLoading(true); // TODO: не переключается
    const userData = await userApi.GetPatientByIIN(iin);
    dispatch(setUserData(userData));
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log(error);
  } finally {
    setUserLoading(false);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("profile");
    dispatch(setUserProfile(null));
    dispatch(setUserData(null));
    dispatch(setUserError(null));
  } catch (error) {
      console.log(error)
  }
};
