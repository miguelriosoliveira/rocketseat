import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import { formatCurrency } from '../utils/formatter';

import styles from './home.module.scss';

interface Props {
	product: {
		priceId: string;
		amount: number;
	};
}

export default function Home({ product }: Props) {
	return (
		<>
			<Head>
				<title>Ig.news</title>
			</Head>

			<main className={styles.contentContainer}>
				<section className={styles.hero}>
					<span>👏 Hey, welcome!</span>
					<h1>
						New about the <span>React</span> world.
					</h1>
					<p>
						Get access to all the publications <br />
						<span>for {formatCurrency(product.amount)} month</span>
					</p>
					<SubscribeButton priceId={product.priceId} />
				</section>

				<img src="/images/avatar.svg" alt="Girl coding" />
			</main>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1IepvWEPP6KthwN1yTriHSdI');

	const product = {
		priceId: price.id,
		amount: price.unit_amount / 100,
	};

	return {
		props: {
			product,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
