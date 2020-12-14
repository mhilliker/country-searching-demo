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
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const countrysearch_1 = require("./countrysearch");
exports.searchRouter = express_1.default.Router();
exports.searchRouter.get("/:queryText", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const queryText = req.params.queryText;
    if (!queryText) {
        res.json({ results: [], errorMessage: "Invalid request" });
        return;
    }
    const dataFetcher = new countrysearch_1.SearchDataFetcher(queryText);
    let results;
    try {
        results = yield dataFetcher.search();
    }
    catch (e) {
        console.error(e);
    }
    if (!results) {
        res.json({ results: [], errorMessage: "No results found" });
        return;
    }
    res.json({ results });
}));
//# sourceMappingURL=search.js.map