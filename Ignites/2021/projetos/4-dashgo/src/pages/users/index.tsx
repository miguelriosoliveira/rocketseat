import {
	Box,
	Button,
	Checkbox,
	Flex,
	Heading,
	Icon,
	Link,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useBreakpointValue,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Pagination } from '../../components';
import { getUsers, UsersResponse, useUsers } from '../../hooks';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

// export default function UserList({ users, totalCount }: UsersResponse) {
export default function UserList() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isFetching, error } = useUsers(
		currentPage,
		// { users, totalCount }
	);
	const isWideScreen = useBreakpointValue({ base: false, lg: true });

	async function handlePrefetchUser(userId: string) {
		await queryClient.prefetchQuery(
			['user', userId],
			async () => {
				const { data: userData } = await api.get(`/users/${userId}`);
				return userData;
			},
			{
				staleTime: 1000 * 60 * 10, // 10 minutes
			},
		);
	}

	return (
		<Box flex="1" borderRadius={8} bg="gray.800" p="8">
			<Flex mb="8" justify="space-between" align="center">
				<Heading size="lg" fontWeight="normal">
					Users
					{!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
				</Heading>

				<NextLink href="/users/create" passHref>
					<Button
						as="a"
						size="sm"
						fontSize="sm"
						colorScheme="pink"
						leftIcon={<Icon as={RiAddLine} fontSize="20" />}
					>
						New
					</Button>
				</NextLink>
			</Flex>

			{/* eslint-disable-next-line no-nested-ternary */}
			{isLoading ? (
				<Flex justify="center">
					<Spinner />
				</Flex>
			) : error ? (
				<Flex justify="center">
					<Text>Failed to recover users data</Text>
				</Flex>
			) : (
				<>
					<Table colorScheme="whiteAlpha">
						<Thead>
							<Tr>
								<Th px={['1', '4', '6']} color="gray.300" width="8">
									<Checkbox colorScheme="pink" />
								</Th>
								<Th>User</Th>
								{isWideScreen && <Th>Created at</Th>}
								{isWideScreen && <Th w="8" />}
							</Tr>
						</Thead>
						<Tbody>
							{data.users.map(user => (
								<Tr key={user.id}>
									<Td px={['1', '4', '6']}>
										<Checkbox colorScheme="pink" />
									</Td>
									<Td>
										<Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
											<Text fontWeight="bold">{user.name}</Text>
										</Link>
										<Text fontSize="sm" color="gray.300">
											{user.email}
										</Text>
									</Td>
									{isWideScreen && (
										<Td>
											<Text>{user.created_at}</Text>
										</Td>
									)}
									{isWideScreen && (
										<Td>
											<Button
												as="a"
												size="sm"
												fontSize="sm"
												colorScheme="facebook"
												leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
											>
												Edit
											</Button>
										</Td>
									)}
								</Tr>
							))}
						</Tbody>
					</Table>

					<Pagination
						currentPage={currentPage}
						totalItems={data.totalCount}
						onPageChange={setCurrentPage}
					/>
				</>
			)}
		</Box>
	);
}

// export const getServerSideProps: GetServerSideProps<UsersResponse> = async () => {
// 	const { users, totalCount } = await getUsers(1);
// 	return { props: { users, totalCount } };
// };
