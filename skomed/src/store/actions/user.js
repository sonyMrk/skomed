import AsyncStorage from "@react-native-async-storage/async-storage";
import newId from "../../utils/newId";

import {
  SET_USER_DATA,
  SET_USER_LOADING,
  SET_USER_PROFILE,
  SET_USER_ERROR,
  SET_SICK_LIST_INFO,
  CLEAR_SICK_LIST_INFO,
  CLEAR_USER_ERROR,
  SET_MEDICAL_DOC_TYPES,
  SET_AUTH_REQUEST,
  CLEAR_AUTH_REQUEST,
  SET_VISIBLE_CONFIRM_CODE_FIELD,
  SET_SICK_LIST_ERROR,
  CLEAR_SICK_LIST_ERROR,
  SET_USER_FAMILY,
} from "../types";

import { userApi } from "../../services/userApi";
import { setInitApp, updateSubscriberData } from "./app";

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

export const setUserLoading = (payload) => ({
  type: SET_USER_LOADING,
  payload,
});

export const setUserError = (payload) => ({
  type: SET_USER_ERROR,
  payload,
});

export const clearUserError = () => ({
  type: CLEAR_USER_ERROR,
});

export const setSickListInfo = (payload) => ({
  type: SET_SICK_LIST_INFO,
  payload,
});

export const clearSickListInfo = () => ({
  type: CLEAR_SICK_LIST_INFO,
});

export const setMedicalDoctypes = (payload) => ({
  type: SET_MEDICAL_DOC_TYPES,
  payload,
});

export const setAuthRequest = (payload) => ({
  type: SET_AUTH_REQUEST,
  payload,
});

export const clearAuthRequest = () => ({
  type: CLEAR_AUTH_REQUEST,
});

export const setIsVisibleConfirmCode = (payload) => ({
  type: SET_VISIBLE_CONFIRM_CODE_FIELD,
  payload,
});

export const setSickListError = (payload) => ({
  type: SET_SICK_LIST_ERROR,
  payload,
});

export const clearSickListError = () => ({
  type: CLEAR_SICK_LIST_ERROR,
});

export const GetMedicalDocInfo = (orgId, listNumber, docType = 1) => async (
  dispatch
) => {
  try {
    dispatch(setUserLoading(true));
    const sickListData = await userApi.GetMedicalDocInfo(
      orgId,
      listNumber,
      docType
    );
    if (sickListData.ErrorCode !== 0) {
      dispatch(setSickListError(sickListData.ErrorDesc));
    } else {
      dispatch(setSickListInfo(sickListData));
    }
  } catch (error) {
    console.log(error);
    dispatch(setSickListError("Ошибка при загрузке данных о больничном листе"));
  } finally {
    dispatch(setUserLoading(false));
  }
};

export const getMedicalsDoctypes = () => async (dispatch) => {
  try {
    const medicalsType = await userApi.GetMedicalDocTypes();
    if (medicalsType.ErrorCode !== 0) {
      dispatch(setSickListError(medicalsType.ErrorDesc));
    } else {
      const types = medicalsType.Types.reduce((prev, type) => {
        return [...prev, { label: type.Name, value: type }];
      }, []);

      medicalsType.Types = types;

      dispatch(setMedicalDoctypes(medicalsType));
    }
  } catch (error) {
    console.log(error);
    dispatch(setSickListError("Ошибка при загрузке типов документа"));
  }
};

const getProfile = async () => {
  const userData = await AsyncStorage.getItem("profile");
  return JSON.parse(userData);
};

const setProfile = async (profile, dispatch) => {
  await AsyncStorage.setItem("profile", JSON.stringify(profile));
  dispatch(setUserProfile(profile));
};
const setFamily = async (family, dispatch) => {
  await AsyncStorage.setItem("family", JSON.stringify(family));
  dispatch(setUserFamily(family));
};

// проверка введенных данных пользователя
export const checkAuthFormData = (formData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));

    const authRequest = await userApi.AuthorizationRequest(
      formData.iin,
      formData.phone,
      formData.hasConfirmCode
    );

    if (authRequest.ErrorCode !== 0) {
      dispatch(setUserError(authRequest.ErrorDesc));
    } else {
      dispatch(setIsVisibleConfirmCode(true));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка при проверки данных формы"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// создание профиля в локальном
export const createUserProfile = (formData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userData = await userApi.UserLogin(
      formData.iin,
      formData.phone,
      formData.confirmCode
    );
    if (userData.ErrorCode !== 0) {
      dispatch(setUserError(userData.ErrorDesc));
    } else {
      const subscriberId = AsyncStorage.getItem("subscriberId");
      const profile = {
        ...userData,
        phone: formData.phone,
        iin: formData.iin,
      };
      setProfile(profile, dispatch);
      dispatch(loadUserProfile());
      dispatch(updateSubscriberData(subscriberId));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка при создании профиля"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

// загрузка ПРОФИЛЯ при первой загрузке приложения
export const loadUserProfile = () => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userProfile = await AsyncStorage.getItem("profile");
    if (userProfile) {
      dispatch(setUserProfile(JSON.parse(userProfile)));
      dispatch(loadUserData(JSON.parse(userProfile).iin));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
    dispatch(setInitApp());
  }
};

// Загрузка СЕМЬИ при первой загрузке приложения
export const loadUserFamily = () => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const userFamily = await AsyncStorage.getItem("family");
    if (userFamily) {
      setFamily(JSON.parse(userFamily), dispatch);
    } else {
      setFamily([], dispatch);
    }
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log(error);
  } finally {
    dispatch(setUserLoading(false));
    dispatch(setInitApp());
  }
};

// загрузка данных с сервера по ИИН
export const loadUserData = (iin) => async (dispatch) => {
  try {
    const userData = await userApi.GetPatientByIIN(iin);
    if (userData.ErrorCode !== 0) {
      dispatch(setUserError(userData.ErrorDesc));
      dispatch(setUserData(userData)); // ДЛЯ ТЕСТОВОГО СЕРВАКА
    } else {
      dispatch(setUserData(userData));
    }
  } catch (error) {
    dispatch(setUserError("Ошибка загрузки данных"));
    console.log(error);
  }
};

// создание члена семьи В ЛОКАЛЬНОМ ХРАНИЛИЩЕ
export const createFamilyPerson = (personData) => async (dispatch) => {
  try {
    dispatch(setUserLoading(true));
    const family = await AsyncStorage.getItem("family");
    const updateFamily = [
      ...JSON.parse(family),
      { ...personData, id: newId() },
    ];

    setFamily(updateFamily, dispatch);
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
    const family = await AsyncStorage.getItem("family");
    const updateFamily = JSON.parse(family).map((person) => {
      if (person.id === personData.id) {
        return personData;
      }
      return person;
    });
    setFamily(updateFamily, dispatch);
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
    const family = await AsyncStorage.getItem("family");
    const updateFamily = JSON.parse(family).filter(
      (person) => person.id !== id
    );
    setFamily(updateFamily, dispatch);
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
    dispatch(setIsVisibleConfirmCode(false));
  } catch (error) {
    console.log(error);
  }
};
