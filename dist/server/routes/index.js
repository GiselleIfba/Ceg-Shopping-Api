"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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

// src/server/routes/index.ts
var routes_exports = {};
__export(routes_exports, {
  router: () => router
});
module.exports = __toCommonJS(routes_exports);
var import_express = require("express");

// src/server/controllers/produtos/Create.ts
var Create_exports = {};
__export(Create_exports, {
  create: () => create
});

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

// src/server/shared/middleware/products/create/ProductValidation.ts
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

// src/server/shared/middleware/products/create/ProductValidation.ts
var ProductSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(3),
  url_img: import_zod2.z.string().array(),
  price_in_cent: import_zod2.z.number().positive(),
  desc: import_zod2.z.string().optional(),
  category: import_zod2.z.nativeEnum(ECategoryTypes),
  options: import_zod2.z.string().array().max(8, "8 \xE9 o n\xFAmero m\xE1ximo de op\xE7\xF5es")
});
function ProductValidation(data) {
  ProductSchema.parse(data);
}

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

// src/server/shared/middleware/products/create/VerifyStore.ts
function VerifyStore(data, res, storeId) {
  return __async(this, null, function* () {
    let verify = false;
    let ide = "";
    try {
      connect();
      yield prisma.store.findUnique({
        where: { id: storeId }
      }).then((response) => response ? ide = response.id : "").then((response) => response ? verify = true : verify = false);
      if (verify) {
        createProductService(res, data, ide);
      } else {
        res.send(`this store cannot exist: ${data.storeId}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error", error }).status(500);
    } finally {
      yield prisma.$disconnect();
    }
  });
}

// src/server/shared/middleware/products/create/CreateProduct.ts
function CreateProductMiddleware(res, data, storeId) {
  ProductValidation(data);
  const datavalidation = new CategoryMidlleware(data.category, data.subCategory, res);
  datavalidation.validationCategoryAndSubCategory();
  VerifyStore(data, res, storeId);
}

// src/server/controllers/produtos/Create.ts
var create = (req, res) => __async(void 0, null, function* () {
  CreateProductMiddleware(res, req.body, req.params.storeId);
});

// src/server/controllers/produtos/Delete.ts
var Delete_exports = {};
__export(Delete_exports, {
  delet: () => delet
});

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
var import_zod3 = require("zod");
var testi = import_zod3.z.string().length(24, { message: "Must be exactly 14 characters long" });
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

// src/server/shared/services/produtos/deleteProduct.ts
var deleteProductsService = (id, res) => __async(void 0, null, function* () {
  try {
    connect();
    yield prisma.product.delete({
      where: {
        id
      }
    });
    return res.json({ message: `product with id: ${id} deleted` }).status(200);
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/produtos/Delete.ts
var delet = (req, res) => __async(void 0, null, function* () {
  console.log(req.params.id);
  const id = req.params.id || "";
  TestingId(id, res);
  deleteProductsService(id, res);
});

// src/server/controllers/produtos/GetAll.ts
var GetAll_exports = {};
__export(GetAll_exports, {
  getAll: () => getAll
});

// src/server/shared/services/produtos/getProduct.ts
var getAllProductsService = () => __async(void 0, null, function* () {
  try {
    connect();
    const result = yield prisma.product.findMany();
    return result;
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/produtos/GetAll.ts
var getAll = (req, res) => __async(void 0, null, function* () {
  try {
    const products = yield getAllProductsService();
    return res.json({ products }).status(200);
  } catch (error) {
    res.json({ message: "error", error }).status(500);
  }
});

// src/server/controllers/produtos/GetById.ts
var GetById_exports = {};
__export(GetById_exports, {
  getById: () => getById,
  getIdProductValidator: () => getIdProductValidator
});

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
var import_zod4 = require("zod");

// src/server/shared/middleware/ValidationGet.ts
var voidGetCheck = (value, res) => {
  if (!value) {
    return res.json({ message: "not found" }).status(401);
  } else {
    return res.json({ message: "sucess", data: value }).status(200);
  }
};

// src/server/controllers/produtos/GetById.ts
var schemaP = import_zod4.z.object({
  id: import_zod4.z.string()
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

// src/server/controllers/produtos/Update.ts
var Update_exports = {};
__export(Update_exports, {
  update: () => update
});

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
var import_zod5 = require("zod");
var EUpdateType = /* @__PURE__ */ ((EUpdateType2) => {
  EUpdateType2["updateOne"] = "updateOne";
  EUpdateType2["updateOneCategory"] = "updateOneCategory";
  return EUpdateType2;
})(EUpdateType || {});
var updateTypeschema = import_zod5.z.nativeEnum(EUpdateType);
var idSchema = import_zod5.z.string().length(24, "Must be exactly 24 characters long");
var OldCategory = import_zod5.z.string().toLowerCase();
var productSchema = import_zod5.z.object({
  name: import_zod5.z.string(),
  url_img: import_zod5.z.string().array(),
  price_in_cent: import_zod5.z.number().positive(),
  category: import_zod5.z.string().toLowerCase(),
  desc: import_zod5.z.string().optional(),
  subCategory: import_zod5.z.string(),
  options: import_zod5.z.string().array()
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

// src/server/controllers/produtos/search.ts
var search_exports = {};
__export(search_exports, {
  search: () => search
});

// src/server/shared/services/produtos/searchProduct.ts
var SearchProducts = (value) => __async(void 0, null, function* () {
  try {
    connect();
    const result = yield prisma.product.findMany({
      where: {
        OR: [
          {
            name: { contains: value }
          },
          {
            category: { contains: value }
          },
          { subCategory: { contains: value } }
        ]
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/produtos/search.ts
var search = (req, res) => __async(void 0, null, function* () {
  try {
    const result = yield SearchProducts(req.query.filter);
    voidGetCheck(result, res);
  } catch (error) {
    console.log(error);
  }
});

// src/server/controllers/produtos/CreateMany.ts
var CreateMany_exports = {};
__export(CreateMany_exports, {
  createMany: () => createMany
});
var import_zod6 = require("zod");

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
var ArrayProductSchema = import_zod6.z.array(import_zod6.z.object({
  name: import_zod6.z.string().min(3),
  url_img: import_zod6.z.string().array(),
  price_in_cent: import_zod6.z.number().positive(),
  desc: import_zod6.z.string().optional(),
  subCategory: import_zod6.z.string(),
  category: import_zod6.z.nativeEnum(ECategoryTypes),
  options: import_zod6.z.string().array().max(8, "8 \xE9 o n\xFAmero m\xE1ximo de op\xE7\xF5es")
}));
var createMany = (req, res) => __async(void 0, null, function* () {
  const P = req.body.products;
  const storeId = req.params.storeId;
  ArrayProductSchema.parse(P);
  CreateManyProductsMiddleware(P, res, storeId);
});

// src/server/controllers/produtos/index.ts
var ProdutoController = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Create_exports), GetAll_exports), GetById_exports), Delete_exports), Update_exports), search_exports), CreateMany_exports);

// src/server/controllers/users/Create.ts
var Create_exports2 = {};
__export(Create_exports2, {
  create: () => create2
});

// src/server/shared/services/user/createUser.ts
var createUserService = (data, res) => __async(void 0, null, function* () {
  try {
    connect();
    yield prisma.user.create({
      data
    });
    return res.status(201).json(`created user:${data.first_name}`);
  } catch (error) {
    res.status(500).json({ message: "internal Prisma error" });
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/shared/middleware/user/create/CreateUser.ts
var import_zod7 = require("zod");
var UserSchema = import_zod7.z.object({
  first_name: import_zod7.z.string().min(3),
  last_name: import_zod7.z.string().min(3),
  url_img: import_zod7.z.string().url().optional(),
  email: import_zod7.z.string().email(),
  password: (0, import_zod7.string)()
});
var CreateUserMiddleware = (user, res) => {
  UserSchema.parse(user);
  const { email } = user;
  function VerifyUserExist(email2) {
    return __async(this, null, function* () {
      try {
        connect();
        const verify = yield prisma.user.findFirst({
          where: { email: email2 }
        });
        if (verify) {
          throw res.send(`exist a user with this email: ${email2}`);
        }
        createUserService(user, res);
      } catch (error) {
        res.json({ message: "internal verify error" }).status(500);
      } finally {
        yield prisma.$disconnect();
      }
    });
  }
  VerifyUserExist(email);
};

// src/server/controllers/users/Create.ts
var import_bcrypt = __toESM(require("bcrypt"));
var create2 = (req, res) => __async(void 0, null, function* () {
  const { id, first_name, last_name, url_img, email, password } = req.body;
  const hashPassword = yield import_bcrypt.default.hash(password, 10);
  const newUser = {
    id,
    first_name,
    last_name,
    url_img,
    email,
    password: hashPassword
  };
  CreateUserMiddleware(newUser, res);
});

// src/server/controllers/users/Delete.ts
var Delete_exports2 = {};
__export(Delete_exports2, {
  delet: () => delet2
});
var delet2 = () => __async(void 0, null, function* () {
});

// src/server/controllers/users/GetUser.ts
var GetUser_exports = {};
__export(GetUser_exports, {
  getUser: () => getUser
});

// src/server/shared/middleware/Authorization.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
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

// src/server/controllers/users/Update.ts
var Update_exports2 = {};
__export(Update_exports2, {
  update: () => update2
});
var update2 = () => __async(void 0, null, function* () {
});

// src/server/controllers/users/index.ts
var UserController = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Create_exports2), GetUser_exports), Delete_exports2), Update_exports2);

// src/server/controllers/store/CreateStore.ts
var CreateStore_exports = {};
__export(CreateStore_exports, {
  create: () => create3
});

// src/server/shared/middleware/store/CreateStore.ts
var import_zod8 = require("zod");

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
var StoreSchema = import_zod8.z.object({
  name: import_zod8.z.string().min(3),
  email: import_zod8.z.string().email("email format is required"),
  password: import_zod8.z.string(),
  url_img: import_zod8.z.string().url(),
  cnpj: import_zod8.z.number(),
  desc: import_zod8.z.string().optional()
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
var create3 = (req, res) => __async(void 0, null, function* () {
  CreateStoreMiddleware(res, req.body);
});

// src/server/controllers/store/index.ts
var StoreController = __spreadValues({}, CreateStore_exports);

// src/server/controllers/commnets/Create.ts
var Create_exports3 = {};
__export(Create_exports3, {
  create: () => create4
});

// src/server/shared/middleware/comment/CreateComment.ts
var import_zod9 = require("zod");

// src/server/shared/services/comment/create/createComment.ts
var CreateCommentService = (commentquery, comment, res) => __async(void 0, null, function* () {
  try {
    connect();
    yield prisma.comments.create({
      data: {
        title: comment.title,
        authorId: commentquery.user,
        product_commentedId: commentquery.product,
        stars: comment.stars
      }
    });
    return res.json(`created comment:${comment.title}`).status(201);
  } catch (error) {
    res.json({ message: "internal Prisma error" }).status(500);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/shared/middleware/comment/VerifyProduct.ts
function VerifyProduct(commentquery, comment, res) {
  return __async(this, null, function* () {
    let verify = false;
    try {
      connect();
      yield prisma.product.findFirst({
        where: { id: commentquery.product }
      }).then((response) => response ? verify = true : verify = false);
      res.send("passou para service" + verify);
      if (verify) {
        CreateCommentService(commentquery, comment, res);
      } else {
        res.send(`this product cannot exist: ${commentquery.product}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      yield prisma.$disconnect();
    }
  });
}

// src/server/shared/middleware/comment/VerifyUser.ts
function VerifyUser(commentquery, comment, res) {
  return __async(this, null, function* () {
    let verify = false;
    try {
      connect();
      yield prisma.user.findFirst({
        where: { id: commentquery.user }
      }).then((response) => response ? verify = true : verify = false);
      res.send("passou para o verify product" + verify);
      if (verify) {
        VerifyProduct(commentquery, comment, res);
      } else {
        res.send(`this user cannot exist: ${commentquery.user}`);
      }
    } catch (error) {
      res.json({ message: "internal verify error" }).status(500);
    } finally {
      yield prisma.$disconnect();
    }
  });
}

// src/server/shared/middleware/comment/CreateComment.ts
var CommentSchema = import_zod9.z.object({
  title: import_zod9.z.string().max(100, { message: "o n\xFAmero m\xE1ximo de caracteres \xE9 100" }),
  stars: import_zod9.z.number().lte(5, { message: "as estrelas n\xE3o podem ser maior que 5 por user" }).nonnegative({ message: "as estrelas devem ser um n\xFAmero positivo ou 0" })
});
function CreateCommentMiddleware(commentquery, comment, res) {
  CommentSchema.parse(comment);
  VerifyUser(commentquery, comment, res);
}

// src/server/controllers/commnets/Create.ts
var create4 = (req, res, next) => __async(void 0, null, function* () {
  const { authorization } = req.headers;
  const pass = authorization || "";
  Authorization(pass, res, next);
  CreateCommentMiddleware(req.query, req.body, res);
});

// src/server/controllers/commnets/index.ts
var CommentController = __spreadValues({}, Create_exports3);

// src/server/controllers/users/login/Login.ts
var Login_exports = {};
__export(Login_exports, {
  login: () => login
});
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var import_bcrypt2 = __toESM(require("bcrypt"));
var login = (req, res) => __async(void 0, null, function* () {
  var _a;
  const { email, password } = req.body;
  try {
    connect();
    const userExist = yield prisma.user.findUnique({ where: { email } });
    if (!userExist) {
      throw res.json({ message: "this user email dont exist" });
    }
    const verifyPass = import_bcrypt2.default.compare(password, userExist.password);
    if (!verifyPass) {
      throw res.json({ message: "this user password dont exist" });
    }
    const token = import_jsonwebtoken2.default.sign({ id: userExist.id }, (_a = process.env.JWT_PASS) != null ? _a : "", { expiresIn: "1h" });
    res.json({ user: { id: userExist.id, url_img: userExist.url_img }, token });
  } catch (error) {
    console.log(`error:${error}`);
  } finally {
    yield prisma.$disconnect();
  }
});

// src/server/controllers/users/login/index.ts
var UserLoginController = __spreadValues({}, Login_exports);

// src/server/routes/index.ts
var router = (0, import_express.Router)();
router.get("/search/value?", ProdutoController.search);
router.post("/produtos/:storeId", ProdutoController.create);
router.post("/produtos/createmany/:storeId", ProdutoController.createMany);
router.patch("/produtosup/:id", ProdutoController.update);
router.delete("/produtos/:id", ProdutoController.delet);
router.get("/produtos", ProdutoController.getAll);
router.get("/produtos/:id", ProdutoController.getIdProductValidator, ProdutoController.getById);
router.get("/teste");
router.post("/user", UserController.create);
router.post("/getuser", UserController.getUser);
router.post("/login", UserLoginController.login);
router.post("/store", StoreController.create);
router.post("/comment", CommentController.create);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
