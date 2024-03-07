import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';

@Entity()
@Unique(['exchangeId'])
export class ExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  exchangeId: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  dustInvoiceId: string;

  @Column({ nullable: true })
  payinHash: string;

  @Column({ nullable: true })
  payoutHash: string;

  @Column({ nullable: true })
  payinExtraId: string;

  @Column({ nullable: true })
  @Index()
  payinAddress: string;

  @Column({ nullable: true })
  @Index()
  payoutAddress: string;

  @Column({ nullable: true })
  amountSend: string;

  @Column({ nullable: true })
  amountReceive: string;

  @Column({ nullable: true })
  amountReceiveInitial: string;

  @Column({ nullable: true })
  fromFamily: string;

  @Column({ nullable: true })
  toFamily: string;

  @Column({ nullable: true })
  fromCurrency: string;

  @Column({ nullable: true })
  toCurrency: string;

  @Column({ nullable: true })
  @Index()
  fromAddress: string;

  @Column({ nullable: true })
  fee: string;

  @Column({ nullable: true })
  toAmount: string;

  @Column({ nullable: true })
  fromAmount: string;

  @Column({ nullable: true })
  amountFrom: string;

  @Column({ nullable: true })
  amountTo: string;

  @Column({ nullable: true })
  expectedAmountFrom: string;

  @Column({ nullable: true })
  expectedAmountTo: string;

  @Column({ nullable: true })
  @Index()
  addressDeposit: string;

  @Column({ nullable: true })
  extraIdDeposit: string;
}


