import express from "express";
import { SearchDataFetcher } from "./countrysearch";

export const searchRouter = express.Router();

searchRouter.get("/:queryText", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    const queryText: string = req.params.queryText;

    if (!queryText) {
        res.json({ results: [], errorMessage: "Invalid request" });
        return;
    }

    const dataFetcher = new SearchDataFetcher(queryText);
    let results;
    try {
        results = await dataFetcher.search();
    } catch (e) {
        console.error(e);
    }

    if (!results) {
        res.json({ results: [], errorMessage: "No results found" });
        return;
    }

    res.json({ results });
});