
import {
    BadRequestException,
    UnauthorizedException,
    ForbiddenException,
    NotAcceptableException,
    ConflictException,
    UnprocessableEntityException,
    InternalServerErrorException,
    HttpStatus,
    NotFoundException,
    HttpException,


} from '@nestjs/common';
import { DatabaseError, ForeignKeyConstraintError, ValidationError } from 'sequelize';

export const handleSequelizeError = (error: any) => {
    console.log("error", error,)

    if (error?.name == 'NotAuthorizedException') {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    }

    if (error instanceof ForeignKeyConstraintError) {
        throw new ConflictException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });
    }

    else if (error instanceof ConflictException) {

        throw new ConflictException({
            statusCode: HttpStatus.CONFLICT,
            message: error.message,
        });

    }
    else if (error instanceof BadRequestException) {

        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    } else if (error instanceof NotAcceptableException) {
        throw new NotAcceptableException({
            statusCode: HttpStatus.NOT_ACCEPTABLE,
            message: error.message,
        });
    }
    else if (error instanceof HttpException) {

        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }

    else if (error instanceof DatabaseError) {
        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }
    else if (error instanceof ValidationError) {
        throw new UnprocessableEntityException({
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            message: error.message,
        });
    } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    } else if (error instanceof ForbiddenException) {
        throw new ForbiddenException({
            statusCode: HttpStatus.FORBIDDEN,
            message: error.message,
        });
    } else if (error instanceof NotFoundException) {
        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
        });
    } else {
        throw new InternalServerErrorException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
}

export const handleAuthGuardError = (error: any) => {
    console.log("error", error,)
    if (error?.name == 'NotAuthorizedException') {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    }
    else if (error instanceof BadRequestException) {
        throw new BadRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.message,
        });

    }
    else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
        });
    } else if (error instanceof NotFoundException) {
        throw new NotFoundException({
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
        });
    } else {
        throw new UnauthorizedException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Authorization failed',
        });
    }
}

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {

        console.log(exception, "exception exception")
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = 500;
        let message = 'Internal server error';


        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const responseContent = exception.getResponse();

            // Ensure message is always a string
            if (typeof responseContent === 'string') {
                message = responseContent;
            } else if (typeof responseContent === 'object' && responseContent !== null) {
                message = (responseContent as any).message || JSON.stringify(responseContent);
            }
        }



        return response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
