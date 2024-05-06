'use client';

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className='mx-auto max-w-114'>
			<h2 className='text-3xl font-bold mt-10 mb-4'>
				Looks like something went wrong...
			</h2>
			<p className='font-light mb-8'>
				There was some sort of issue when trying to fetch the blog
				posts, so please click the button below to again.
			</p>
			<button
				className='flex-none rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 mb-20'
				onClick={() => reset()}
			>
				Try again
			</button>
		</div>
	);
}
