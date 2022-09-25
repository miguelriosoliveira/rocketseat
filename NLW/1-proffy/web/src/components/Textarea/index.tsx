import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
}

const Textarea: React.FC<Props> = ({ name, label, ...rest }) => {
	return (
		<div className="textarea-block">
			<label htmlFor={name}>{label}</label>
			<textarea name={name} {...rest} />
		</div>
	);
};

export default Textarea;
