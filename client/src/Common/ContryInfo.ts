export interface CountryInfo {
    fullName: string;
    alphaCode2?: string;
    alphaCode3?: string;
    flagImage?: string;
    region?: string;
    subregion?: string;
    population?: number;
    languages: string[];
  }