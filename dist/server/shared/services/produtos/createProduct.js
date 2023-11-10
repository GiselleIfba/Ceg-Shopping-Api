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

// src/server/shared/services/produtos/createProduct.ts
var createProduct_exports = {};
__export(createProduct_exports, {
  createProductService: () => createProductService
});
module.exports = __toCommonJS(createProduct_exports);

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

// src/server/shared/services/produtos/createProduct.ts
var createProductService = (res, data, id) => __async(void 0, null, function* () {
  const {
    category,
    name,
    options,
    price_in_cent,
    subCategory,
    url_img,
    desc
  } = data;
  try {
    connect();
    yield prisma.store.update({
      where: {
        id
      },
      data: {
        products: {
          create: {
            category,
            name,
            price_in_cent,
            subCategory,
            desc,
            options,
            url_img
          }
        }
      }
    });
    return res.json(`created product:${data.name}`).status(201);
  } catch (error) {
    res.json({ message: "internal Prisma error", error }).status(500);
  } finally {
    yield prisma.$disconnect();
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProductService
});
