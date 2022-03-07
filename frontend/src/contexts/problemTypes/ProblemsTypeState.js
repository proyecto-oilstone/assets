import React, { useReducer } from "react";
import { ADD_PROBLEM_TYPE, SET_PROBLEM_TYPE, DELETE_PROBLEM_TYPE } from "../types";
import ProblemsTypeReducer from "./ProblemsTypeReducer";
import ProblemsTypeContext from "./ProblemsTypeContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const ProblemsTypeState = (props) => {
  const { children } = props;
  const initialState = {
    problemsTypes: [],
  };

  const [state, dispatch] = useReducer(ProblemsTypeReducer, initialState);

  /**
   * Create one @ProblemType
   * @param {ProblemType} problemType 
   * @returns {ProblemType} created
   */
  const createProblemType = async (problemType) => {
    let response = await axios.post("/problems-types", problemType);
    problemType = response.data;
    dispatch({
      type: ADD_PROBLEM_TYPE,
      payload: problemType,
    });
    return problemType;
  };

  /**
   * Get all @ProblemType
   * @returns {Array} of @ProblemType
   */
  const getProblemsTypes = async () => {
    const response = await axios.get("/problems-types");
    const problemTypes = responseToArray(response.data);
    dispatch({
      type: SET_PROBLEM_TYPE,
      payload: problemTypes,
    });
    return problemTypes;
  };

  /**
   * Edit one @ProblemType
   * @param {ProblemType} problemType to edit
   * @returns {ProblemType} edited
   */
  const editProblemType = async (problemType) => {
    const response = await axios.put(`/problems-types/${problemType.id}`, problemType);
    const editedProblemType = response.data;
    let newProblemsTypes = JSON.parse(JSON.stringify(state.problemsTypes));
    newProblemsTypes = newProblemsTypes.map(problemType => {
      if (problemType.id === editedProblemType.id) {
        return editedProblemType;
      } else {
        return problemType;
      }
    })
    dispatch({
      type: SET_PROBLEM_TYPE,
      payload: newProblemsTypes,
    });
    return editedProblemType;
  }

  /**
   * Delete one @ProblemType
   * @param {ProblemType} problemTypeId id of the problem to delete
   * @throws Alert if can not delete the problem type
   */
  const deleteProblemType = async (problemTypeId) => {
    try {
      await axios.delete(`/problems-types/${problemTypeId}`);
      dispatch({
        type: DELETE_PROBLEM_TYPE,
        payload: problemTypeId,
      });
    } catch (e) {
      alert("No se puede eliminar este tipo de problema porque fue asignado a uno o mas reporte de problemas");
    }
  }

  return (
    <ProblemsTypeContext.Provider
      value={{
        problemsTypes: state.problemsTypes,
        createProblemType,
        getProblemsTypes,
        editProblemType,
        deleteProblemType,
      }}
    >
      {children}
    </ProblemsTypeContext.Provider>
  );
};

export default ProblemsTypeState;
