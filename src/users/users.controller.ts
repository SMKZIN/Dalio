import { Body, Controller, HttpCode, Post, Put } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/dtos/create-user';
import bcrypt from "bcrypt"

@Controller('users')
export class UsersController {
    constructor(private readonly prisma: PrismaService){}

    @Post()
    @HttpCode(201)
    async register(@Body() props: User){      
        const existingUser = await this.prisma.users.findUnique({
            where: { email: props.email }
        })

        if(existingUser){
            return "Existing email"
        }

        try {
            const passwordCrypt = await bcrypt.hash(props.password, 10)
            const newUser: User = {
                name: props.name,
                age: props.age,
                email: props.email,
                password: passwordCrypt
            }

            await this.prisma.users.create({
                data: newUser
            })

            return "User created!"
           
        } catch (error) {
            const erro = error as Error
            return erro
        }

    }

}
