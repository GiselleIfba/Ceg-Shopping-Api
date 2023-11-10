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

// src/server/shared/middleware/products/create/ProductValidation.ts
var ProductValidation_exports = {};
__export(ProductValidation_exports, {
  ProductValidation: () => ProductValidation
});
module.exports = __toCommonJS(ProductValidation_exports);
var import_zod = require("zod");

// src/server/shared/model/product/Produto.ts
var ECategoryTypes = /* @__PURE__ */ ((ECategoryTypes2) => {
  ECategoryTypes2["esporte"] = "esporte";
  ECategoryTypes2["informatica"] = "informatica";
  ECategoryTypes2["celular"] = "celular";
  ECategoryTypes2["bebida"] = "bebida";
  ECategoryTypes2["eletrodomestico"] = "eletrodomestico";
  ECategoryTypes2["ferramenta"] = "ferramenta";
  ECategoryTypes2["brinquedo"] = "brinquedo";
  ECategoryTypes2["moda"] = "moda";
  ECategoryTypes2["automovel"] = "automovel";
  return ECategoryTypes2;
})(ECategoryTypes || {});

// src/server/shared/middleware/products/create/ProductValidation.ts
var ProductSchema = import_zod.z.object({
  name: import_zod.z.string().min(3),
  url_img: import_zod.z.string().array(),
  price_in_cent: import_zod.z.number().positive(),
  desc: import_zod.z.string().optional(),
  category: import_zod.z.nativeEnum(ECategoryTypes),
  options: import_zod.z.string().array().max(8, "8 \xE9 o n\xFAmero m\xE1ximo de op\xE7\xF5es")
});
function ProductValidation(data) {
  ProductSchema.parse(data);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProductValidation
});
