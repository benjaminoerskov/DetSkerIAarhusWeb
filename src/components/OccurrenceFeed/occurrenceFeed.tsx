import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Link } from 'react-router-dom'
import { IAppState } from '../../state/ducks';
import { occurrencesOperations } from '../../state/ducks/occurrences';
import { IOccurrencesOperations, IResourceOptions } from '../../state/ducks/occurrences/operations';
import { getOccurrencesViewState } from '../../state/ducks/occurrences/selectors';
import { IOccurrence, IPagination } from '../../state/ducks/occurrences/types';
import DateHelper from '../../utils/dateHelper';

  interface IOccurrencesScreenProps {
    occurrencesOperations: IOccurrencesOperations;
    eventsFeed: IOccurrence[];
    pagination: IPagination;
  }
  
  interface IOccurrencesScreenState {
    resourceOptions: IResourceOptions;
  }

class OccurrenceFeed extends React.Component<IOccurrencesScreenProps,
IOccurrencesScreenState> {
    constructor(props:any) {
        super(props);

        this.upDateEvents = this.upDateEvents.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);

        this.state = {
        resourceOptions: {
        startDate: DateHelper.GetApiString(new Date()),
        endDate: '',
        searchName: '',
        refresh: false,
        tags: [],
        organizerIds: [],
        placesId: [],
        hasMore: true
        }
      }
  }

  public render() {
    const occurrenceItems: JSX.Element[] = [];
    this.props.eventsFeed.map((occo, i) => {
      occurrenceItems.push(<OccouranceCardComponent key={occo["@id"]} occurrence={occo} />)
    });

    return (
      <InfiniteScroll
        pageStart={1}
        loadMore={this.handleLoadMore}
        hasMore={this.state.resourceOptions.hasMore}
        >
        <div className="cardListContainer">
          {occurrenceItems}
        </div>
      </InfiniteScroll>
    );
  }

  private upDateEvents = async (page: number) => {
    if (this.props.pagination.loading) {
      return;
    }
  
    await this.props.occurrencesOperations.getEventsAsync(
      this.state.resourceOptions,
      page,
      this.props.pagination.pageSize
    );

    await this.setState({
      resourceOptions: {
        ...this.state.resourceOptions,
        refresh: false,
      },
    });
    if (this.props.eventsFeed.length < 1) {
      alert('No results');
    }

    if(this.props.eventsFeed.length >= this.props.pagination.total){
      await this.setState({
        resourceOptions: {
          ...this.state.resourceOptions,
          hasMore: false,
        },
      });
    }
  };
  
  private handleRefresh = async () => {
    await this.setState({
      resourceOptions: {
        ...this.state.resourceOptions,
        refresh: true,
        startDate: DateHelper.GetApiString(new Date()),
      },
    });
    this.upDateEvents(1); // refresh
  };

  private handleLoadMore = () => {
    if (
      this.props.pagination.total !== -1 &&
      this.props.pagination.total <= this.props.eventsFeed.length
    ) {
      return;
    }
    this.upDateEvents(this.props.pagination.page + 1);
  };
 
  onSearchSubmitPressed = async( searchName: string) => {
    await this.setState({
      resourceOptions: {
        ...this.state.resourceOptions,
        searchName,
        refresh: true, // the list will be a new list and not just added to current list
      },
    });
    await this.upDateEvents(1); // refresh
    await this.setState({
      resourceOptions: {
        ...this.state.resourceOptions,
        refresh: false,
      },
    });
  };
}

const mapStateToProps = (state: IAppState) => {
  return {
    eventsFeed: getOccurrencesViewState(state.occurrences).occurrences,
    pagination: getOccurrencesViewState(state.occurrences).pagination,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    occurrencesOperations: bindActionCreators(occurrencesOperations, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceFeed);
  
const OccouranceCardComponent = (props: IOccourrenceCardComponentProps): JSX.Element => {
  const occurrenceId = props.occurrence["@id"].replace(/\D/g,'');
  const desciption = strip(props.occurrence.event.description).slice(0,200) +"... ";
  const eventName = getEventName(props.occurrence.event.name, 45);
  const imageSource = props.occurrence.event.image ? props.occurrence.event.image : "someplaceholder";
  const betterDate = DateHelper.getDisplayString(new Date(props.occurrence.startDate));
  return(
    <div className="card cardListComponent">
      <div className="img-div">
        <Link to={`/occurrences/${occurrenceId}`}><img className="card-img-top imgFeed" title={decoder(props.occurrence.event.name)} src={imageSource} alt={props.occurrence.event.name}>
        </img></Link>
      </div>
      <div className="card-body card-body-custom">
      <div>
        <h5 className="card-title" dangerouslySetInnerHTML={{__html: eventName}}></h5>
        <p className="card-text" >{desciption}<Link to={`/occurrences/${occurrenceId}`}>Læs mere</Link></p>
      </div>
        <div className="cardDate">
          <span className="feedDate">{betterDate}</span>
          <span className="feedPrice">pris: {props.occurrence.ticketPriceRange}</span>
        </div>
      </div>
  </div>
  );
}

interface IOccourrenceCardComponentProps {
  occurrence: IOccurrence;
}

function getEventName(name:string, amountOfChars:number){
  if(name.length < amountOfChars)
  {
    return name;
  }
  else {
    return name.slice(0, amountOfChars) + "...";
  }
}

function strip(html:string){
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function decoder(toUnescape: string): string {
  return toUnescape.replace(/&#(\d+);/g, (match, dec)=>{
    return String.fromCharCode(dec);
  })
}