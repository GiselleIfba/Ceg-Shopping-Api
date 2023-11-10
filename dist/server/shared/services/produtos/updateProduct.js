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

// src/server/shared/services/produtos/updateProduct.ts
var updateProduct_exports = {};
__export(updateProduct_exports, {
  updateProductService: () => updateProductService
});
module.exports = __toCommonJS(updateProduct_exports);

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

// src/server/shared/services/produtos/updateProduct.ts
function updateProductService(oldProductData, updateProduct, res) {
  return __async(this, null, function* () {
    switch (updateProduct.updateType) {
      case "updateOne":
        try {
          connect();
          yield prisma.product.update({
            where: {
              id: updateProduct.id
            },
            data: {
              name: updateProduct.data.name,
              category: updateProduct.data.category,
              desc: updateProduct.data.desc,
              price_in_cent: updateProduct.data.price_in_cent,
              url_img: updateProduct.data.url_img
            }
          });
          return res.json({
            "old product": `${oldProductData}`,
            "new product": `${updateProduct.data}`
          }).status(201);
        } catch (error) {
          res.json({ message: "internal error" }).status(500);
        } finally {
          yield prisma.$disconnect();
        }
        break;
      case "updateOneCategory":
        try {
          connect();
          yield prisma.product.updateMany({
            where: {
              category: { contains: oldProductData.category }
            },
            data: { category: updateProduct.data.category }
          });
        } catch (error) {
          res.json({ message: "internal error" }).status(500);
        } finally {
          yield prisma.$disconnect();
        }
        break;
      default:
        res.send("error: updateType must be updateManyCategory or updateOne ");
        break;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateProductService
});
