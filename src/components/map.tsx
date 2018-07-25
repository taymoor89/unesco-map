import * as React from 'react';
import MapPopup from './mapPopup';
import ReactMapboxGl from 'react-mapbox-gl';
import { MonumentDict } from '../reducers/index';
import { MapEvent } from 'react-mapbox-gl/lib/map-events';
import MonumentLayer from './monumentLayer';
import { MonumentLayout } from './monumentLayer';
import {Layer} from '../reducers';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibG91aXNjdXJyaWUiLCJhIjoiY3MwR3B3QSJ9._5UXyjEIY0YisuAz9c_tJA'
});

const mapStyle = 'mapbox://styles/louiscurrie/cizcq06l600292so15ydwjckr';

const styles = {
  map: {
    position: 'absolute',
    left: 500,
    right: 0,
    bottom: 0,
    top: 0
  } as React.CSSProperties
};

export interface Props {
  monuments: MonumentDict;
  BoundsChanged: MapEvent;
  mapInit: MapEvent;
  center: number[];
  zoom: [number];
  hoveredItem: string;
  onMonumentClick: (layerId: string, k: string) => void;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
  layers: Layer[];
}

class UnescoMap extends React.Component<Props> {
  private markerHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = 'pointer';
      this.props.onMouseEnter(key);
  };

  private markerEndHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = '';
      this.props.onMouseLeave();
  };

  public render() {
    const { monuments, BoundsChanged, mapInit, center, zoom, hoveredItem, onMonumentClick } = this.props;
    let activeLayers = this.props.layers.filter(layer => layer.active);
    const layers = activeLayers.map(layer => {
      const layout: MonumentLayout = {
        'icon-image': layer.icon
      };
      const monumentIds = Object.keys(monuments).filter(k => monuments[k].layerId === layer.id);
      return (
        <MonumentLayer
            key={layer.id}
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            layout={layout}
            monumentIds={monumentIds}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
      );
    })

    return (
      <Map
        zoom={zoom}
        center={center}
        style={mapStyle}
        containerStyle={styles.map}
        onZoom={BoundsChanged}
        onStyleLoad={mapInit}
        onMove={BoundsChanged}>
          {
            !!hoveredItem ? (
              <MapPopup monument={monuments[hoveredItem]}/>
            ) : undefined
          }
          
          {/* <MonumentLayer
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            layout={natureLayout}
            monumentIds={natural}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          /> */}
          {
            layers
          }
      </Map>
    );
  }
};

export default UnescoMap;
