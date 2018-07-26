import * as React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from "react-router";
import { Monument, State as StateRoot } from '../reducers/index';
import { StyleSheet, css } from 'aphrodite/no-important';
import Slider from './slider';
import { colors } from '../style';
import Back from '../icons/back';
const placeholder = require('../placeholder.png'); // tslint:disable-line

export interface Props {
  monument: Monument;
}

interface State {
  isFullscreen: boolean;
}

export interface RouteProps {
  layerId: string;
  id: string;
}

const styles = StyleSheet.create({
  container: {
    width: 520,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  monumentDetails: {
    padding: '20px 32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  leading: {
    color: colors.darkBlue,
    margin: '10px 0px'
  },
  title: {
    color: colors.darkBlue,
    fontSize: 24,
    lineHeight: '32px',
    padding: '4px 0px'
  },
  region: {
    color: colors.grey,
    fontWeight: 400
  },
  description: {
    fontSize: 16,
    fontWeight: 300,
    color: colors.darkBlue,
    marginTop: 12,
    lineHeight: '26px',
    overflow: 'auto'
  },
  footer: {
    borderBottom: '1px solid #edeaea',
    height: 56,
    display: 'flex',
    alignItems: 'center'
  },
  allSites: {
    display: 'flex',
    alignItems: 'center',
    width: 56,
    height: '100%',
    justifyContent: 'center',
    fontWeight: 400,
    cursor: 'pointer',
    borderRight: '1px solid #edeaea'
  },
  back: {
    marginRight: 4
  },
  links: {
    marginTop: 10
  },
  link: {
    margin: '10px 0',     
    textDecoration: 'underline',
    color: 'inherit'
  }
});

class SidepanDetail extends React.Component<Props, State> {

  public state = {
    isFullscreen: false
  };

  private onGoBack = () => {
    browserHistory.push('/');
  }

  public render() {
    const { monument } = this.props;
  
    if (!monument) {
      return null;
    }

    const hasPictures = monument.properties.Media && monument.properties.Media.length > 0;

    return (
      <div className={css(styles.container)}>        
        <div className={css(styles.footer)}>
          <div className={css(styles.allSites)} onClick={this.onGoBack}>
            <Back className={css(styles.back)}/>
          </div>
        </div>
        <div>
          {
            hasPictures ?
              <Slider pictures={monument.properties.Media} /* onFullScreen={this.onFullScreen} *//> :
              <img src={`/${placeholder}`}/>
          }
        </div>
        <div className={css(styles.monumentDetails)}>
          <h1 className={css(styles.title)}>{monument.properties.Loc}</h1>          
          <div className={css(styles.description)}>
            { monument.properties.Info }
          </div>
          <div className={css(styles.links)}>
            {
              this.props.monument.properties.Links && 
              this.props.monument.properties.Links.length > 0 && 
              this.props.monument.properties.Links.map((link) => {
                return (
                  <Link
                    className={css(styles.link)}
                    key={link.id} 
                    to={`/detail/${this.props.monument.layerId}/${link.id}`}
                  >{link.title}</Link>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state: StateRoot, props: any) => ({
  monument: state.monuments[props.params.id]
}))(SidepanDetail);
