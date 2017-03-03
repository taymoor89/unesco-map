import * as React from 'react';
import MapPopup from './mapPopup';
import { Map } from 'react-mapbox-gl';
import { MonumentDict } from '../reducers/index';
import { MapEvent } from 'react-mapbox-gl/lib/map';
import MonumentLayer from './monumentLayer';
import { MonumentLayout } from './monumentLayer';

const accessToken = 'pk.eyJ1IjoiYWxleDMxNjUiLCJhIjoiY2l6bjVhNmNzMDAwbjJxbnlsaHk0NDRzciJ9.FFqZuLjBHghDPkyp_1oMpA';
const styles = {
  map: {
    height: '100vh',
    width: '70vw'
  }
};

export interface Props {
  monuments: MonumentDict;
  BoundsChanged: MapEvent;
  mapInit: MapEvent;
  center: [number, number];
  zoom: number[];
  hoveredItem: string;
  onMonumentClick: (k: string) => void;
}

const cultureLayout: MonumentLayout = {
  'icon-image': 'monument'
};

const natureLayout: MonumentLayout = {
  'icon-image': 'nature'
};

class UnescoMap extends React.Component<Props, void> {
  private markerHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = 'pointer';
  };

  private markerEndHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = '';
  };

  public render() {
    const { monuments, BoundsChanged, mapInit, center, zoom, hoveredItem, onMonumentClick } = this.props;

    const cultural = Object.keys(monuments).filter(k => monuments[k].category !== 'Natural');
    const natural = Object.keys(monuments).filter(k => monuments[k]. category === 'Natural');

    return (
      <Map
        zoom={zoom}
        center={center}
        style="mapbox://styles/alex3165/cizu1cw8j00fl2st69h0lbmj6"
        accessToken={accessToken}
        containerStyle={styles.map}
        onZoom={BoundsChanged}
        onStyleLoad={mapInit}
        onMove={BoundsChanged}>
          {
            hoveredItem && (
              <MapPopup monument={monuments[hoveredItem]}/>
            )
          }
          <MonumentLayer
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            monumentIds={cultural}
            layout={cultureLayout}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
          <MonumentLayer
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            layout={natureLayout}
            monumentIds={natural}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
      </Map>
    );
  }
};

export default UnescoMap;
