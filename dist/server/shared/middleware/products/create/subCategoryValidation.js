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

// src/server/shared/middleware/products/create/subCategoryValidation.ts
var subCategoryValidation_exports = {};
__export(subCategoryValidation_exports, {
  CategoryMidlleware: () => CategoryMidlleware
});
module.exports = __toCommonJS(subCategoryValidation_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategoryMidlleware
});
