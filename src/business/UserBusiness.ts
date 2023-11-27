import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { DeleteUsersInputDTO } from "../dtos/users/deleteUsers.dto";
import { USER_ROLES, User } from "../models/users";
import { BadRequestError } from "../errors/BadRequestError";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { UserDB } from "../types";
import {
  GetUsersInputDTO,
  GetUsersOutputDTO,
} from "../dtos/users/getUsers.dto";
import {
  UpdateUsersInputDTO,
  UpdateUsersOutputDTO,
} from "../dtos/users/updateUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { NotFoundError } from "../errors/NotFoundError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) {}

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { nameToSearch } = input;

    const usersDB = await this.userDatabase.findUsers(nameToSearch);

    const users = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role as USER_ROLES,
        userDB.created_at
      );

      return user.toBusinessModel();
    });

    const response: GetUsersOutputDTO = users;

    return response;
  };

  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const id = this.idGenerator.generate();

    const userDBExists = await this.userDatabase.findUserById(id);

    if (userDBExists) {
      throw new BadRequestError("'id' já existente");
    }

    const newUser = new User(
      id,
      name,
      email,
      password,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.insertUser(newUserDB);

    const payload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(payload);

    const response: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso",
      token,
    };

    return response;
  };

  public updateUsers = async (
    input: UpdateUsersInputDTO
  ): Promise<UpdateUsersOutputDTO> => {
    const { id, name, email, password, role } = input;

    const userDBExists = await this.userDatabase.findUserById(id);

    if (!userDBExists) {
      throw new BadRequestError("Usuário não econtrado");
    }

    const user = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.email,
      userDBExists.password,
      userDBExists.role as USER_ROLES,
      userDBExists.created_at
    );

    id && user.setId(id);
    name && user.setName(name);
    email && user.setEmail(email);
    password && user.setPassword(password);
    role && user.setRole(role as USER_ROLES);

    const updateUserDB: UserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
      created_at: user.getCreatedAt(),
    };

    await this.userDatabase.updateUser(updateUserDB);

    const response: UpdateUsersOutputDTO = {
      message: "Usuário editado com sucesso",
      users: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        password: user.getPassword(),
        role: user.getRole(),
        createdAt: user.getCreatedAt(),
      },
    };

    return response;
  };

  public deleteUsers = async (input: DeleteUsersInputDTO): Promise<User> => {
    const { id } = input;

    if (typeof id !== "string") {
      throw new BadRequestError("O campo 'id' deve ser umas string");
    }

    const userDBExists = await this.userDatabase.findUserById(id);

    if (!userDBExists) {
      throw new BadRequestError("Não foi possível encontrar o usuário");
    }

    await this.userDatabase.deleteUser(id);

    const user: User = new User(
      userDBExists.id,
      userDBExists.name,
      userDBExists.email,
      userDBExists.password,
      userDBExists.role as USER_ROLES,
      userDBExists.created_at
    );
    return user;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("'email' não encontrado");
    }

    if (password !== userDB.password) {
      throw new BadRequestError("'email' ou 'password' incorretos");
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role as USER_ROLES,
      new Date().toISOString()
    );

    const payload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };

    const token = this.tokenManager.createToken(payload);

    const response: LoginOutputDTO = {
      message: "Login realizado com sucesso",
      token,
    };

    return response;
  };
}
