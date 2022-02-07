import { ADD_SECTOR, SET_SECTORS, SELECT_SECTOR, DELETE_SECTOR } from "../types";

const SectorReducer = (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case ADD_SECTOR:
            return {
                ...state,
                sectors: [...state.sectors, payload],
            };
        case SET_SECTORS:
            return {
                ...state,
                sectors: payload,
            };
        case SELECT_SECTOR:
            return {
                ...state,
                selectedSector: payload,
            };
        case DELETE_SECTOR:
            return {
                ...state,
                sectors: state.sectors.filter((sector) => sector.id !== payload),
            };
        default:
            return state;
    }
}

export default SectorReducer