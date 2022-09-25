import { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { TransactionInput, useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransationTypeContainer } from './styles';

interface ModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
}

const INITIAL_STATE: TransactionInput = {
	title: '',
	amount: 0,
	type: 'deposit',
	category: '',
};

export function NewTransactionModal({ isOpen, onRequestClose }: ModalProps) {
	const { createTransaction } = useTransactions();

	const [formData, setFormData] = useState<TransactionInput>(INITIAL_STATE);

	function handleChangeTextInput({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [name]: value });
	}

	function handleChangeNumberInput({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
		setFormData({ ...formData, [name]: Number(value) });
	}

	function handleClickType(type: 'deposit' | 'withdraw') {
		return () => setFormData({ ...formData, type });
	}

	async function handleCreateNewTransaction(event: FormEvent) {
		event.preventDefault();

		try {
			await createTransaction(formData);
		} catch (err) {
			console.error('Error creating transaction', err);
			return;
		}

		setFormData(INITIAL_STATE);
		onRequestClose();
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="react-modal-content"
			overlayClassName="react-modal-overlay"
		>
			<button type="button" onClick={onRequestClose} className="react-modal-close">
				<img src={closeImg} alt="Fechar modal" />
			</button>

			<Container onSubmit={handleCreateNewTransaction}>
				<h2>Cadastrar Transação</h2>

				<input required name="title" placeholder="Título" onChange={handleChangeTextInput} />
				<input
					required
					name="amount"
					type="number"
					placeholder="Valor"
					onChange={handleChangeNumberInput}
				/>

				<TransationTypeContainer>
					<RadioBox
						type="button"
						onClick={handleClickType('deposit')}
						isActive={formData.type === 'deposit'}
						activeColor="green"
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>

					<RadioBox
						type="button"
						onClick={handleClickType('withdraw')}
						isActive={formData.type === 'withdraw'}
						activeColor="red"
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransationTypeContainer>

				<input required name="category" placeholder="Categoria" onChange={handleChangeTextInput} />

				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	);
}
