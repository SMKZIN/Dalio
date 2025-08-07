import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { Hero } from '@prisma/client';
import { THero } from './dtos/create-hero';
import { NotFoundError } from 'rxjs';

@Controller("heros")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async createHero(@Body()props: THero){
    const hero = await this.prisma.hero.create({ data: {name: props.name, power: props.power}})
    return hero
  }

  @Get()
  @HttpCode(200)
  async listHeros(){
    const hero = await this.prisma.hero.findMany()
    return hero
  }

  @Get(":name")
  @HttpCode(200)
  async filterHeros(@Param("name") name: string){
    const hero = await this.prisma.hero.findFirst({ where: {name}})

    if(!hero){
      return "Not exists hero!"
    }
    return hero
  }
}
