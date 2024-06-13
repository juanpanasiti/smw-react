import { useEffect, useState } from 'react';
import { Payment } from '../../store/interfaces';
import { PaymentStatusEnum } from '../types/enums';

interface Props {
	originalPayments: Payment[];
}
export const useFilterPayments = ({ originalPayments }: Props) => {
	const [filteredPayments, setFilteredPayments] = useState<Payment[]>(originalPayments);
	const [textFilter, setTextFilter] = useState<string>('');
	// const [creditCardId, setCreditCardId] = useState<number>();
	const [paymentStatus, setPaymentStatus] = useState<PaymentStatusEnum | 'any'>('any');

	useEffect(() => {
		const filtered = originalPayments.filter((payment: Payment) => {
			return (
				(paymentStatus === 'any' || payment.status === paymentStatus) &&
				(payment.expenseTitle.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()) ||
				payment.expenseCcName.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()))
			);
		});
		setFilteredPayments(filtered);
	}, [originalPayments, textFilter, paymentStatus]);

	return {
		filteredPayments,
		textFilter,
		// creditCardId,
		paymentStatus,
		setTextFilter,
		// setCreditCardId,
		setPaymentStatus,
	};
};
