import { UserDatabase } from "../database/UserDatabase";
import { DeleteUsersInputDTO } from "../dtos/users/deleteUsers.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { UserDB } from "../types";
import { User } from "../models/users";
import {
  GetUsersInputDTO,
  GetUsersOutputDTO,
} from "../dtos/users/getUsers.dto";
import {
  UpdateUsersInputDTO,
  UpdateUsersOutputDTO,
} from "../dtos/users/updateUsers.dto";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase) {}

  public getUsers = async (
    input: GetUsersInputDTO
  ): Promise<GetUsersOutputDTO> => {
    const { nameToSearch } = input;

    const usersDB = await this.userDatabase.findUsers(nameToSearch);

    const users: User[] = usersDB.map(
      (userDB) =>
        new User(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
    );
    return users;
  };

  public createUsers = async (
    input: UpdateUsersInputDTO
  ): Promise<UpdateUsersOutputDTO> => {
    const { id, name, email, password, role } = input;

    const userDBExists = await this.userDatabase.findUserById(id);

    if (userDBExists) {
      throw new BadRequestError("'id' já existente");
    }

    const newUser = new User(
      id,
      name,
      email,
      password,
      role,
      new Date().toISOString()
    );

    const newUserDB: UserDB = {
      id: newUser.getId(),
      name: newUser.getName(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      role: newUser.getRole(),
      created_at: newUser.getCreatedAt(),
    };

    await this.userDatabase.insertUser(newUserDB);

    const response: UpdateUsersOutputDTO = {
      message: "Usuário registrado com sucesso",
      users: {
        id: newUser.getId(),
        name: newUser.getName(),
        email: newUser.getEmail(),
        password: newUser.getPassword(),
        role: newUser.getRole(),
        createdAt: newUser.getCreatedAt(),
      },
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
      userDBExists.role,
      userDBExists.created_at
    );

    id && user.setId(id);
    name && user.setName(name);
    email && user.setEmail(email);
    password && user.setPassword(password);
    role && user.setRole(role);

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
      userDBExists.role,
      userDBExists.created_at
    );
    return user;
  };
}
