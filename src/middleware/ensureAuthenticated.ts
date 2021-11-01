import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}


export function ensureAuthenticated( request: Request, response: Response, next: NextFunction){
    const authToken = request.headers.authorization

    if( !authToken ){
        return response.status(401).json({
            errorCode: "token.invalid"
        })
    }
    // Bearer 9123891238129382193821382
    //[0] Bearer
    //[1] Token

    const [, token] = authToken.split(" ")

    //verifica se é um token válido
    try {
        const { sub} = verify(token, process.env.JWT_SECRET) as IPayload

        // a variável sub com a verificação será acessível no Service como request.user_id
        request.user_id = sub

        return next()

    } catch (error) {
        return response.status(401).json({
                errorCode: "token.expired"
        })
    }
}