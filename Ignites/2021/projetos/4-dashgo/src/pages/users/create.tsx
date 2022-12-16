import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { Input } from '../../components';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

interface CreateUserFormData {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

const createUserFormSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().email('Invalid e-mail').required('E-mail is required'),
	password: yup.string().min(6, 'Minimum of 6 characters').required('Password is required'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Password confirmation not matching password'),
});

export default function CreateUser() {
	const router = useRouter();
	const createUser = useMutation(
		async (user: CreateUserFormData) => {
			const { data } = await api.post('/users', {
				user: {
					...user,
					createdAt: new Date(),
				},
			});
			return data.user;
		},
		{
			onSuccess: () => queryClient.invalidateQueries('users'),
		},
	);

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(createUserFormSchema),
	});
	const { errors } = formState;

	const handleCreateUser: SubmitHandler<CreateUserFormData> = async values => {
		await createUser.mutateAsync(values);
		router.push('/users');
	};

	return (
		<Box
			as="form"
			flex="1"
			borderRadius={8}
			bg="gray.800"
			p={['6', '8']}
			onSubmit={handleSubmit(handleCreateUser)}
		>
			<Heading size="lg" fontWeight="normal">
				Create user
			</Heading>

			<Divider my="6" borderColor="gray.700" />

			<Stack spacing={['6', '8']}>
				<SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
					<Input name="name" label="Full name" error={errors.name} {...register('name')} />
					<Input
						name="email"
						type="email"
						label="E-mail"
						error={errors.email}
						{...register('email')}
					/>
				</SimpleGrid>

				<SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
					<Input
						name="password"
						type="password"
						label="Password"
						error={errors.password}
						{...register('password')}
					/>
					<Input
						name="passwordConfirmation"
						type="password"
						label="Password confirmation"
						error={errors.passwordConfirmation}
						{...register('passwordConfirmation')}
					/>
				</SimpleGrid>
			</Stack>

			<Flex mt="8" justify="flex-end">
				<HStack spacing="4">
					<Link href="/users" passHref>
						<Button as="a" colorScheme="whiteAlpha">
							Cancelar
						</Button>
					</Link>
					<Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>
						Salvar
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
}
