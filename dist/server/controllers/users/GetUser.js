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

// src/server/controllers/users/GetUser.ts
var GetUser_exports = {};
__export(GetUser_exports, {
  getUser: () => getUser
});
module.exports = __toCommonJS(GetUser_exports);

// src/server/shared/middleware/Authorization.ts
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

// src/server/shared/middleware/Authorization.ts
function Authorization(authorization, res, next) {
  return __async(this, null, function* () {
    var _a;
    if (!authorization) {
      throw res.status(401).json({ message: "unauthorized" });
    }
    const token = authorization.split(" ")[1];
    const { id } = import_jsonwebtoken.default.verify(token, (_a = process.env.JWT_PASS) != null ? _a : "");
    try {
      connect();
      const userExist = yield prisma.user.findUnique({ where: { id } });
      if (!userExist) {
        throw res.json({ message: "unauthorized" });
      }
      next();
    } catch (error) {
      console.log(`error:${error}`);
    } finally {
      yield prisma.$disconnect();
    }
  });
}

// src/server/shared/services/user/getUser.ts
var getUserService = (id, res) => __async(void 0, null, function* () {
  try {
    connect();
    const user = yield prisma.user.findUnique({
      where: { id }
    });
    return res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "internal Prisma error" });
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/users/GetUser.ts
var getUser = (req, res, next) => __async(void 0, null, function* () {
  const { authorization } = req.headers;
  const id = req.body.id;
  const pass = authorization || "";
  Authorization(pass, res, next);
  getUserService(id, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUser
});
