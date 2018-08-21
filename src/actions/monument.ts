import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';
import { addLayer } from '../actions/layers';
import * as places from '../data/places.json';
import * as hotels from '../data/hotels.json';
import * as tours from '../data/tours.json';

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
  .then(() => dispatch(setMonuments(places)))
  .then(() => dispatch(setMonuments(hotels)))
  .then(() => dispatch(setMonuments(tours)))
  .then(() => dispatch(addLayer(places)))  
  .then(() => dispatch(addLayer(hotels)))
  .then(() => dispatch(addLayer(tours)))  
);

export const fetchMonument = (layerId: string, id: string) => (dispatch: any) => (
  new Promise((resolve) => {
    resolve()
  }).then(() => dispatch(setPhotos(id)))
)
