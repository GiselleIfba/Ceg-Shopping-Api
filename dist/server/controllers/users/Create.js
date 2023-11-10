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

// src/server/controllers/users/Create.ts
var Create_exports = {};
__export(Create_exports, {
  create: () => create
});
module.exports = __toCommonJS(Create_exports);

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
var import_zod = require("zod");
var UserSchema = import_zod.z.object({
  first_name: import_zod.z.string().min(3),
  last_name: import_zod.z.string().min(3),
  url_img: import_zod.z.string().url().optional(),
  email: import_zod.z.string().email(),
  password: (0, import_zod.string)()
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
var create = (req, res) => __async(void 0, null, function* () {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
