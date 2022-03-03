import React, { useReducer } from "react";
import { ADD_RESOLUTION_TYPE, SET_RESOLUTION_TYPE, DELETE_RESOLUTION_TYPE } from "../types";
import ResolutionsTypeReducer from "./ResolutionsTypeReducer";
import ResolutionsTypeContext from "./ResolutionsTypeContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const ResolutionsTypeState = (props) => {
  const { children } = props;
  const initialState = {
    resolutionsTypes: [],
  };

  const [state, dispatch] = useReducer(ResolutionsTypeReducer, initialState);

  /**
   * Create one @ResolutionType
   * @param {ResolutionType} resolutionType 
   * @returns {ResolutionType} created
   */
  const createResolutionType = async (resolutionType) => {
    let response = await axios.post("/resolutions-types", resolutionType);
    resolutionType = response.data;
    dispatch({
      type: ADD_RESOLUTION_TYPE,
      payload: resolutionType,
    });
    return resolutionType;
  };

  /**
   * Get all @ResolutionType
   * @returns {Array} of @ResolutionType
   */
  const getResolutionsTypes = async () => {
    const response = await axios.get("/resolutions-types");
    const resolutionTypes = responseToArray(response.data);
    dispatch({
      type: SET_RESOLUTION_TYPE,
      payload: resolutionTypes,
    });
    return resolutionTypes;
  };

  /**
   * Edit one @ResolutionType
   * @param {ResolutionType} resolutionType to edit
   * @returns {ResolutionType} edited
   */
  const editResolutionType = async (resolutionType) => {
    const response = await axios.put(`/resolutions-types/${resolutionType.id}`, resolutionType);
    const editedResolutionType = response.data;
    let newResolutionTypes = JSON.parse(JSON.stringify(state.resolutionsTypes));
    newResolutionTypes = newResolutionTypes.map(resolutionType => {
      if (resolutionType.id === editedResolutionType.id) {
        return editedResolutionType;
      } else {
        return resolutionType;
      }
    })
    dispatch({
      type: SET_RESOLUTION_TYPE,
      payload: newResolutionTypes,
    });
    return editedResolutionType;
  }

  /**
   * Delete one @ResolutionType
   * @param {ResolutionType} resolutionTypeId id of the resolution type to delete
   * @throws Alert if can not delete the resolution type
   */
  const deleteResolutionType = async (resolutionTypeId) => {
    try {
      await axios.delete(`/resolutions-types/${resolutionTypeId}`);
      dispatch({
        type: DELETE_RESOLUTION_TYPE,
        payload: resolutionTypeId,
      });
    } catch (e) {
      alert("No se puede eliminar este tipo de resolucion porque fue asignado a uno o mas eventos de reparacion de problemas");
    }
  }

  return (
    <ResolutionsTypeContext.Provider
      value={{
        resolutionsTypes: state.resolutionsTypes,
        createResolutionType,
        getResolutionsTypes,
        editResolutionType,
        deleteResolutionType,
      }}
    >
      {children}
    </ResolutionsTypeContext.Provider>
  );
};

export default ResolutionsTypeState;
