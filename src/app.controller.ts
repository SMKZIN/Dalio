import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { THero } from './dtos/create-hero';

@Controller("heros")
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async createHero(@Body()props: THero){
    const hero = await this.prisma.hero.create({ data: {
      name: props.name, 
      power: props.power, 
      country: props.country,
      ability: props.ability 
    }})
    
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
      throw new NotFoundException("Hero not found.") 
    }
    return hero
  }

  @Put(":id")
  @HttpCode(201)
  async editHero(@Body() props:THero, @Param("id") id: number){
     await this.prisma.hero.update({ 
      where: {
        id: Number(id)
      },
      data: {
        name: props.name, 
        power: props.power, 
        country: props.country,
        ability: props.ability
    }})

      return "The hero was edited!"
  }

  @Delete(":id")
  @HttpCode(201)
  async deleteHero(@Param("id") id: number){
    const hero = await this.prisma.hero.findUnique({ where: {id: Number(id)}})

    if(!hero){
      throw new NotFoundException("Hero not found.") 
    }

    await this.prisma.hero.delete({ where: {id: Number(id)}})

    return "Hero deleted for system!"
  }

}
