import React, { useReducer } from "react";
import { ADD_GARAGE, DELETE_GARAGE, SET_GARAGES, SELECT_GARAGE } from "../types";
import GaragesReducer from "./GaragesReducer";
import GaragesContext from "./GaragesContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const GaragesState = (props) => {
const { children } = props;
const initialState = {
    garages: [],
    selectedGarage: null,
};

const [state, dispatch] = useReducer(GaragesReducer, initialState);

const createGarage = async (garage) => {
    let response = await axios.post("/garage/garages", garage);
    garage = response.data;
    dispatch({
        type: ADD_GARAGE,
        payload: garage,
    });
    return garage;

}

const getGarages = async () => {
    const response = await axios.get("/garage/garages");
    const garages = responseToArray(response.data);
    dispatch({
        type: SET_GARAGES,
        payload: garages,
    });
    return garages;
}

const editGarage = async (garage) => {
    const response = await axios.put(`/garage/garages/${garage.id}`, garage);
    const editedGarage = response.data;
    let newGarages = JSON.parse(JSON.stringify(state.garages));
    newGarages = newGarages.map(garage => {
        if (garage.id === editedGarage.id) {
            return editedGarage;
        } else {
            return garage;
        }
    })
    dispatch({
        type: SET_GARAGES,
        payload: newGarages,
    });
    return editedGarage;
}

const deleteGarage = async (garageId) => {
    try {
        await axios.delete(`/garage/garages/${garageId}`);
        dispatch({
            type: DELETE_GARAGE,
            payload: garageId,
        });
    } catch (error) {
        alert(error);
    }
}

const selectGarage = (garage) => {
    dispatch({
        type: SELECT_GARAGE,
        payload: garage,
    });
}

const getGarageById = async (garageId) => {
    let garage = state.garages.find(garage => garage.id === garageId);
    if(!garage){
        const response = await axios.get(`/garage/garages/${garageId}`);
        garage = response.data;
    }

    selectGarage(garage);
    return garage
}

return(
    <GaragesContext.Provider
        value={{
            garages: state.garages,
            selectedGarage: state.selectedGarage,
            createGarage,
            getGarages,
            editGarage,
            deleteGarage,
            selectGarage,
            getGarageById,
        }}
        >
        {children}
        </GaragesContext.Provider>
)


}

export default GaragesState;