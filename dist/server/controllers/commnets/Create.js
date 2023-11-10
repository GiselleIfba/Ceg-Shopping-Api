"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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

// src/server/controllers/commnets/Create.ts
var Create_exports = {};
__export(Create_exports, {
  create: () => create
});
module.exports = __toCommonJS(Create_exports);

// src/server/shared/middleware/Authorization.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

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

// src/server/shared/middleware/Authorization.ts
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

// src/server/shared/middleware/comment/CreateComment.ts
var import_zod = require("zod");

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
var CommentSchema = import_zod.z.object({
  title: import_zod.z.string().max(100, { message: "o n\xFAmero m\xE1ximo de caracteres \xE9 100" }),
  stars: import_zod.z.number().lte(5, { message: "as estrelas n\xE3o podem ser maior que 5 por user" }).nonnegative({ message: "as estrelas devem ser um n\xFAmero positivo ou 0" })
});
function CreateCommentMiddleware(commentquery, comment, res) {
  CommentSchema.parse(comment);
  VerifyUser(commentquery, comment, res);
}

// src/server/controllers/commnets/Create.ts
var create = (req, res, next) => __async(void 0, null, function* () {
  const { authorization } = req.headers;
  const pass = authorization || "";
  Authorization(pass, res, next);
  CreateCommentMiddleware(req.query, req.body, res);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
