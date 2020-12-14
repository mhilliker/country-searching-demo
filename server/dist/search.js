"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.searchRouter = express_1.default.Router();
exports.searchRouter.get("/:queryText", (req, res) => {
    const queryText = req.params.queryText;
    if (!queryText) {
        res.json({ results: [], errorMessage: "Invalid request" });
        return;
    }
});
//# sourceMappingURL=search.js.map