import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController{

    async create(request: Request, response: Response){
        const { name, email } = request.body;

        const userRepository = getRepository(User);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists)
            return response.status(400).json({
                error: `User: ${userAlreadyExists.email} already exists. Please, try another one.`
            })

        const user = userRepository.create({
            name,
            email
        })
        
        await userRepository.save(user);

        response.json(user);
    }

}

export { UserController }; 