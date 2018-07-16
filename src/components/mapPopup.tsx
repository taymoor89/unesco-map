import * as React from 'react';
import { Popup } from 'react-mapbox-gl';
import { Monument } from '../reducers/index';
import { css, StyleSheet } from 'aphrodite/no-important';
import { colors } from '../style';
const placeholder = require('../placeholder.png'); // tslint:disable-line


export interface Props {
  monument: Monument;
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    minWidth: 120,
    backgroundColor: colors.darkBlue,
    borderRadius: 5
  },
  image: {    
    maxWidth: '100%',
    maxHeight: '100%'
  },
  footer: {
    backgroundColor: 'white',
    padding: '8px 12px'
  }
});

const offset = [0, -15];

const MapPopup: React.StatelessComponent<Props> = ({ monument }) => (
  <Popup
    coordinates={monument.geometry.coordinates}
    anchor="bottom"
    offset={offset}>
    <div className={css(styles.container)}>
      <img className={css(styles.image)} src={monument.properties.still} onError={(e) => {
        e.currentTarget.src = `/${placeholder}`;
      }}/>
      <div className={css(styles.footer)}>
        <h1 style={{ fontSize: 15 }}>{ monument.properties.Loc }</h1>
      </div>
    </div>
  </Popup>
);

export default MapPopup;
