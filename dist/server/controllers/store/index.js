"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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

// src/server/controllers/store/index.ts
var store_exports = {};
__export(store_exports, {
  StoreController: () => StoreController
});
module.exports = __toCommonJS(store_exports);

// src/server/controllers/store/CreateStore.ts
var CreateStore_exports = {};
__export(CreateStore_exports, {
  create: () => create
});

// src/server/shared/middleware/store/CreateStore.ts
var import_zod = require("zod");

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

// src/server/shared/services/store/createStore.ts
var createStoreService = (res, data) => __async(void 0, null, function* () {
  try {
    connect();
    yield prisma.store.create({
      data
    });
    return res.json(`created store:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal error" }).status(500);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/shared/middleware/store/CreateStore.ts
var StoreSchema = import_zod.z.object({
  name: import_zod.z.string().min(3),
  email: import_zod.z.string().email("email format is required"),
  password: import_zod.z.string(),
  url_img: import_zod.z.string().url(),
  cnpj: import_zod.z.number(),
  desc: import_zod.z.string().optional()
});
function CreateStoreMiddleware(res, data) {
  StoreSchema.parse(data);
  const { email, cnpj } = data;
  let exist = false;
  function FindInDB() {
    return __async(this, null, function* () {
      try {
        connect();
        const result = yield prisma.store.findFirst({
          where: {
            OR: [
              {
                email
              },
              {
                cnpj
              }
            ]
          }
        }).then((response) => response ? exist = true : exist = false);
        console.log(result);
        return exist;
      } catch (error) {
        res.json({ message: "internal error" }).status(500);
      } finally {
        yield prisma.$disconnect();
      }
    });
  }
  FindInDB();
  if (exist) {
    res.json({ message: "this store exist" });
    console.log("this store exist");
  } else {
    createStoreService(res, data);
  }
}

// src/server/controllers/store/CreateStore.ts
var create = (req, res) => __async(void 0, null, function* () {
  CreateStoreMiddleware(res, req.body);
});

// src/server/controllers/store/index.ts
var StoreController = __spreadValues({}, CreateStore_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoreController
});
