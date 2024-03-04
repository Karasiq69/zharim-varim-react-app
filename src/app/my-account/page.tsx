'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

export default function Page() {
	const { data: user, isLoading, isFetching } = useRetrieveUserQuery();

	const config = [
		{
			label: 'First Name',
			value: user?.first_name,
		},
		{
			label: 'Last Name',
			value: user?.last_name,
		},
		{
			label: 'Email',
			value: user?.email,
		},
	];

	if (isLoading || isFetching) {
		return (
			<div className='flex justify-center my-8'>
			</div>
		);
	}

	return (
		<>
			<header className='bg-white shadow'>
				<div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
						Dashboard
					</h1>
				</div>
			</header>
            <main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>


                <ul role='list' className='divide-y divide-gray-100'>
                    {config.map(({label, value}) => (
                        <li key={label} className='flex justify-between gap-x-6 py-5'>
                            <div>
                                <p className='text-sm font-semibold leading-6 text-gray-900'>
                                    {label}
                                </p>
                            </div>
                            <div>
                                <p className='text-sm font-semibold leading-6 text-gray-900'>
                                    {value || <div>loading...</div>}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>


            </main>
        </>
    );
}