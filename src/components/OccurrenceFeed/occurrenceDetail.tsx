import * as React from 'react';
import {RouteComponentProps} from 'react-router';

import {getSingleEvent} from '../../state/ducks/occurrences/operations';
import * as types from '../../state/ducks/occurrences/types';

interface IState {
  occurrence?: types.IOccurrence;
}

export interface IOccurrenceDetailProps extends RouteComponentProps < {
  id: string
} > {}

class OccurrenceDetail extends React.Component < IOccurrenceDetailProps,
IState > {

  public state = {
    occurrence: undefined
  }

  public async componentDidMount() {
    const occurrence : types.IOccurrence = await getSingleEvent(this.props.match.params.id);

    this.setState({occurrence});
  }

  public render() {
    return (
    // @ts-ignore 
    < OccurrenceDetailRender occurrence = {
      this.state.occurrence
    } />)
  }
}

export default OccurrenceDetail;

const OccurrenceDetailRender = (props : {
  occurrence: types.IOccurrence
}) : JSX.Element | null => {
  if (props.occurrence === undefined) {
    return null;
  }
  
  return (
    <div className="App">
      <h1>
        {props.occurrence.event.name}
      </h1>
      <div dangerouslySetInnerHTML={{__html: props.occurrence.event.description}}>
        </div>
        <img src={props.occurrence.event.image}/>
    </div>
    
  )
};
