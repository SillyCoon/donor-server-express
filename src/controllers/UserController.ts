import { BaseUser } from './../entity/db-first/user';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { UserHelper } from '../helpers/user-helper';

class UserController {

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(BaseUser);
    const users = await userRepository.createQueryBuilder('user')
      .leftJoinAndMapMany('user.roles', 'user.userRoles', "userRole")
      .select(['user.id', 'user.email', 'userRole.roleId'])
      .getMany()

    //Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;

    const userRepository = getRepository(BaseUser);
    try {
      const user: any = await userRepository.createQueryBuilder('user')
        .leftJoinAndMapMany('user.roles', 'user.userRoles', "userRole")
        .select(['user.id', 'user.email', 'userRole.roleId'])
        .where('user.id = :id', { id })
        .getOne()
      user.roles = UserHelper.rolesToArrayOfRoleIds(user.roles);
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { email, password } = req.body;
    let user = new BaseUser();
    user.email = email;
    user.password = password;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(BaseUser);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { email } = req.body;

    //Try to find user on database
    const userRepository = getRepository(BaseUser);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }

    //Validate the new values on model
    user.email = email;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("email already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(BaseUser);
    let user: BaseUser;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default UserController;