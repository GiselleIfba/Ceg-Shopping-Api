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

// src/server/controllers/produtos/GetById.ts
var GetById_exports = {};
__export(GetById_exports, {
  getById: () => getById,
  getIdProductValidator: () => getIdProductValidator
});
module.exports = __toCommonJS(GetById_exports);

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

// src/server/shared/services/produtos/getProductById.ts
var getProductByIdService = (id) => __async(void 0, null, function* () {
  try {
    connect();
    const product = yield prisma.product.findUnique({ where: { id } });
    const productStore = yield prisma.product.findUnique({ where: { id } }).store();
    const productComments = yield prisma.comments.findMany({ where: { product_commentedId: id } });
    const T = yield prisma.user.findMany({ where: { comments: { some: { product_commentedId: id } } } });
    return { product, productStore, productComments, T };
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/produtos/GetById.ts
var import_zod = require("zod");

// src/server/shared/middleware/Validation.ts
var validation = (field, schema) => (req, res, next) => __async(void 0, null, function* () {
  try {
    yield schema.parse(req[field]);
    console.log(`valitadion sucesss`);
    next();
  } catch (error) {
    res.status(400).send(`a paramater is required:${error}`);
  }
});

// src/server/shared/middleware/ValidationGet.ts
var voidGetCheck = (value, res) => {
  if (!value) {
    return res.json({ message: "not found" }).status(401);
  } else {
    return res.json({ message: "sucess", data: value }).status(200);
  }
};

// src/server/controllers/produtos/GetById.ts
var schemaP = import_zod.z.object({
  id: import_zod.z.string()
});
var getIdProductValidator = validation("params", schemaP);
var getById = (req, res) => __async(void 0, null, function* () {
  try {
    const id = req.params.id;
    const productById = yield getProductByIdService(id);
    voidGetCheck(productById, res);
  } catch (error) {
    res.json({ message: "error", error }).status(401);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getById,
  getIdProductValidator
});
