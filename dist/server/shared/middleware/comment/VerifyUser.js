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

// src/server/shared/middleware/comment/VerifyUser.ts
var VerifyUser_exports = {};
__export(VerifyUser_exports, {
  VerifyUser: () => VerifyUser
});
module.exports = __toCommonJS(VerifyUser_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VerifyUser
});
