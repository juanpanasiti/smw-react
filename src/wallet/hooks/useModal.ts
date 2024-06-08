import { useState } from 'react';

export const useModal = (initialState: boolean = false) => {
	const [open, setOpen] = useState(initialState);
	const handleOpen = () => {
		setOpen(!open);
	};
	return { open, handleOpen };
};
