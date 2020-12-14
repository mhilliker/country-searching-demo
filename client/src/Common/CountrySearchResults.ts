import { CountryInfo } from "./ContryInfo";

export interface CountrySearchResults {
    countryInfos: CountryInfo[];
    searchText: string;
}