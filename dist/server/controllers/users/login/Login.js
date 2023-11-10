"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/server/controllers/users/login/Login.ts
var Login_exports = {};
__export(Login_exports, {
  login: () => login
});
module.exports = __toCommonJS(Login_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/server/shared/services/prisma/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();

// src/server/database/index.ts
function connect() {
  return __async(this, null, function* () {
    try {
      yield prisma.$connect();
      console.log("Database connected sucess");
    } catch (error) {
      console.log("Database connected unsucessull");
    }
  });
}

// src/server/controllers/users/login/Login.ts
var import_bcrypt = __toESM(require("bcrypt"));
var login = (req, res) => __async(void 0, null, function* () {
  var _a;
  const { email, password } = req.body;
  try {
    connect();
    const userExist = yield prisma.user.findUnique({ where: { email } });
    if (!userExist) {
      throw res.json({ message: "this user email dont exist" });
    }
    const verifyPass = import_bcrypt.default.compare(password, userExist.password);
    if (!verifyPass) {
      throw res.json({ message: "this user password dont exist" });
    }
    const token = import_jsonwebtoken.default.sign({ id: userExist.id }, (_a = process.env.JWT_PASS) != null ? _a : "", { expiresIn: "1h" });
    res.json({ user: { id: userExist.id, url_img: userExist.url_img }, token });
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    yield prisma.$disconnect();
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login
});
