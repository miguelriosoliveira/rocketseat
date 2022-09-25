import { Box, Stack, HStack, Text } from '@chakra-ui/react';

import { clamp } from '../../utils';

import { PaginationItem } from './components';

interface PaginationProps {
	totalItems: number;
	currentPage?: number;
	pageSize?: number;
	onPageChange: (page: number) => void;
}

const SIBLINGS_COUNT = 1;

function generatePagesArray(from: number, to: number) {
	return [...new Array(to - from)].map((_, index) => from + index + 1);
}

export function Pagination({
	currentPage = 1,
	pageSize = 10,
	totalItems,
	onPageChange,
}: PaginationProps) {
	const lastPage = Math.ceil(totalItems / pageSize);
	const currentPageSafe = clamp(currentPage, 1, lastPage);
	const to = Math.min(currentPageSafe * pageSize, totalItems);
	const from = to - pageSize + 1;

	const previousPages =
		currentPageSafe > 1
			? generatePagesArray(currentPageSafe - 1 - SIBLINGS_COUNT, currentPageSafe - 1)
			: [];

	const nextPages =
		currentPageSafe < lastPage
			? generatePagesArray(currentPageSafe, Math.min(currentPageSafe + SIBLINGS_COUNT, lastPage))
			: [];

	return (
		<Stack direction={['column', 'row']} mt="8" align="center" justify="space-between" spacing="6">
			<Box>
				<strong>{from}</strong> - <strong>{to}</strong> of <strong>{totalItems}</strong>
			</Box>

			<HStack spacing="2">
				{currentPageSafe > 1 + SIBLINGS_COUNT && (
					<>
						<PaginationItem pageNumber={1} onPageChange={onPageChange} />
						{currentPageSafe > 2 + SIBLINGS_COUNT && (
							<Text color="gray.300" width="8" textAlign="center">
								...
							</Text>
						)}
					</>
				)}

				{previousPages.map(page => (
					<PaginationItem key={page} pageNumber={page} onPageChange={onPageChange} />
				))}

				<PaginationItem pageNumber={currentPageSafe} isCurrent onPageChange={onPageChange} />

				{nextPages.map(page => (
					<PaginationItem key={page} pageNumber={page} onPageChange={onPageChange} />
				))}

				{currentPageSafe + SIBLINGS_COUNT < lastPage && (
					<>
						{currentPageSafe + 1 + SIBLINGS_COUNT < lastPage && (
							<Text color="gray.300" width="8" textAlign="center">
								...
							</Text>
						)}
						<PaginationItem pageNumber={lastPage} onPageChange={onPageChange} />
					</>
				)}
			</HStack>
		</Stack>
	);
}
