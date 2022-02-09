import React, { useReducer } from "react";
import { ADD_SECTOR, SET_SECTORS, SELECT_SECTOR, DELETE_SECTOR } from "../types";
import SectorReducer from "./SectorReducer";
import SectorContext from "./SectorContext";
import axios from "../../helpers/axios";
import { responseToArray } from "../../helpers/utils";

const SectorState = (props) => {
    const { children } = props;
    const initialState = {
        sectors: [],
        selectedSector: null,
    };

    const [state, dispatch] = useReducer(SectorReducer, initialState);

    const createSector = async (sector) => {
        let response = await axios.post("/sector/sector", sector);
        sector = response.data.sector;
        dispatch({ type: ADD_SECTOR, payload: sector });
        return sector
    };


    const getSectors = async () => {
        const response = await axios.get("/sector/sector");
        const sectors = responseToArray(response.data);
        dispatch({ type: SET_SECTORS, payload: sectors });
        return sectors;
    };

    const editSector = async (sector) => {
        const response = await axios.put(`/sector/sector/${sector.id}`, sector);
        const editedSector = response.data
        let newSectors = JSON.parse(JSON.stringify(state.sectors));
        newSectors = newSectors.map((sector) => {
            if(sector.id === editedSector.id){
                return editedSector
            } else {
                return sector
            }

    })
        dispatch({ type: SET_SECTORS, payload: newSectors });
        return editedSector;

    }

    const selectSector = (sector) => {
        dispatch({ type: SELECT_SECTOR, payload: sector });
    };

    const getSectorById = async (id) => {
        const response = await axios.get(`/sector/sector/${id}`);
        const sector = response.data;
        selectSector(sector);
        return sector;
    };

    const deleteSector = async (id) => {
        try{
            await axios.delete(`/sector/sector/${id}`);
            dispatch({ type: DELETE_SECTOR, payload: id });

        }catch(e){
            alert("No se puede eliminar sector porque esta asignado a un vehiculo")
        }
    };

    return (
        <SectorContext.Provider
            value={{
                sectors: state.sectors,
                selectedSector: state.selectedSector,
                createSector,
                getSectors,
                editSector,
                deleteSector,
                getSectorById,
            }}>
            {children}
            </SectorContext.Provider>
    );



};

export default SectorState
