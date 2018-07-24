import * as React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import {Layer} from '../reducers';

const styles = StyleSheet.create({
  layersContainer: {
    zIndex: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'black',
    fontWeight: 'bold'
  },
  layers: {
      padding: 20
  },
  layer: {
      padding: 10,
      color: 'white',
      background: 'green',
      fontWeight: 'bold',
      marginTop: 5,
      cursor: 'pointer'
  }
});

export interface Props {
    layers: Layer[];
    onClick: (layerId: any) => void;
}


class LayerList extends React.Component<Props, {}> {
    render () {
        const layers = this.props.layers.map(layer => {
            return (
                <li
                    className={css(styles.layer)}
                    key={layer.id}
                    onClick={() => {this.props.onClick(layer.id)}}
                >{layer.title}</li>
            );
        })
        return (
            <div className={css(styles.layersContainer)}>
                <ul className={css(styles.layers)}>
                    {layers}
                </ul>                
            </div>
        );
    }
}

export default LayerList;
