import { Stack } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Bio, Cities, City, ContinentBanner } from '../components/Continent';
import { api } from '../services/api';

interface ContinentProps {
	id: string;
	name: string;
	description: string;
	number_of_countries: number;
	number_of_languages: number;
	number_of_cities_in_top_100: number;
	image_url: string;
	top_5_cities: City[];
}

export default function Continent({
	id,
	name,
	description,
	number_of_countries,
	number_of_languages,
	number_of_cities_in_top_100,
	image_url,
	top_5_cities,
}: ContinentProps) {
	return (
		<Stack align="center" gridGap={['6', '20']} mb="9">
			<ContinentBanner name={name} imageUrl={image_url} />
			<Bio
				description={description}
				numberOfCountries={number_of_countries}
				numberOfLanguages={number_of_languages}
				numberOfCitiesInTop100={number_of_cities_in_top_100}
			/>
			<Cities top5={top_5_cities} />
		</Stack>
	);
}

type QueryParams = {
	continent: string;
};

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
	let continents: ContinentProps[] = [];

	try {
		const { data } = await api.get<ContinentProps[]>('/continents');
		continents = data;
	} catch (error) {
		console.error('Failed getting continent list.', error);
		return {
			paths: [],
			fallback: true,
		};
	}

	return {
		paths: continents.map(continent => ({
			params: {
				continent: continent.id,
			},
		})),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<ContinentProps, QueryParams> = async ({ params }) => {
	const { continent } = params;
	let continentData: ContinentProps = null;

	try {
		const { data } = await api.get<ContinentProps>(`/continents/${continent}`);
		continentData = data;
	} catch (error) {
		console.error('Failed getting continent data.', error);
		return { notFound: true };
	}

	return {
		props: continentData,
		revalidate: 30 * 24 * 60 * 60, // 30 days
	};
};
