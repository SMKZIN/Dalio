import { Body, Controller, Delete, HttpCode, Post, Put, Param } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from 'src/dtos/create-user';
import bcrypt from "bcrypt"

@Controller('users')
export class UsersController {
    constructor(private readonly prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async register(@Body() props: User) {
        const existingUser = await this.prisma.users.findUnique({
            where: { email: props.email }
        })

        if (existingUser) {
            return "Existing email."
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

    @Delete(":id")
    @HttpCode(200)
    async deleteUser(@Param("id") id: string) {
        const existingUser = await this.prisma.users.findUnique({
            where: { id: id }
        })

        if (!existingUser) {
            return "User does not exist in the database."
        }

        try {
            await this.prisma.users.delete({
                where: { id: id }
            })

            return "User deleted!"

        } catch (error) {
            const erro = error as Error
            return erro
        }
    }

    @Put(":id")
    @HttpCode(200)
    async editUser(@Param("id") id: string, @Body() props: User) {
        const existingUser = await this.prisma.users.findUnique({
            where: { id: id }
        })

        if (!existingUser) {
            return "User does not exist in the database."
        }

        const existingEmail = await this.prisma.users.findUnique({
            where: { email: props.email }
        })

        if (existingEmail) {
            return "Existing email."
        }

        try {
            const hashPassword = await bcrypt.hash(props.password, 10)
            const userEdited = {
                email: props.email,
                password: hashPassword
            }

            await this.prisma.users.update({
                where: {id},
                data: userEdited
            })

            return `User edited!`

        } catch (error) {
            const erro = error as Error
            return erro
        }
    }
}
