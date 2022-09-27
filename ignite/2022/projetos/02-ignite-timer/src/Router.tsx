import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './layouts';
import { History, Home } from './pages';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<DefaultLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/history" element={<History />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
