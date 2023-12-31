"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = require("express");
var app = express_1();
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
app.use(express_1.json()); // JSON ボディをパースするためのミドルウェア
app.use(cookie_parser_1());
app.use(cors_1());
app.use(express_1.urlencoded({ extended: true }));
app.use(express_1.static("src/static"));
var client = new client_1.PrismaClient();
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var questions;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/, client.questions.findMany()];
        case 1:
          questions = _a.sent();
          return [2 /*return*/, questions];
      }
    });
  });
}
//平文を増やす関数
function addHirabun(sentence) {
  return __awaiter(this, void 0, void 0, function () {
    var newQuestion;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            client.questions.create({
              data: { EnglishSentences: sentence },
            }),
          ];
        case 1:
          newQuestion = _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
app.get("/data", function (request, response) {
  return __awaiter(void 0, void 0, void 0, function () {
    var data, serializedData, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, main()];
        case 1:
          data = _a.sent();
          serializedData = JSON.stringify(data, function (key, value) {
            return typeof value === "bigint" ? value.toString() : value;
          });
          response.json(JSON.parse(serializedData)); // JSON形式でデータを返す
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          console.error(error_1);
          response.status(500).json({ error: "An error occurred." });
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
});
app.post("/addHirabun", function (request, response) {
  var hirabun = request.body.hirabun;
  addHirabun(hirabun);
});
// addHirabun("I have a pen.")
//cookie関連
app.post("/sendUserName", function (req, res) {
  var _a = req.body,
    username = _a.username,
    password = _a.password;
  // ユーザー名とパスワードのバリデーション（簡易的な例）
  if (username === "validuser" && password === "password123") {
    // ログイン成功時、Cookie にデータを保存
    res.cookie("username", username, { httpOnly: true });
    res.json({ success: true, message: "ログイン成功" });
  } else {
    res.json({ success: false, message: "ログイン失敗" });
  }
});
app.listen(3000);
