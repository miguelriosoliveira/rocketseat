import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
	pageNumber: number;
	isCurrent?: boolean;
	onPageChange: (pageNumber: number) => void;
}

export function PaginationItem({
	pageNumber,
	isCurrent = false,
	onPageChange,
}: PaginationItemProps) {
	const buttonCommonProps = {
		size: 'sm',
		fontSize: 'xs',
		width: '4',
	};

	const buttonNotSelectedProps = {
		...buttonCommonProps,
		bg: 'gray.700',
		_hover: { bg: 'gray.500' },
	};

	const buttonSelectedProps = {
		...buttonCommonProps,
		colorScheme: 'pink',
		disabled: true,
		_disabled: { bg: 'pink.500', cursor: 'default' },
	};

	const buttonProps = isCurrent ? buttonSelectedProps : buttonNotSelectedProps;

	function handleClick() {
		onPageChange(pageNumber);
	}

	return (
		<Button {...buttonProps} onClick={handleClick}>
			{pageNumber}
		</Button>
	);
}
