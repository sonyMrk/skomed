import AsyncStorage from "@react-native-async-storage/async-storage";
import newId from "../../utils/newId"

import {
  SET_USER_DATA,
  SET_USER_LOADING,
  SET_USER_PROFILE,
  SET_ERROR,
} from "../types";

import { userApi } from "../../services/userApi";
import { setInitApp } from "./app";

export const setUserData = (payload) => ({
  type: SET_USER_DATA,
  payload,
});

export const setUserProfile = (payload) => ({
  type: SET_USER_PROFILE,
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

const getProfile = async () => {
  const userData = await AsyncStorage.getItem("profile");
  return JSON.parse(userData);
}

const setProfile = async (profile, dispatch) => {
  await AsyncStorage.setItem(
    "profile",
    JSON.stringify(profile)
  );
  dispatch(setUserProfile(profile))
}

// создание профиля в ЛОКАЛЬНОМ ХРАНИЛИЩЕ
export const createUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    await AsyncStorage.setItem(
      "profile",
      JSON.stringify({ ...userData, family: [] })
    );
    dispatch(loadUserProfile());
  } catch (error) {
    dispatch(setUserError("Ошибка при создании пользователя"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// загрузка ВСЕГО ПРОФИЛЯ
export const loadUserProfile = () => async (dispatch) => {
  try {
    const userProfile = await AsyncStorage.getItem("profile");
    if (userProfile) {
      dispatch(setUserProfile(JSON.parse(userProfile)));
      dispatch(loadUserData(JSON.parse(userProfile).iin));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log("loadUserProfile", error);
  } finally {
    dispatch(setInitApp())
  }
};

// загрузка данных с сервера 
export const loadUserData = (iin) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userData = await userApi.GetPatientByIIN(iin);
    dispatch(setUserData(userData));
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log("loadUserData", error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// создание члена семьи В ЛОКАЛЬНОМ ХРАНИЛИЩЕ
export const createFamilyPerson = (personData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userProfile = await getProfile()
    const updateProfile = {
      ...userProfile,
      family: [...userProfile.family, {...personData, id: newId() }],
    }
    await setProfile(updateProfile, dispatch)
  } catch (error) {
    dispatch(setUserError("Ошибка при создании члена семьи"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// редактирование члена семьи В ЛОКАЛЬНОМ ХРАНИЛИЩЕ
export const editFamilyPerson = (personData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userProfile = await getProfile()
    const updateProfile = {
      ...userProfile,
      family: userProfile.family.map((person) => {
        if (person.id === personData.id) {
          return personData
        }
        return person
      }),
    }
    await setProfile(updateProfile, dispatch)
  } catch (error) {
    dispatch(setUserError("Ошибка при редактировании члена семьи"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// удаление члена семьи ИЗ ЛОКАЛЬНОГО ХРАНИЛИЩА

export const removeFamilyPerson = (id) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userProfile = await getProfile();
    const updateProfile = {
      ...userProfile,
      family: userProfile.family.filter((person) => person.id !== id),
    }
    await setProfile(updateProfile, dispatch)
  } catch (error) {
    dispatch(setUserError("Ошибка при удалении члена семьи"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

//выход из учетной записи
export const logout = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("profile");
    dispatch(setUserProfile(null));
    dispatch(setUserData(null));
    dispatch(setUserError(null));
  } catch (error) {
    console.log(error);
  }
};
