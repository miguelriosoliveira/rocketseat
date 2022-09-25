import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { usePlayer } from '../hooks/usePlayer';
import { api } from '../services/api';
import { convertDurationToTimeString, formatDate } from '../utils/formatter';

import styles from './home.module.scss';

interface Episode {
	id: string;
	title: string;
	members: string;
	published_at: string;
	thumbnail: string;
	file: {
		duration: number;
		url: string;
	};
}

interface EpisodeFormatted extends Episode {
	publishedAt: string;
	durationFormatted: string;
	duration: number;
	url: string;
}

interface HomeProps {
	latestEpisodes: EpisodeFormatted[];
	olderEpisodes: EpisodeFormatted[];
}

export default function HomePage({ latestEpisodes, olderEpisodes }: HomeProps) {
	const { playList } = usePlayer();

	const episodeList = [...latestEpisodes, ...olderEpisodes];

	function handlePlay(episodeIndex: number) {
		return () => playList(episodeList, episodeIndex);
	}

	return (
		<div className={styles.homepage}>
			<Head>
				<title>Podcastr</title>
			</Head>

			<section className={styles.latestEpisodes}>
				<h2>Últimos lançamentos</h2>
				<ul>
					{latestEpisodes.map((episode, index) => (
						<li key={episode.id}>
							<Image
								src={episode.thumbnail}
								alt={episode.title}
								width={192}
								height={192}
								objectFit="cover"
							/>

							<div className={styles.episodeDetails}>
								<Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
								<p>{episode.members}</p>
								<span>{episode.publishedAt}</span>
								<span>{episode.durationFormatted}</span>
							</div>

							<button type="button" onClick={handlePlay(index)}>
								<img src="/images/play-green.svg" alt="Tocar episódio" />
							</button>
						</li>
					))}
				</ul>
			</section>

			<section className={styles.olderEpisodes}>
				<h2>Episódios anteriores</h2>
				<table cellSpacing={0}>
					<thead>
						<tr>
							<th aria-label="Thumbnail" />
							<th>Título</th>
							<th>Integrantes</th>
							<th>Data</th>
							<th>Duração</th>
							<th aria-label="Play" />
						</tr>
					</thead>
					<tbody>
						{olderEpisodes.map((episode, index) => (
							<tr key={episode.id}>
								<td className={styles.thumbnail}>
									<Image
										src={episode.thumbnail}
										alt={episode.title}
										width={120}
										height={120}
										objectFit="cover"
									/>
								</td>
								<td>
									<Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
								</td>
								<td>{episode.members}</td>
								<td className={styles.publishedAt}>{episode.publishedAt}</td>
								<td>{episode.durationFormatted}</td>
								<td>
									<button type="button" onClick={handlePlay(latestEpisodes.length + index)}>
										<img src="/images/play-green.svg" alt="Tocar episódio" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const { data } = await api.get<Episode[]>('/episodes', {
		params: {
			_limit: 12,
			_sort: 'published_at',
			_order: 'desc',
		},
	});

	const episodes = data.map(episode => ({
		...episode,
		publishedAt: formatDate(episode.published_at, 'd MMM yy'),
		durationFormatted: convertDurationToTimeString(episode.file.duration),
		duration: episode.file.duration,
		url: episode.file.url,
	}));

	const latestEpisodes = episodes.slice(0, 2);
	const olderEpisodes = episodes.slice(2);

	return {
		props: { latestEpisodes, olderEpisodes },
		revalidate: 60 * 60 * 8,
	};
};
