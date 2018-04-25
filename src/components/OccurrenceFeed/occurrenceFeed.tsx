import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppState } from '../../state/ducks';
import { occurrencesOperations } from '../../state/ducks/occurrences';
import { IOccurrencesOperations, IResourceOptions } from '../../state/ducks/occurrences/operations';
import { getOccurrencesViewState } from '../../state/ducks/occurrences/selectors';
import { IOccurrence, IPagination } from '../../state/ducks/occurrences/types';
import { userOperations } from '../../state/ducks/user';
import { IUserOperations } from '../../state/ducks/user/operations';
import { getUserViewState } from '../../state/ducks/user/selectors';
import DateHelper from '../../utils/dateHelper';
import { OccouranceCardComponent } from './occurrenceCard';

  interface IOccurrencesScreenProps {
    occurrencesOperations: IOccurrencesOperations;
    userOperations: IUserOperations;
    eventsFeed: IOccurrence[];
    pagination: IPagination;
    userLikes: IOccurrence[];
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
        this.likeEvent = this.likeEvent.bind(this);
        this.unLikeEvent = this.unLikeEvent.bind(this);

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
    this.props.eventsFeed.map((occo) => {
      occurrenceItems.push(<OccouranceCardComponent key={occo["@id"]} occurrence={occo} 
      userLikes={this.props.userLikes}
      likeEvent={this.likeEvent}
      unLikeEvent={this.unLikeEvent}
      />)
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

  private likeEvent(id: string){
    this.props.userOperations.likeOccurrenceAsync({occurrenceId: id});
  }

  private unLikeEvent(id: string){
    this.props.userOperations.unLikeOccurrenceAsync({occurrenceId: id});
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
    userLikes: getUserViewState(state.user).userDetails.associatedOccurrences
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    occurrencesOperations: bindActionCreators(occurrencesOperations, dispatch),
    userOperations: bindActionCreators(userOperations, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceFeed);
  
