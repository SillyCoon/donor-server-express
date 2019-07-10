import { Request, Response } from 'express-serve-static-core';
import { getRepository } from 'typeorm';

class roleController {
    static getroles = async (req: Request, res: Response) => {
    //Get users from database
    // const users = await userRepository.find({
    //     select: ["id", "username", "role"] //We dont want to send the passwords on response
    // });

    //Send the users object
    // res.send(users);
};
}