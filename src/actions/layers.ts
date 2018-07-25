import {
    ADD_LAYER,
    TOGGLE_LAYER
} from '../constants/layer';

export const addLayer = (layer: any) => (dispatch: any) => {
    dispatch({
        type: ADD_LAYER,
        payload: {...layer, active: true}
    });     
}

export const toggleLayer = (id: string) =>({
    type: TOGGLE_LAYER,
    payload: {id}
});