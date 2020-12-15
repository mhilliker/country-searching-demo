import React, { FunctionComponent } from 'react';
import { Table } from 'react-bootstrap';
import { CountryInfo } from '../Common/ContryInfo';
import { CountrySearchResults } from '../Common/CountrySearchResults';
import { CountryTableEntry } from './CountryTableEntry';

interface CountryTableProps {
    tableContent: CountrySearchResults;
}

export const CountryTable: FunctionComponent<CountryTableProps> = (props: CountryTableProps) => {

    return <Table striped bordered hover className="resultsTable">
        {countryTableHeader}
        {countryTableBody(props.tableContent)}
    </Table>;
}

const countryTableHeader = <thead>
<tr>
    <th>Flag</th>
    <th>Name</th>
    <th>Alpha Code 2</th>
    <th>Alpha Code 3</th>
    <th>Region</th>
    <th>Subregion</th>
    <th>Population</th>
    <th>Languages</th>
</tr>
</thead>;

function countryTableBody(tableContent: CountrySearchResults) {
    return <tbody>
        {tableContent.countryInfos.map((country: CountryInfo) => {
            return <CountryTableEntry
                flagImage={country.flagImage}
                fullName={country.fullName}
                alphaCode2={country.alphaCode2}
                alphaCode3={country.alphaCode3}
                region={country.region}
                subregion={country.subregion}
                population={country.population}
                languages={country.languages} />;
        })}
    </tbody>;
}
