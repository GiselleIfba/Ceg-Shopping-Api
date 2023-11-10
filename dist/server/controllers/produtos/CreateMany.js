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

// src/server/controllers/produtos/CreateMany.ts
var CreateMany_exports = {};
__export(CreateMany_exports, {
  createMany: () => createMany
});
module.exports = __toCommonJS(CreateMany_exports);
var import_zod2 = require("zod");

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

// src/server/shared/middleware/products/create/subCategoryValidation.ts
var import_zod = require("zod");
var ECategoryModaType = /* @__PURE__ */ ((ECategoryModaType2) => {
  ECategoryModaType2["infantil"] = "infantil";
  ECategoryModaType2["feminina"] = "feminina";
  ECategoryModaType2["masculina"] = "masculina";
  ECategoryModaType2["moletom"] = "moletom";
  ECategoryModaType2["vestido"] = "vestido";
  ECategoryModaType2["camisa"] = "camisa";
  return ECategoryModaType2;
})(ECategoryModaType || {});
var ECategoryEsporteType = /* @__PURE__ */ ((ECategoryEsporteType2) => {
  ECategoryEsporteType2["camisa"] = "camisa";
  ECategoryEsporteType2["tenis"] = "tenis";
  ECategoryEsporteType2["bola"] = "bola";
  ECategoryEsporteType2["esporte_quadra"] = "esporte de quadra";
  ECategoryEsporteType2["luta"] = "luta";
  ECategoryEsporteType2["esporte_aquatico"] = "esporte aquatico";
  ECategoryEsporteType2["esporte_praia"] = "esporte de praia";
  return ECategoryEsporteType2;
})(ECategoryEsporteType || {});
var ECategoryInformaticaType = /* @__PURE__ */ ((ECategoryInformaticaType2) => {
  ECategoryInformaticaType2["notebook"] = "notebook";
  ECategoryInformaticaType2["processador"] = "processador";
  ECategoryInformaticaType2["ram"] = "ram";
  ECategoryInformaticaType2["placa_mae"] = "placa mae";
  ECategoryInformaticaType2["monitor"] = "monitor";
  ECategoryInformaticaType2["placa_Dvideo"] = "placa de video";
  ECategoryInformaticaType2["mouse_teclado"] = "mouse teclado";
  ECategoryInformaticaType2["tablet"] = "tablet";
  ECategoryInformaticaType2["kit_hardware"] = "kit hardware";
  return ECategoryInformaticaType2;
})(ECategoryInformaticaType || {});
var ECategoryBebidaType = /* @__PURE__ */ ((ECategoryBebidaType2) => {
  ECategoryBebidaType2["suco"] = "suco";
  ECategoryBebidaType2["refrigerante"] = "refrigerante";
  ECategoryBebidaType2["leite"] = "leite";
  ECategoryBebidaType2["energetico"] = "energetico";
  ECategoryBebidaType2["tonico"] = "tonico";
  ECategoryBebidaType2["cerveja"] = "cerveja";
  ECategoryBebidaType2["vinho_Eespumante"] = "vinho e espumante";
  ECategoryBebidaType2["licor_Ewhisky"] = "licor e whisky";
  return ECategoryBebidaType2;
})(ECategoryBebidaType || {});
var ECategoryFerramentaType = /* @__PURE__ */ ((ECategoryFerramentaType2) => {
  ECategoryFerramentaType2["ferramenta_eletrica"] = "ferramenta eletrica";
  ECategoryFerramentaType2["ferramenta_manual"] = "ferramenta manual";
  ECategoryFerramentaType2["ferramenta_industrial"] = "ferramenta industrial";
  ECategoryFerramentaType2["ferramenta_medicao_instrumentacao"] = "ferramenta medicao instrumentacao";
  ECategoryFerramentaType2["ferramenta_pneumaticas"] = "ferramenta pneumaticas";
  return ECategoryFerramentaType2;
})(ECategoryFerramentaType || {});
var ECategoryBrinquedoType = /* @__PURE__ */ ((ECategoryBrinquedoType2) => {
  ECategoryBrinquedoType2["boneca"] = "boneca";
  ECategoryBrinquedoType2["boneco"] = "boneco";
  ECategoryBrinquedoType2["mini_veiculo"] = "mini veiculo";
  ECategoryBrinquedoType2["carrinho"] = "carrinho";
  ECategoryBrinquedoType2["pelucia"] = "pelucia";
  ECategoryBrinquedoType2["jogos"] = "jogos";
  ECategoryBrinquedoType2["bicicleta"] = "bicicleta";
  return ECategoryBrinquedoType2;
})(ECategoryBrinquedoType || {});
function subCategoryValidation(value, data) {
  const SubCategorySchema = import_zod.z.nativeEnum(value);
  SubCategorySchema.parse(data);
}
var CategoryMidlleware = class {
  constructor(category, subCategory, res) {
    this.category = category;
    this.subCategory = subCategory;
    this.res = res;
    this.category;
    this.subCategory;
  }
  validationCategoryAndSubCategory() {
    switch (this.category) {
      case "moda":
        subCategoryValidation(ECategoryModaType, this.subCategory);
        break;
      case "esporte":
        subCategoryValidation(ECategoryEsporteType, this.subCategory);
        break;
      case "informatica":
        subCategoryValidation(ECategoryInformaticaType, this.subCategory);
        break;
      case "celular":
        break;
      case "bebida":
        subCategoryValidation(ECategoryBebidaType, this.subCategory);
        break;
      case "eletrodomestico":
        break;
      case "ferramenta":
        subCategoryValidation(ECategoryFerramentaType, this.subCategory);
        break;
      case "brinquedo":
        subCategoryValidation(ECategoryBrinquedoType, this.subCategory);
        break;
      case "automovel":
        break;
      default:
        this.res.json({ message: "this category cannot exist" });
        break;
    }
  }
};

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

// src/server/shared/middleware/products/create/CreateManyProducts.ts
var CreateManyProductsMiddleware = (array, res, storeId) => __async(void 0, null, function* () {
  array.map((product, index) => {
    const datavalidation = new CategoryMidlleware(
      product.category,
      product.subCategory,
      res
    );
    datavalidation.validationCategoryAndSubCategory();
    function ITA() {
      return __async(this, null, function* () {
        try {
          connect();
          const response = yield prisma.store.findUnique({
            where: { id: storeId }
          });
          if (response) {
            createProductService(res, product, storeId);
            console.log(index);
          }
        } catch (error) {
          res.json({ message: "internal verify error" }).status(500);
        } finally {
          yield prisma.$disconnect();
        }
      });
    }
    ITA();
  });
  console.log("passou essa dgc");
});

// src/server/controllers/produtos/CreateMany.ts
var ArrayProductSchema = import_zod2.z.array(import_zod2.z.object({
  name: import_zod2.z.string().min(3),
  url_img: import_zod2.z.string().array(),
  price_in_cent: import_zod2.z.number().positive(),
  desc: import_zod2.z.string().optional(),
  subCategory: import_zod2.z.string(),
  category: import_zod2.z.nativeEnum(ECategoryTypes),
  options: import_zod2.z.string().array().max(8, "8 \xE9 o n\xFAmero m\xE1ximo de op\xE7\xF5es")
}));
var createMany = (req, res) => __async(void 0, null, function* () {
  const P = req.body.products;
  const storeId = req.params.storeId;
  ArrayProductSchema.parse(P);
  CreateManyProductsMiddleware(P, res, storeId);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMany
});
