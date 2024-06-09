import moment from 'moment';

export const parseDate = (date: Date): string => {
	return moment(date).format('DD-MM-YYYY');
};
