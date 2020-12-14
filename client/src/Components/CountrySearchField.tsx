import React, { ChangeEvent, FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { debounce } from 'lodash';
import { CountrySearchResults } from '../Common/CountrySearchResults';

interface CountrySearchFieldProps {
    onSearchResultsChanged: Function;
}

async function fetchSearchData(searchText: string): Promise<CountrySearchResults> {
    let results: CountrySearchResults = {countryInfos: [], searchText: searchText};
    try {
        const requestUrl = process.env.REACT_APP_API_URL + "search/" + searchText;
        const rawResult = await axios.get(requestUrl);
        results.countryInfos = rawResult.data.results;
    } catch (exception) {
        console.error(exception);
    }
    
    return results;
}

export const CountrySearchField: FunctionComponent<CountrySearchFieldProps> = (props: CountrySearchFieldProps) => {

    // debounce the update to prevent multiple requests while the user is still typing
    const fetchAndUpdate = (searchText: string) => fetchSearchData(searchText).then((results) => props.onSearchResultsChanged(results));
    const deboucedFetchAndUpdate = debounce(fetchAndUpdate, 250);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value;
        deboucedFetchAndUpdate(searchText);
    }

    return <>
        <Form>
            <Form.Group controlId="searchFrom.countrySearchField">
                <Form.Label>Search countries by name, full name, or code.</Form.Label>
                <br />
                <Form.Control type="text" placeholder="Enter a country" size="lg" onChange={handleSearchChange} />
            </Form.Group>
        </Form>
    </>
}

