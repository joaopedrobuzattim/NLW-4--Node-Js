import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositorie';
import * as yup from 'yup';
import { AppError } from '../errors/AppErrors';
class UserController{

    async create(request: Request, response: Response){
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio!"),
            email: yup.string().email().required("Email incorreto")
        })

        /* if(!await schema.isValid(request.body)){
            return response.status(400).json({
                error: "Validation failled!"
            })
        } */

        try{ 
            await schema.validate(request.body, {abortEarly: false})
        }catch(err){
            throw new AppError(err);
        }

        const userRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await userRepository.findOne({
            email
        })

        if(userAlreadyExists)
            throw new AppError(`User: ${userAlreadyExists.email} already exists. Please, try another one.`);


        const user = userRepository.create({
            name,
            email
        })
        
        await userRepository.save(user);

        response.status(201).json(user);
    }

}

export { UserController };
