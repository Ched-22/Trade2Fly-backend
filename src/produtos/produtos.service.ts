import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  findAll(): Promise<Produto[]> {
    return this.produtosRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtosRepository.findOneBy({ id });
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);
    return produto;
  }

  create(data: Partial<Produto>): Promise<Produto> {
    const produto = this.produtosRepository.create(data);
    return this.produtosRepository.save(produto);
  }

  async update(id: number, data: Partial<Produto>): Promise<Produto> {
    await this.findOne(id);
    await this.produtosRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.produtosRepository.delete(id);
  }
}
