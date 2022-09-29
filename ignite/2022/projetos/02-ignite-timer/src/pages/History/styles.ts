import styled, { css } from 'styled-components';

export const HistoryContainer = styled.main`
	flex: 1;
	padding: 3.5rem;
	display: flex;
	flex-direction: column;

	h1 {
		font-size: 1.5rem;
		color: ${props => props.theme['gray-100']};
	}
`;

export const TableContainer = styled.div`
	flex: 1;
	overflow: auto;
	margin-top: 2rem;
	border-radius: 8px;

	table {
		width: 100%;
		border-collapse: collapse;
		min-width: 37.5rem;

		th {
			background: ${props => props.theme['gray-600']};
			color: ${props => props.theme['gray-100']};
			text-align: left;
		}

		td {
			background: ${props => props.theme['gray-700']};
			border-top: 4px solid ${props => props.theme['gray-800']};
			line-height: 1.6;
		}

		th,
		td {
			padding: 1rem;
			font-size: 0.875rem;

			&:first-child {
				width: 50%;
				padding-left: 1.5rem;
			}

			&:last-child {
				padding-right: 1.5rem;
			}
		}
	}
`;

const STATUS_MAP = {
	inProgress: 'yellow-500',
	done: 'green-500',
	interrupted: 'red-500',
} as const;

interface StatusProps {
	status: keyof typeof STATUS_MAP;
}

export const Status = styled.span<StatusProps>`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		@keyframes flicker {
			0% {
				opacity: 1;
			}
			50% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		content: '';
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 50%;
		background: ${props => props.theme[STATUS_MAP[props.status]]};
		${props =>
			props.status === 'inProgress' &&
			css`
				animation: flicker 1.5s infinite;
			`}
	}
`;
