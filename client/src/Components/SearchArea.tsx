import React, { FunctionComponent, useState } from 'react';
import { CountrySearchResults } from '../Common/CountrySearchResults';
import { CountrySearchField } from './CountrySearchField';
import { CountryTable } from './CountryTable';


export const SearchArea: FunctionComponent = () => {

    const [tableContent, setTableContent] = useState<CountrySearchResults>({countryInfos: [], searchText: ""});

    const updateResults = (results: CountrySearchResults) => {
        setTableContent(results);
    }

    const shouldShowTable: boolean = !!tableContent.countryInfos && tableContent.countryInfos.length > 0;
    let userMessage = "";
    if (!shouldShowTable) {
        userMessage = tableContent.searchText ? "No results found." : "Enter a country to begin searching.";
    }
    
    return <>
        <div>
            <CountrySearchField onSearchResultsChanged={updateResults} />
        </div>
        <div className="resultsContainer">
            {shouldShowTable && <CountryTable tableContent={tableContent} />}
            {!shouldShowTable && userMessage}
        </div>
    </>
}

