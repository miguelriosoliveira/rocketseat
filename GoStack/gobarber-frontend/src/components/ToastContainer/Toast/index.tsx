import React, { useCallback, useEffect } from 'react';
import { FiAlertCircle, FiX, FiInfo, FiCheckCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
	message: ToastMessage;
	style: object;
}

const icons = {
	info: <FiInfo size={24} />,
	error: <FiAlertCircle size={24} />,
	success: <FiCheckCircle size={24} />,
};

export const Toast: React.FC<ToastProps> = ({
	message: { id, type = 'info', title, description },
	style,
}) => {
	const { removeToast } = useToast();

	const handleRemoveToast = useCallback(() => removeToast(id), [removeToast, id]);

	useEffect(() => {
		const timer = setTimeout(handleRemoveToast, 3000);
		return () => clearTimeout(timer);
	}, [handleRemoveToast]);

	return (
		<Container type={type} hasDescription={!!description} style={style}>
			{icons[type]}

			<div>
				<strong>{title}</strong>
				{description && <p>{description}</p>}
			</div>

			<button type="button" onClick={handleRemoveToast}>
				<FiX size={18} />
			</button>
		</Container>
	);
};
