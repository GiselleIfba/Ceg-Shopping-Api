"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/server/shared/services/user/getUser.ts
var getUser_exports = {};
__export(getUser_exports, {
  getUserService: () => getUserService
});
module.exports = __toCommonJS(getUser_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserService
});
