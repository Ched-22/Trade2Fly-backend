import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Produto> {
    return this.produtosService.findOne(+id);
  }

  @Post()
  create(@Body() body: Partial<Produto>): Promise<Produto> {
    return this.produtosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<Produto>,
  ): Promise<Produto> {
    return this.produtosService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.produtosService.remove(+id);
  }
}
