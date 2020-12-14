"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const search_1 = require("./search");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use("/api/search", search_1.searchRouter);
app.get("/*", function (req, res) {
    res.send("Example backend");
});
const port = 3001;
console.log("checking port", port);
app.listen(port, () => {
    console.log(`Server now listening on port: ${port}`);
});
//# sourceMappingURL=app.js.map