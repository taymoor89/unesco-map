import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';
import layer1 from './layer1';
import layer2 from './layer2';
import layer3 from './layer3';
import { addLayer } from '../actions/layers';

/* const api = (endpoint = 'monuments') => `https://unesco-api.balek.io/api/${endpoint}`;

const req = (url: string, method = 'GET', body?: any) => new Request(url, {
  method,
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8'
  }),
  body
}); */

/* const selectedFields = [
  'id',
  'latitude',
  'longitude',
  'site',
  'image_url',
  'category',
  'states',
  'date_inscribed'
];

const buildMonumentsUrl = () => (
  `${api()}?select=${selectedFields.join(',')}` //tslint:disable-line
); */

export const setMonuments = (data: any) => ({
  type: SET_MONUMENTS,
  payload: data
});

// const setPhotos = (data: any, id: string) => ({
const setPhotos = (id: string) => ({
  type: SET_PHOTOS,
  // payload: data,
  id
});

export const getMonuments = () => (dispatch: any) => (
  // fetch(req(buildMonumentsUrl()))
  //   .then(res => res.json())
  //   .then((d) => {
  //     console.log(d);
  //   })
  new Promise((resolve) => {
    resolve()
  })
  .then(() => dispatch(setMonuments(layer1)))
  .then(() => dispatch(setMonuments(layer2)))
  .then(() => dispatch(setMonuments(layer3)))
  .then(() => dispatch(addLayer(layer1)))
  .then(() => dispatch(addLayer(layer2)))
  .then(() => dispatch(addLayer(layer3)))
);

export const fetchMonument = (layerId: string, id: string) => (dispatch: any) => (
  /* Promise.all([
    fetch(req(`${api()}?id=eq.${id}`)).then(res => res.json()),
    fetch(req(`${api('pictures')}?monument_id=eq.${id}`)).then(res => res.json())
  ]).then(([ monument, photos ]: any) => {
    dispatch(setMonuments(monument));
    dispatch(setPhotos(photos, id));
  }) */
  new Promise((resolve) => {
    resolve()
  // }).then(() => dispatch(setMonuments({data}))).then(() => dispatch(setPhotos(id)))
  }).then(() => dispatch(setPhotos(id)))
)
