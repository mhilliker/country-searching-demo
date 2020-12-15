import React, { FunctionComponent } from 'react';
import { CountrySearchResults } from '../Common/CountrySearchResults';


interface Region {
    count: number;
    subregions: { [subregionName: string]: number };
}

interface SummaryData {
    totalRows: number;
    regions: { [regionName: string]: Region };
}

interface SummaryResult {
    region: string;
    subregion: string;
    count: number;
}

interface CountrySummaryProps {
    tableContent: CountrySearchResults;
}

export const CountrySummary: FunctionComponent<CountrySummaryProps> = (props: CountrySummaryProps) => {
    const summaryData = getSummaryData(props.tableContent);

    return <div className="summaryTableContainer">
        <h5>Region Summary</h5>
        {getSummaryTable(summaryData)}
    </div>
}

function getSummaryData(tableContent: CountrySearchResults): SummaryResult[] {
    const summary = {
        totalRows: tableContent.countryInfos.length,
        regions: {}
    } as SummaryData;

    // construct counts using dictionaries
    for (const info of tableContent.countryInfos) {
        if (!info.region || !info.subregion) { continue; }

        if (!summary.regions[info.region]) {
            summary.regions[info.region] = { count: 0, subregions: {} };
        }
        summary.regions[info.region].count++;
        if (!summary.regions[info.region].subregions[info.subregion]) {
            summary.regions[info.region].subregions[info.subregion] = 0;
        }
        summary.regions[info.region].subregions[info.subregion]++;
    }

    // tabulate counts from the dictionaries
    const finalResults: SummaryResult[] = [];
    finalResults.push({ region: "Total Countries", subregion: "All", count: summary.totalRows });
    for (const regionName in summary.regions) {
        const region = summary.regions[regionName];
        finalResults.push({ region: regionName, subregion: "All", count: region.count });
        for (const subregionName in region.subregions) {
            const subregionCount = region.subregions[subregionName];
            finalResults.push({ region: regionName, subregion: subregionName, count: subregionCount });
        }
    }

    return finalResults;
}

function getSummaryTable(summaryData: SummaryResult[]) {
    return <table className="summaryTable">
        <thead>
            <tr>
                <th>Region</th>
                <th>Subregion</th>
                <th>Count</th>
            </tr>
        </thead>
        <tbody>
            {summaryData.map((result: SummaryResult) => {
                const rowClass = result.subregion === "All" ? "boldRow" : "";
                return <tr className={rowClass}>
                    <td>{result.region}</td>
                    <td>{result.subregion}</td>
                    <td>{result.count}</td>
                </tr>
            })}
        </tbody>
    </table>;
}