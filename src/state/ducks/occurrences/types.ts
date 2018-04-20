export const SET_OCCURRENCES = 'occurrences/SET_OCCURRENCES';
export const REFRESH_OCCURRENCES = 'occurrences/REFRESH_OCCURRENCES';
export const SET_TAGS = 'occurrences/SET_TAGS';
export const ADVANCED_SEARCH_OCCURRENCES =
  'occurrences/ADVANCED_SEARCH_OCCURRENCES';
export const LOADMORE_ADVANCED_SEARCH_OCCURRENCES =
  'occurrence/LOADMORE_ADVANCED_SEARCH_OCCURRENCES';
export const REQUEST_OCCURRENCES = 'occurrences/REQUEST_OCCURRENCES';
export const REQUEST_ADVSEARCH = 'occurrences/REQUEST_ADVSEARCH';
export const RESET_SEARCH_RESULT = 'occurrences/RESET_SEARCH_RESULT';

export type SET_OCCURRENCES = typeof SET_OCCURRENCES;
export type REFRESH_OCCURRENCES = typeof REFRESH_OCCURRENCES;
export type SET_TAGS = typeof SET_TAGS;
export type ADVANCED_SEARCH_OCCURRENCES = typeof ADVANCED_SEARCH_OCCURRENCES;
export type LOADMORE_ADVANCED_SEARCH_OCCURRENCES = typeof LOADMORE_ADVANCED_SEARCH_OCCURRENCES;
export type REQUEST_OCCURRENCES = typeof REQUEST_OCCURRENCES;
export type REQUEST_ADVSEARCH = typeof REQUEST_ADVSEARCH;
export type RESET_SEARCH_RESULT = typeof RESET_SEARCH_RESULT;

export interface IEvent {
  '@context': string;
  '@id': string;
  '@type': string;
  updatedAt: string;
  isPublished: boolean;
  occurrences: IOccurrence[] | undefined;
  ticketPurchaseUrl: string;
  eventUrl: string;
  excerpt: string;
  organizer: IOrganizer | undefined;
  tags: string[];
  customTags: string[];
  description: string;
  image: string;
  name: string;
  url: string;
  videoUrl: string;
  langcode: string;
}

export interface IOrganizer {
  '@id': string;
  '@type': string;
  name: string;
  email: string;
  url: string;
}

export interface IOccurrence {
  '@id': string;
  '@type': string;
  event: IEvent;
  startDate: Date;
  endDate: Date;
  place: IPlace;
  room: string;
  ticketPriceRange: string;
  eventStatusText: string;
}

export interface IPlace {
  '@id': string;
  '@type': string;
  telephone: string;
  email: string;
  logo: string;
  disabilityAccess: string;
  latitude: number;
  longitude: number;
  tags: string[];
  description: string;
  image: string;
  name: string;
  url: string;
  videoUrl: string;
  langcode: string;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
}

export interface ITags {
  '@id': string;
  '@type': string;
  name: string;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
}
