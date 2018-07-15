import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers, Action } from 'redux';
import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';
import * as uuid from 'uuid/v4';

export interface Picture {
  id: string;
  /* author: string;
  created_at: number;
  flickr_id: string;
  license_id: string; */
  // monument_id: string;
  // updated_at: number;
  type: string;
  url: string;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Properties {
  Info: string;
  Loc: string;
  Ref: string;
  VidLink: string;
  VidUrl: string;
  still: string;
}

export interface Monument {
  type: string;
  geometry: Geometry;
  properties: Properties;
  id: string;
  category: string,
  pictures: Picture[]
  /* id_number: number;
  category: 'Cultural' | 'Natural' | 'Mixed';
  created_at: string;
  updated_at: string;
  criteria_txt: string;
  danger: string | null;
  date_inscribed: string;
  extension: number;
  historical_description: string | null;
  http_url: string;
  image_url: string;
  iso_code: string;
  justification: string | null;
  latitude: number;
  longitude: number;
  latlng: number[];
  location: string;
  states: string;
  long_description: string;
  short_description: string;
  region: string;
  revision: number;
  secondary_dates: string;
  site: string;
  transboundary: number;
  unique_number: number; */
}

export interface MonumentDict {
  [id: string]: Monument;
}

export interface RThunkAction extends Action {
  payload: any;
  id?: string;
};

export interface State {
  monuments: MonumentDict;
  routing: RouterState;
}

const monuments = (state: MonumentDict = {}, { type, payload, id }: RThunkAction) => {
  switch (type) {
    case SET_MONUMENTS: return {
      ...payload.data
      .map((monument: Monument) => ({
        ...monument,
        category: 'Natural',
        pictures: [
          {
            id: uuid(),
            type: 'image',
            url: monument.properties.still
          },
          {
            id: uuid(),
            type: 'video',
            url: monument.properties.VidUrl            
          }
        ],
        latlng: monument.geometry.coordinates
      }))
      .reduce((acc: MonumentDict, next: Monument) => {
        if (acc[next.id]) {
          acc[next.id] = { ...acc[next.id], ...next };
        } else {
          acc[next.id] = next;
        }
        
        return acc;
      }, { ...state })
    };
    case SET_PHOTOS: {
      const monument = { ...state[id!] };
      return {
        ...state,
        [id!]: monument
      };
    }
    default: return state;
  }
};

const reducers = combineReducers<State>({
  routing,
  monuments
}) as any;

export default reducers;
