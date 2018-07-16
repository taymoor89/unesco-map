import * as React from 'react';
import { Monument } from '../reducers/index';
import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../style';
const placeholder = require('../placeholder.png'); // tslint:disable-line

export interface Props {
  monument: Monument;
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 16,
    borderBottom: `1px solid ${colors.lightGrey}`,
    cursor: 'pointer'
  },
  flag: {
    flex: 1
  },
  description: {
    flex: 8
  },
  second: {
    color: colors.grey,
    fontWeight: 300,
    marginTop: 6,
    lineHeight: '16px'
  },
  state: {
    fontSize: 10,
    fontWeight: 400,
    textTransform: 'uppercase',
    letterSpacing: '5 px',
    color: '#808492'
  },
  image: {
    flex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    maxWidth: 200,
    minWidth: 120
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  }
});

const MonumentItem: React.StatelessComponent<Props> = ({ monument, onMouseEnter, onMouseLeave, onClick }) => (
  <div
    className={css(styles.container)}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}>
    {
      (monument as any).countryIso && (
        <div className={css(styles.flag)}/>
      )
    }
    <div className={css(styles.description)}>
      <h1>{ monument.properties.Loc }</h1>      
    </div>
    <div className={css(styles.image)}>
      <img src={monument.properties.still} className={css(styles.img)} onError={(e) => {
        e.currentTarget.src = `/${placeholder}`;
      }}/>
    </div>
  </div>
);

export default MonumentItem;
