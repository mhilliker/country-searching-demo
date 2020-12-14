"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDataFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = "https://restcountries.eu/rest/v2/";
class SearchDataFetcher {
    constructor(searchText) {
        this.searchText = "";
        this.searchText = encodeURIComponent(searchText);
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            // run the 3 search types, then merge results
            const namePromise = this.searchByName();
            const fullNamePromise = this.searchByFullName();
            const codePromise = this.searchByCode();
            const results = yield Promise.all([namePromise, fullNamePromise, codePromise]);
            const mergedResults = this.mergeResults(results);
            const mergedAndSortedResults = this.sortResults(mergedResults);
            return mergedAndSortedResults;
        });
    }
    searchByName() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = baseUrl + "name/" + this.searchText;
            const data = yield this.fetchData(url);
            const results = data.map(extractResultInfo);
            return results;
        });
    }
    searchByFullName() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = baseUrl + "name/" + this.searchText + "?fullText=true";
            const data = yield this.fetchData(url);
            const results = data.map(extractResultInfo);
            return results;
        });
    }
    searchByCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = baseUrl + "alpha/" + this.searchText;
            const data = yield this.fetchData(url);
            const results = data.map(extractResultInfo);
            return results;
        });
    }
    fetchData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { data: [] };
            try {
                response = yield axios_1.default.get(url);
            }
            catch (_a) {
                response = { data: [] };
            }
            let data = (response === null || response === void 0 ? void 0 : response.data) || [];
            if (!Array.isArray(data)) {
                data = [data];
            }
            return data;
        });
    }
    mergeResults(resultArrays) {
        const results = [];
        const seenResults = {};
        for (const resultArray of resultArrays) {
            for (const result of resultArray) {
                if (seenResults[result.fullName]) {
                    continue;
                }
                seenResults[result.fullName] = true;
                results.push(result);
            }
        }
        return results;
    }
    sortResults(results) {
        return results.sort((a, b) => b.population - a.population);
    }
}
exports.SearchDataFetcher = SearchDataFetcher;
function extractResultInfo(rawData) {
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
function extractLanguages(languageObject) {
    return (languageObject === null || languageObject === void 0 ? void 0 : languageObject.name) || "";
}
//# sourceMappingURL=countrysearch.js.map