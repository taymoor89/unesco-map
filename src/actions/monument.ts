import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';
import { addLayer } from '../actions/layers';
import * as parks from '../data/parks.json';
import * as monuments from '../data/monuments.json';
import * as castles from '../data/castles.json';

export const setMonuments = (data: any) => ({
  type: SET_MONUMENTS,
  payload: data
});

const setPhotos = (id: string) => ({
  type: SET_PHOTOS,
  id
});

export const getMonuments = () => (dispatch: any) => (
  new Promise((resolve) => {
    resolve()
  })
  .then(() => dispatch(setMonuments(parks)))
  .then(() => dispatch(setMonuments(monuments)))
  .then(() => dispatch(setMonuments(castles)))
  .then(() => dispatch(addLayer(parks)))
  .then(() => dispatch(addLayer(monuments)))
  .then(() => dispatch(addLayer(castles)))  
);

export const fetchMonument = (layerId: string, id: string) => (dispatch: any) => (
  new Promise((resolve) => {
    resolve()
  }).then(() => dispatch(setPhotos(id)))
)
