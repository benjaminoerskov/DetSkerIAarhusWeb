import * as React from 'react';
import {RouteComponentProps} from 'react-router';
import DateHelper from '../../utils/dateHelper';

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
    occurrence:undefined
  }

  public async componentDidMount() {
    const occurrence : types.IOccurrence = await getSingleEvent(this.props.match.params.id);
    this.setState({occurrence});
  }

  public render() {
    return (
      // @ts-ignore
    <OccurrenceDetailRender occurrence = {this.state.occurrence} />)
  }
}

export default OccurrenceDetail;

const OccurrenceDetailRender = (props : {
  occurrence: types.IOccurrence
}) : JSX.Element | null => {
  if (props.occurrence === undefined) {
    return null;
  }
  
  const betterDate = DateHelper.getDisplayString(new Date(props.occurrence.startDate));
  return (
    <div className="App">
      <h1>
        {props.occurrence.event.name}
      </h1>
      <h2>{betterDate}</h2>
      <h2>Pris: {props.occurrence.ticketPriceRange}</h2>
      <div dangerouslySetInnerHTML={{__html: props.occurrence.event.description}}>
        </div>
        <img className="img-fluid" src={props.occurrence.event.image}/>
    </div>
  )
};