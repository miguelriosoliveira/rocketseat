import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatter';

import styles from './styles.module.scss';

interface Post {
	slug: string;
	title: string;
	abstract: string;
	updatedAt: string;
}

interface PostsProps {
	posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | Ig.news</title>
			</Head>

			<main className={styles.container}>
				<div className={styles.posts}>
					{posts.map(post => (
						<Link key={post.slug} href={`/posts/${post.slug}`}>
							<a>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.abstract}</p>
							</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
	const prismic = getPrismicClient();

	const { results } = await prismic.query([Prismic.predicates.at('document.type', 'post')], {
		fetch: ['post.title', 'post.content'],
		pageSize: 100,
	});

	const posts = results.map(post => {
		const firstParagraph = post.data.content.find(content => content.type === 'paragraph');
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			abstract: firstParagraph?.text || '',
			updatedAt: formatDate(new Date(post.last_publication_date)),
		};
	});

	return {
		props: { posts },
		revalidate: 60 * 60, // 60 minutes
	};
};
