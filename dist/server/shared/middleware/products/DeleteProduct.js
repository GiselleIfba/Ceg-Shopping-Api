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

// src/server/shared/middleware/products/DeleteProduct.ts
var DeleteProduct_exports = {};
__export(DeleteProduct_exports, {
  TestingId: () => TestingId
});
module.exports = __toCommonJS(DeleteProduct_exports);

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

// src/server/shared/middleware/products/DeleteProduct.ts
var import_zod = require("zod");
var testi = import_zod.z.string().length(24, { message: "Must be exactly 14 characters long" });
function TestingId(id, res) {
  return __async(this, null, function* () {
    const tsta = validation("params", testi.parse(id));
    tsta;
    if (id === "") {
      return res.json({ message: "value is undefined" }).status(401);
    } else {
      return true;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TestingId
});
