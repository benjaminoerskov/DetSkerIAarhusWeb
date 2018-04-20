import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
  // @ts-ignore
    // private list: any;

    constructor(props:any) {
        super(props);

        this.upDateEvents = this.upDateEvents.bind(this);
        this.onEventSelected = this.onEventSelected.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);

        // this.list = null;
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
      // public componentDidMount(){
      //   // this.upDateEvents(1);
      //   this.props.occurrencesOperations.getEventsAsync(
      //     this.state.resourceOptions,
      //     1,
      //     100
      //   );
      // }



    public render() {
      // @ts-ignore
      // tslint:disable-next-line:prefer-const
      let occurrenceItems: OccouranceCardComponent[] = [];
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

          {/* <div className="cardListContainer" >
            {this.props.eventsFeed &&
              this.props.eventsFeed.map((occo) => {
              return (<OccouranceCardComponent key={occo["@id"]} occurrence={occo} linkClicked={this.componentDidMount}  />)}
            )}
        </div> */}
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

  // @ts-ignore
      // tslint:disable-next-line:no-console
      console.log("TOP-LOGGER: hasMore: " + this.state.resourceOptions.hasMore + " totalItems: " + this.props.pagination.total + " FeedLength: " + this.props.eventsFeed.length);

        if(this.props.eventsFeed.length >= this.props.pagination.total){
          await this.setState({
            resourceOptions: {
              ...this.state.resourceOptions,
              hasMore: false,
            },
          });
        }
      };
  
    
  // @ts-ignore
      
      private onEventSelected = item => {
        alert(item.event.name);
      };
  // @ts-ignore
    
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
  // @ts-ignore
    
      private handleLoadMore = () => {
        if (
          this.props.pagination.total !== -1 &&
          this.props.pagination.total <= this.props.eventsFeed.length
        ) {
          return;
        }
    
        this.upDateEvents(this.props.pagination.page + 1);
      };

  // @ts-ignore
      private onSearchSubmitPressed = async searchName => {
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
  
  // @ts-ignore
  const mapDispatchToProps = dispatch => {
    return {
      occurrencesOperations: bindActionCreators(occurrencesOperations, dispatch),
    };
  };


  export default connect(mapStateToProps, mapDispatchToProps)(OccurrenceFeed);
  
  const OccouranceCardComponent = (props: IOccourrenceCardComponentProps): JSX.Element => {
    const occurrenceId = props.occurrence["@id"].replace(/\D/g,'');
    // @ts-ignore
    const desciption = strip(props.occurrence.event.description).slice(0,120) +"... ";
    const imageSource = props.occurrence.event.image ? props.occurrence.event.image : "someplaceholder";
    return(
      <div className="card cardListComponent">
     <img className="card-img-top imgFeed"  src={imageSource} alt={props.occurrence.event.name}/>
      <div className="card-body">
    <h5 className="card-title">{props.occurrence.event.name}</h5>
    {/* <h5 className="card-title">{props.occurrence.event.name}</h5> */}
    <p className="card-text" >{desciption}<Link to={`/occurrences/${occurrenceId}`}>Du kan bare læse mere her :3</Link></p>
    {/* <a onClick={()=>props.linkClicked(props.occurrence["@id"])} className="btn btn-primary">Go somewhere</a> */}
    <Link to={`/occurrences/${occurrenceId}`} className="btn btn-primary">Go to event</Link>
  </div>
    </div>
    );
  }

  interface IOccourrenceCardComponentProps {
    occurrence: IOccurrence;
  }

  function strip(html:string){
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }