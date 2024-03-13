import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, Unique } from 'typeorm';

@Entity({ name: 'exchange' })
@Unique(['exchangeId'])
export class ExchangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true, name: 'exchange_id' })
  exchangeId: string;

  @Column({ nullable: true, name: 'status' })
  status: string;

  @Column({ nullable: true, name: 'dust_invoice_id' })
  dustInvoiceId: string;

  @Column({ nullable: true, name: 'payin_hash' })
  payinHash: string;

  @Column({ nullable: true, name: 'payout_hash' })
  payoutHash: string;

  @Column({ nullable: true, name: 'payin_extra_id' })
  payinExtraId: string;

  @Column({ nullable: true, name: 'payin_address' })
  @Index()
  payinAddress: string;

  @Column({ nullable: true, name: 'payout_address' })
  @Index()
  payoutAddress: string;

  @Column({ nullable: true, name: 'amount_send' })
  amountSend: string;

  @Column({ nullable: true, name: 'amount_receive' })
  amountReceive: string;

  @Column({ nullable: true, name: 'amount_receive_initial' })
  amountReceiveInitial: string;

  @Column({ nullable: true, name: 'from_family' })
  fromFamily: string;

  @Column({ nullable: true, name: 'to_family' })
  toFamily: string;

  @Column({ nullable: true, name: 'from_currency' })
  fromCurrency: string;

  @Column({ nullable: true, name: 'to_currency' })
  toCurrency: string;

  @Column({ nullable: true, name: 'from_address' })
  @Index()
  fromAddress: string;

  @Column({ nullable: true })
  fee: string;

  @Column({ nullable: true, name: 'to_amount' })
  toAmount: string;

  @Column({ nullable: true, name: 'from_amount' })
  fromAmount: string;

  @Column({ nullable: true, name: 'amount_from' })
  amountFrom: string;

  @Column({ nullable: true, name: 'amount_to' })
  amountTo: string;

  @Column({ nullable: true, name: 'expected_amount_from' })
  expectedAmountFrom: string;

  @Column({ nullable: true, name: 'expected_amount_to' })
  expectedAmountTo: string;

  @Column({ nullable: true, name: 'address_deposit' })
  @Index()
  addressDeposit: string;

  @Column({ nullable: true, name: 'extra_id_deposit' })
  extraIdDeposit: string;
}


