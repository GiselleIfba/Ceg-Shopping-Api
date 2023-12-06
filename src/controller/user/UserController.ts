import { NextFunction, Request, Response } from "express";
import { EEspecialRole, ENormalRole, ERole, ILogin, IRequestCreateUser, IUserParams } from "../../interfaces/IUser";
import { ValidationData } from "../../middleware/validationData.Zod";
import { z } from "zod";
import { UserCore } from "../../core/user/UserCore";
import { UserService } from "../../services/user/UserService";
import { UserRepository } from "../../repositories/user/UserRepository";
import { BadRequest } from "../../middleware/errors.express";
import { ResponseGet, ResponseToCreated } from "../../middleware/Response.express";
import { Authorization } from "../../middleware/authorization.express";

const RoleSchema = z.nativeEnum(ERole)

const UserOrElderSchema = z.object({
  //id: z.string().min(24),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  url_img: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(ENormalRole),
  storeId: z.string().min(24).optional(),
});

const MasterOrAdminSchema = z.object({
  //id: z.string().min(24),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  url_img: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(EEspecialRole),
  storeId: z.string().min(24)
});

const IdSchema = z.string().min(24);

const Login = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

class UserController {
  public async validationRolePost(
    req: Request<"", "", IRequestCreateUser>,
    res: Response,
    next: NextFunction
  ) {
    //primeiro precisamos validar a role do user a ser criado
    //então colocamos a role em uma objeto que a função ValidationData aceita
    const data = { data: req.body.data.role }; 
    //chamamos a função ValidationData e passamos o schema que queremos, o data e a função next. assim validando a role
    ValidationData(RoleSchema, data, next);
  }

  public async validationUserPost(
    req: Request<"", "", IRequestCreateUser>,
    res: Response,
    next: NextFunction
  ) {
    const user = { data: req.body.data };
    //dependendo da role, o schema de validação é diferente, se role = "admin" || "master" usamos o "MasterOrAdminSchema"
    //caso a role do user a ser criado seja 'admin' ou 'master', precisamos validar novamente, mas somente a storeId que, neste caso, é obrigatório. 
    if(user.data.role === 'admin' || user.data.role === 'master'){ // data.data é igual a role
      ValidationData(MasterOrAdminSchema, user, next);
      //se a role for outra, usamos o "UserOrElderSchema"
    } else {
      ValidationData(UserOrElderSchema, user, next);
    }
  }

  public async create(req: Request<"", "", IRequestCreateUser>, res: Response) {
    const core = new UserCore();
    const { email, first_name, last_name, password, role, url_img, storeId } =
      req.body.data;

    //verificando se o user existe
    const userExit = await core.verifyUser(email);
    // se user já existe, disparamos um erro
    if (userExit) {
      return new BadRequest("This User exist", res).returnError();
    }


    //verificamos as roles antes de criar o user
    const verifyRole = await core.verifyRoleToCreateUser(req.body);
    console.log(verifyRole);
    //se algo estiver incorreto com as roles, disparamos um erro
    if (!verifyRole || verifyRole === undefined) {
      return new BadRequest("Something wrong with role or storeId", res).returnError();
    }

    //encriptamos a senha
      const hashPassword = await core.encryptPassword(password);
    // chamamos o service e criamos o user
    const service = new UserService(new UserRepository());
    const created = await service.executeCreateUserRepository(first_name, last_name, email, hashPassword, role, url_img, storeId);
    
    //se o id for diferente de vazio, significa que user foi criado e retornamos a resposta da requisição
    if (created.id !== "") {
        const response = new ResponseToCreated(created);
        response.res(res);
        // se a user não existe, retornamos um erro
      } else {
      return new BadRequest("This User does not created", res).returnError();
    } 
  }

  public async validationUserGet(
    req: Request<IUserParams>,
    res: Response,
    next: NextFunction
  ) {
    const data = { data: req.params.id };
    ValidationData(IdSchema, data, next);
  }

  public async getById(req: Request<IUserParams>, res: Response) {
    const aut = new Authorization(1)
    aut.authentication
    //buscando o user com o metodo executeGetByIdUserRepository no UserService e passando o UserRepository como parametro.
    const user = await new UserService(new UserRepository()).executeGetByIdUserRepository(req.params.id)
    //se o produto existe, o enviamos como resposta da requisição
    if (user.id !== "") {
      const response = new ResponseGet(user);
      response.res(res);
    } else {
      return new BadRequest("The User does not exist", res).returnError();
    }

  }
  

  public async validationUserLogin(
    req: Request<"", "", ILogin>,
    res: Response,
    next: NextFunction
  ) {
    const user = { data: req.body };

    ValidationData(Login , user, next);
    
  }

  public async login(req: Request<"", "", ILogin>, res: Response){
    const core = new UserCore();
    const {email, password} = req.body;

    //verificando se o user existe
    const userExit = await core.verifyUser(email);
    // se user não existe, disparamos um erro
    if (!userExit) {
      return new BadRequest("This User dont exist", res).returnError();
    }

    //verificando se a password está correta com a do banco
    const verifyPass = await core.comparePassword(email, password);
    //se o resultado do metodo for false, a senha está errada então disparamos um erro
    if (!verifyPass) {
      return new BadRequest("Wrong password", res).returnError();
     }
    
     //criando token de autenticação
     const login = await core.login(email)
     //se o produto existe, o enviamos junto ao token como resposta da requisição
    if (login.user.id !== "") {
      const response = new ResponseGet(login);
      response.res(res);
    } else {
      return new BadRequest("The User does not exist", res).returnError();
    }


  }

  
}

export { UserController };
