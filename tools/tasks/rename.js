var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var minimatch = require('../lib/resourcemanager').minimatch;
var RenamePlugin = /** @class */ (function () {
    function RenamePlugin(options) {
        this.options = options;
        this.verboseInfo = [];
        // matchers: [
        //     { from: "**/*.js", to: "js/[name]_[hash].js" },
        //     { from: "resource/**/**", to: "[path][name]_[hash].[ext]" }
        // ]
        if (!this.options) {
            this.options = { hash: 'crc32', matchers: [] };
        }
    }
    RenamePlugin.prototype.onFile = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, match, name, extname, hash, p, toFilename;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.options.matchers; _i < _a.length; _i++) {
                    match = _a[_i];
                    if (minimatch(file.origin, match.from)) {
                        name = path.basename(file.origin, path.extname(file.origin));
                        extname = path.extname(file.origin).substr(1);
                        hash = generateCrc32Code(file.contents);
                        p = path.dirname(file.origin) + "/";
                        toFilename = match.to.replace('[name]', name).replace('[hash]', hash).replace('[ext]', extname).replace("[path]", p);
                        file.path = file.base + '/' + toFilename;
                        if (this.options.verbose) {
                            console.log("RenamePlugin: " + file.origin + " => " + toFilename);
                        }
                        break;
                    }
                }
                return [2 /*return*/, file];
            });
        });
    };
    RenamePlugin.prototype.onFinish = function (pluginContext) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return RenamePlugin;
}());
exports.RenamePlugin = RenamePlugin;
function generateCrc32Code(buffer) {
    var crc32 = globals.getCrc32();
    var crc32code = crc32(buffer);
    return crc32code;
}
