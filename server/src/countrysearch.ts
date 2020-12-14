import axios from "axios";
import { CountryInfo } from "./CountryInfo";

const baseUrl = "https://restcountries.eu/rest/v2/";

export class SearchDataFetcher {
    
    private searchText: string = "";

    public constructor(searchText: string) {
        this.searchText = encodeURIComponent(searchText);
    }

    public async search(): Promise<CountryInfo[]> {
        // run the 3 search types, then merge results

        const namePromise = this.searchByName();
        const fullNamePromise = this.searchByFullName();
        const codePromise = this.searchByCode();

        const results = await Promise.all([namePromise, fullNamePromise, codePromise]);
        const mergedResults = this.mergeResults(results);
        const mergedAndSortedResults = this.sortResults(mergedResults);

        return mergedAndSortedResults;
    }

    private async searchByName(): Promise<CountryInfo[]> {
        const url = baseUrl + "name/" + this.searchText;
        const data: any[] = await this.fetchData(url);
        const results = data.map(extractResultInfo);
        return results;
    }

    private async searchByFullName(): Promise<CountryInfo[]> {
        const url = baseUrl + "name/" + this.searchText + "?fullText=true";
        const data: any[] = await this.fetchData(url);
        const results = data.map(extractResultInfo);
        return results;
    }

    private async searchByCode(): Promise<CountryInfo[]> {
        const url = baseUrl + "alpha/" + this.searchText;
        const data: any[] = await this.fetchData(url);
        const results = data.map(extractResultInfo);
        return results;
    }

    private async fetchData(url: string): Promise<CountryInfo[]> {
        let response = {data: []};
        try{
            response = await axios.get(url);
        } catch {
            response = {data: []};
        }
        let data: any[] = response?.data || [];
        if (!Array.isArray(data)) {
            data = [data];
        }
        return data;
    }

    private mergeResults(resultArrays: CountryInfo[][]): CountryInfo[] {
        const results = [];
        const seenResults = {};

        for (const resultArray of resultArrays) {
            for (const result of resultArray) {
                if (seenResults[result.fullName]) { continue; }
                seenResults[result.fullName] = true;
                results.push(result)
            }
        }
        return results;
    }

    private sortResults(results: CountryInfo[]): CountryInfo[] {
        return results.sort((a, b) => b.population - a.population);
    }
}

function extractResultInfo(rawData: any): CountryInfo {
    const languages = rawData.languages || [];
    const resultLanguages = languages.map(extractLanguages);

    return {
        fullName: rawData.name,
        languages: resultLanguages,
        alphaCode2: rawData.alpha2Code,
        alphaCode3: rawData.alpha3Code,
        region: rawData.region,
        subregion: rawData.subregion,
        population: rawData.population,
        flagImage: rawData.flag
    };
}

function extractLanguages(languageObject: any): string {
    return languageObject?.name || "";
}