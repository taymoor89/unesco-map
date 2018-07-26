import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers, Action } from 'redux';
import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';

export interface Picture {
  type: string;
  url: string;
}

export interface Geometry {
  type: string;
  coordinates: [number, number];
}

export interface Link {
  id: string;
  title: string;
}

export interface Properties {
  Info: string;
  Loc: string;
  Ref: string;
  still: string;
  Media: Picture[];
  Links: Link[];
}

export interface Monument {
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
  icon: string;
  layerId: string;
}

export interface Layer {
  id: string;
  title: string;
  icon: string;
  features: Monument[];
  active: boolean;
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
  layers: Layer[];
  routing: RouterState;
}

const monuments = (state: MonumentDict = {}, { type, payload, id }: RThunkAction) => {
  switch (type) {
    case SET_MONUMENTS: 
    return {
      ...payload.features
      .map((monument: Monument) => ({
        ...monument,
        icon: payload.icon,
        layerId: payload.id
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

const layers = (state: Layer[] = [], {type, payload}: RThunkAction) => {
  switch (type) {
    case 'ADD_LAYER':
      return [...state, payload];

    case 'TOGGLE_LAYER':
      return state.map(layer => {
        let newLayer = {...layer};

        if(layer.id === payload.id){
          newLayer.active = !layer.active;          
        }        
        
        return newLayer;
      })
    default:
      return state;
  }
}

const reducers = combineReducers<State>({
  routing,
  monuments,
  layers
}) as any;

export default reducers;
