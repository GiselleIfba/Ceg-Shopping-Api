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

// src/server/controllers/produtos/Update.ts
var Update_exports = {};
__export(Update_exports, {
  update: () => update
});
module.exports = __toCommonJS(Update_exports);

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

// src/server/shared/middleware/products/udpate/UpdateProdutcs.ts
var import_zod = require("zod");
var EUpdateType = /* @__PURE__ */ ((EUpdateType2) => {
  EUpdateType2["updateOne"] = "updateOne";
  EUpdateType2["updateOneCategory"] = "updateOneCategory";
  return EUpdateType2;
})(EUpdateType || {});
var updateTypeschema = import_zod.z.nativeEnum(EUpdateType);
var idSchema = import_zod.z.string().length(24, "Must be exactly 24 characters long");
var OldCategory = import_zod.z.string().toLowerCase();
var productSchema = import_zod.z.object({
  name: import_zod.z.string(),
  url_img: import_zod.z.string().array(),
  price_in_cent: import_zod.z.number().positive(),
  category: import_zod.z.string().toLowerCase(),
  desc: import_zod.z.string().optional(),
  subCategory: import_zod.z.string(),
  options: import_zod.z.string().array()
});
var PartialProduct = productSchema.partial({
  name: true,
  price_in_cent: true,
  url_img: true,
  category: true,
  subCategory: true,
  options: true
});
var PartialProductCategory = productSchema.partial({
  name: true,
  price_in_cent: true,
  url_img: true
});
function UpdateMiddleWare(value, res) {
  return __async(this, null, function* () {
    var _a, _b;
    const { id, data, updateType } = value;
    updateTypeschema.parse(updateType);
    const oldProduct = yield prisma.product.findUnique({
      where: { id }
    });
    if (oldProduct != null && oldProduct != void 0) {
      switch (updateType) {
        case "updateOne":
          idSchema.parse(id);
          productSchema.parse(oldProduct);
          PartialProduct.parse(data);
          if (data.category === "") {
            data.category = oldProduct.category;
          }
          if (data.name === "") {
            data.name = oldProduct.name;
          }
          if (data.price_in_cent === 1) {
            data.price_in_cent = oldProduct.price_in_cent;
          }
          if (data.desc === "") {
            data.desc = "esta descri\xE7\xE3o \xE9 meramente ilustrativa, nada escrito aqui deve ser considerado. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo reprehenderit sequi aspernatur laboriosam eligendi asperiores a dignissimos iste, quasi nisi. Impedit iusto, velit amet saepe odit sint eveniet laboriosam incidunt!Lorem ipsum dolor sit amet consectetur adipisicing elit";
          }
          if (((_a = data.url_img) == null ? void 0 : _a.length) === 0) {
            data.url_img = oldProduct.url_img;
          }
          if (data.subCategory === "") {
            data.subCategory = oldProduct.subCategory;
          }
          if (((_b = data.options) == null ? void 0 : _b.length) === 0) {
            data.options = oldProduct.options;
          }
          value.data = data;
          console.log(value.data);
          updateProductService(oldProduct, value, res);
          break;
        case "updateOneCategory":
          OldCategory.parse(oldProduct.category);
          PartialProductCategory.parse(data);
          updateProductService(oldProduct, value, res);
          break;
        default:
          console.log("algo deu errado");
          break;
      }
    }
  });
}

// src/server/controllers/produtos/Update.ts
var update = (req, res) => __async(void 0, null, function* () {
  const id = req.params.id || "";
  const updateType = req.body.updateType;
  const data = {
    id,
    name: req.body.data.name || "",
    url_img: req.body.data.url_img || [],
    price_in_cent: req.body.data.price_in_cent || 1,
    category: req.body.data.category || "",
    desc: req.body.data.desc || "",
    subCategory: req.body.data.subCategory || "",
    options: req.body.data.options || []
  };
  const dataUpdate = { id, data, updateType };
  console.log("tem que mudar as rotas de update", dataUpdate, res);
  UpdateMiddleWare(dataUpdate, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  update
});
