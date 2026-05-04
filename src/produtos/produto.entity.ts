import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum CategoriaProduto {
  PARAQUEDAS_PRINCIPAL = 'paraquedas_principal',
  PARAQUEDAS_RESERVA = 'paraquedas_reserva',
  CONTAINER = 'container',
  CAPACETE = 'capacete',
  ALTIMETRO = 'altimetro',
  FATO = 'fato',
  ACESSORIOS = 'acessorios',
  OUTRO = 'outro',
}

export enum EstadoProduto {
  NOVO = 'novo',
  USADO_BOM = 'usado_bom',
  USADO_REGULAR = 'usado_regular',
}

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column({
    type: 'enum',
    enum: CategoriaProduto,
    default: CategoriaProduto.OUTRO,
  })
  categoria: CategoriaProduto;

  @Column({
    type: 'enum',
    enum: EstadoProduto,
    default: EstadoProduto.USADO_BOM,
  })
  estado: EstadoProduto;

  @Column({ nullable: true })
  localizacao: string;

  @Column({ nullable: true })
  marca: string;

  @Column({ nullable: true })
  modelo: string;

  @Column({ default: true })
  disponivel: boolean;

  @CreateDateColumn()
  criadoEm: Date;
}
