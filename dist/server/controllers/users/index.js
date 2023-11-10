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

// src/server/controllers/users/index.ts
var users_exports = {};
__export(users_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(users_exports);

// src/server/controllers/users/Create.ts
var Create_exports = {};
__export(Create_exports, {
  create: () => create
});

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

// src/server/controllers/users/Delete.ts
var Delete_exports = {};
__export(Delete_exports, {
  delet: () => delet
});
var delet = () => __async(void 0, null, function* () {
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
var Update_exports = {};
__export(Update_exports, {
  update: () => update
});
var update = () => __async(void 0, null, function* () {
});

// src/server/controllers/users/index.ts
var UserController = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Create_exports), GetUser_exports), Delete_exports), Update_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});
