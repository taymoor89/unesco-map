import * as React from 'react';
import { MapEvent } from 'react-mapbox-gl/lib/map-events';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { getMonuments } from '../actions/monument';
import { MonumentDict, State, Layer } from '../reducers/index';
import UnescoMap from './map';
import { css, StyleSheet } from 'aphrodite/no-important';
import { browserHistory, RouteComponentProps } from 'react-router';
import { Props as SidepanListProps } from './sidepanList';
import { RouteProps } from './sidepanDetail';
import SidepanContainer from './sidepanContainer';
import { fetchMonument } from '../actions/monument';
import LayerList from './layerList';
import {toggleLayer} from '../actions/layers';

interface Props {
  getMonuments: () => any;
  monuments: MonumentDict;
  layers: Layer[];
  fetchMonument: (layerId: string, id: string) => any;
  toggleLayer: (layerId: any) => any;
}

interface StateComp {
  filteredMonuments: string[];
  hoveredItem: string;
  center: number[];
  zoom: [number];
  bounds: number[];
  hoveredAnchor: string;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  }
});

const defaultZoom: [number] = [6];
const defaultCenter = [-0.2416815, 51.5285582];

class Main extends React.Component<Props & RouteComponentProps<RouteProps, void>, StateComp> {
  public state = {
    hoveredItem: '',
    zoom: defaultZoom,
    center: defaultCenter,
    filteredMonuments: [],
    bounds: [],
    hoveredAnchor: 'top'
  };

  public componentWillMount() {
    const { location, fetchMonument, params } = this.props;
    this.props.getMonuments().then(() => {

      if (location.pathname.includes('detail')) {
        fetchMonument(params.layerId, params.id).then(() => {
          this.setState({
            center: this.props.monuments[params.id].geometry.coordinates as [number, number],
            zoom: [11],
            hoveredItem: params.id
          });
        });
      }
  
      browserHistory.listen((ev) => {
        if (!ev.pathname.includes('detail')) {
          this.setState({
            zoom: defaultZoom,
            hoveredItem: ''
          });
        } else if (ev.pathname.includes('detail')) {
          const parts = ev.pathname.trim().split('/');
          const id = parts[3];
          const selectedMonument = this.props.monuments[id];        
          this.setState({
            center: selectedMonument.geometry.coordinates,
            zoom: [11]
          });       
        }
      });      
    });    
  } 

  private mapInit: MapEvent = (map: any) => {
    const bounds = map.getBounds();
    const boundsArr = [bounds.getSouth(), bounds.getWest(), bounds.getNorth(), bounds.getEast()];    
    this.setMonumentsAndBounds(boundsArr);
  };

  private setMonumentsAndBounds = (bounds: number[]) => {
    const { monuments } = this.props;

    this.setState({
      filteredMonuments: Object.keys(monuments).filter(k => {
        const lat = monuments[k].geometry.coordinates[1];
        const long = monuments[k].geometry.coordinates[0];

        return lat > bounds[0] && long > bounds[1] && lat < bounds[2] && long < bounds[3];
      }),
      bounds
    });
  };

  private BoundsChanged: MapEvent = throttle((map: any) => {
    const bounds = map.getBounds();
    const limitedBounds = map.unproject([60, 60]);

    const hDiff = Math.abs(bounds.getNorth() - limitedBounds.lat);
    const vDiff = Math.abs(bounds.getWest() - limitedBounds.lng);

    const boundsArr = [bounds.getSouth() + hDiff, limitedBounds.lng, limitedBounds.lat, bounds.getEast() - vDiff];

    this.setMonumentsAndBounds(boundsArr);
  }, 500, { leading: true });

  private onMouseEnter = (key: string) => {
    this.setState({
      hoveredItem: key
    });
  }

  private onMouseLeave = () => {
    this.setState({
      hoveredItem: ''
    });
  }

  private onMonumentClick = (layerId: string, k: string) => {
    const selectedMonument = this.props.monuments[k];

    this.setState({
      center: selectedMonument.geometry.coordinates,
      zoom: [11]
    });

    this.props.fetchMonument(layerId, k);

    setTimeout(() => {
      browserHistory.replace(`/detail/${layerId}/${k}`);
    }, 500);
  };

  handleLayerClick = (layerId: string) => {
    this.props.toggleLayer(layerId);
  };

  public render() {    
    const { monuments, children } = this.props;
    const { zoom, center, hoveredItem, filteredMonuments } = this.state;

    return (
      <div className={css(styles.container)}>
        <SidepanContainer>
        {
          React.cloneElement((children as React.ReactElement<SidepanListProps>), {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            filteredMonuments: filteredMonuments as string[],
            onSelectItem: this.onMonumentClick,
            layers: this.props.layers
          })
        }
        </SidepanContainer>
        <LayerList layers={this.props.layers} onClick={this.handleLayerClick}/>  
        <UnescoMap
          zoom={zoom}
          center={center}
          hoveredItem={hoveredItem}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          monuments={monuments}
          BoundsChanged={this.BoundsChanged}
          mapInit={this.mapInit}
          onMonumentClick={this.onMonumentClick}
          layers={this.props.layers}
        />
      </div>
    );
  }
}

export default connect((state: State) => ({
  monuments: state.monuments,
  layers: state.layers,  
}), dispatch => ({
  getMonuments: () => dispatch(getMonuments()),
  fetchMonument: (layerId: string, id: string) => dispatch(fetchMonument(layerId, id)),
  toggleLayer: (layerId: string) => dispatch(toggleLayer(layerId)),
}))(Main);
