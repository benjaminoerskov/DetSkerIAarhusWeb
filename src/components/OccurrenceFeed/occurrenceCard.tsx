import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IOccurrence } from '../../state/ducks/occurrences/types';
import DateHelper from '../../utils/dateHelper';

interface IOccourrenceCardComponentProps {
    occurrence: IOccurrence;
    userLikes: IOccurrence[];
    likeEvent(id: string): void;
    unLikeEvent(id: string): void;
}

interface IState {
    occurrenceId: string;
    desciption: string;
    eventName: string;
    imageSource: string;
    betterDate: string;
    isLiked?: boolean;
}



export class OccouranceCardComponent extends React.Component<IOccourrenceCardComponentProps, IState>  {
    /**
     *
     */
    constructor(props: IOccourrenceCardComponentProps) {
        super(props);
        this.onLikeChange = this.onLikeChange.bind(this);
        
    }

    state = {
        occurrenceId: this.props.occurrence["@id"].replace(/\D/g, ''),
        desciption: strip(this.props.occurrence.event.description).slice(0, 200) + "... ",
        eventName: getEventName(this.props.occurrence.event.name, 45),
        imageSource: this.props.occurrence.event.image ? this.props.occurrence.event.image : "someplaceholder",
        betterDate: DateHelper.getDisplayString(new Date(this.props.occurrence.startDate)),
        isLiked: (this.props.userLikes.find(x => x["@id"] === this.props.occurrence["@id"]) === null),
    }


    onLikeChange(event: React.ChangeEvent<any>) {
        event.target.checked ? this.props.likeEvent(this.state.occurrenceId) : this.props.unLikeEvent(this.state.occurrenceId);
    }

    render() {
        return (
            <div className="card cardListComponent">
                <div className="img-div">
                    <Link to={`/occurrences/${this.state.occurrenceId}`}>
                        <img className="card-img-top imgFeed" title={decoder(this.props.occurrence.event.name)} src={this.state.imageSource} alt={this.props.occurrence.event.name}>
                        </img>
                    </Link>
                    <Checkbox onChange={this.onLikeChange} name="like" checked={this.state.isLiked}
                    >like</Checkbox>

                </div>
                <div className="card-body card-body-custom">
                    <div>
                        <h5 className="card-title" dangerouslySetInnerHTML={{ __html: this.state.eventName }}></h5>
                        <p className="card-text" >{this.state.desciption}<Link to={`/occurrences/${this.state.occurrenceId}`}>Læs mere</Link></p>
                    </div>
                    <div className="cardDate">
                        <span className="feedDate">{this.state.betterDate}</span>
                        <span className="feedPrice">pris: {this.props.occurrence.ticketPriceRange}</span>
                    </div>
                </div>
            </div>
        );
    }
}



function getEventName(name: string, amountOfChars: number) {
    if (name.length < amountOfChars) {
        return name;
    }
    else {
        return name.slice(0, amountOfChars) + "...";
    }
}

function strip(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

function decoder(toUnescape: string): string {
    return toUnescape.replace(/&#(\d+);/g, (match, dec) => {
        return String.fromCharCode(dec);
    })
}