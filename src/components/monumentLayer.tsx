import * as React from 'react';
import { Layer, Feature } from 'react-mapbox-gl';
import { MonumentDict } from '../reducers/index';
import { SymbolLayout } from 'mapbox-gl';

export interface MonumentLayout {
  'icon-image': string;
  visibility: string;
}

export interface Props {
  monuments: MonumentDict;
  onMonumentClick: Function;
  markerHover: Function;
  markerEndHover: Function;
  monumentIds: string[];
  layout: MonumentLayout;
  layerId: string;
}

const monumentLayer: React.StatelessComponent<Props> = ({
  monuments,
  onMonumentClick,
  markerHover,
  markerEndHover,
  monumentIds,
  layout,
  layerId
}) => (
  <Layer
    type="symbol"
    id={layerId}
    layout={layout as SymbolLayout}>
    {
      monumentIds.map(k => (
        <Feature
          onMouseEnter={markerHover.bind(null, k)}
          onMouseLeave={markerEndHover.bind(null, k)}
          onClick={onMonumentClick.bind(null, monuments[k].layerId, k)}
          coordinates={monuments[k].geometry.coordinates}
          key={k}
        />
      ))
    }
  </Layer>
);

export default monumentLayer;
