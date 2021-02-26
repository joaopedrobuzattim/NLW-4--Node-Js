import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppErrors";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController{

    // http://locallhost:3333/answers/9?u=9c29e75b-aa1e-4db7-82da-266c8c40c371v

    /* 

    Route params => Parametros que compõe a rota 
    routes.get("/answers/:nome_do_route_param")

    Query params => Busca, paginação, não obrigatórios
    ?chave=valor

    */
    async execute(request: Request, response: Response){

        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser)
            throw new AppError("Survey User does not exists");
        
        if(surveyUser.value !== null) 
            throw new AppError( "User has already answered the survey!");
            

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser);

    }

}


export { AnswerController }