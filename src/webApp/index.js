var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var puppeteer = require("puppeteer");
var scrapWebApp = function (targetPage, selector, anotherTargetWebApp) { return __awaiter(_this, void 0, void 0, function () {
    var browser, page, data, elements, charge, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (targetPage || selector) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                return [4 /*yield*/, puppeteer.launch()];
            case 2:
                browser = _a.sent();
                return [4 /*yield*/, browser.pages()];
            case 3:
                page = (_a.sent())[0];
                // Waits to the link so it can load complety all the scripts (like an SPA)
                return [4 /*yield*/, page.goto(targetPage, {
                        waitUntil: "networkidle0"
                    })];
            case 4:
                // Waits to the link so it can load complety all the scripts (like an SPA)
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () { return document.querySelector("*").outerHTML; })];
            case 5:
                data = _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        var selectedItems = document.querySelectorAll(selector); // And you can use selectors like a normal page: a[title]#video-title
                        var articles = [];
                        // If you use map instead of basic for loop, the code doesn't work
                        for (var i = 0; i < selectedItems.length; i++) {
                            var payload = {
                                innerText: selectedItems[i].innerText,
                                innerHtml: selectedItems[i].innerHTML
                            };
                            articles.push(payload);
                        }
                        return articles;
                    })];
            case 6:
                elements = _a.sent();
                if (!elements.length)
                    return [2 /*return*/, console.log("Error, not found")];
                if (!anotherTargetWebApp) return [3 /*break*/, 9];
                return [4 /*yield*/, page.goto(anotherTargetWebApp, {
                        waitUntil: "networkidle0"
                    })];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () { return document.querySelector("*").outerHTML; })];
            case 8:
                charge = _a.sent();
                _a.label = 9;
            case 9: 
            // Close browser when you don't need more that service
            return [4 /*yield*/, browser.close()];
            case 10:
                // Close browser when you don't need more that service
                _a.sent();
                console.log("🚀 ~ file: index.js ~ line 52 ~ scrapWebApp ~ elements", elements);
                return [3 /*break*/, 12];
            case 11:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
scrapWebApp('https://www.youtube.com/c/eltrece/featured', 'a', 'https://www.youtube.com/c/eltrece');
