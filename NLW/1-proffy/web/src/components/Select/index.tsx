import React, { SelectHTMLAttributes, OptionHTMLAttributes } from 'react';

import './styles.css';

interface Option extends OptionHTMLAttributes<HTMLOptionElement> {
	value: string;
	label: string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	label: string;
	options: Option[];
}

const Select: React.FC<Props> = ({ name, label, options, ...rest }) => {
	return (
		<div className="select-block">
			<label htmlFor={name}>{label}</label>
			<select value="" name={name} {...rest}>
				<option value="" disabled hidden>
					Selecione uma opção
				</option>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
