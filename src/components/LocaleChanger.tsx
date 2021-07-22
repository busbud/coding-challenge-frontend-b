import { Button, ButtonGroup } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
const LocaleChanger = () => {
	const router = useRouter();
	const { locales } = router;

	return (
		<ButtonGroup
			size='small'
			color='primary'
			aria-label='outlined primary button group'
		>
			{locales?.map((loc, index) => {
				return (
					<Button key={index}>
						<Link
							href={{ pathname: router.pathname, query: router.query }}
							locale={loc}
						>
							{loc}
						</Link>
					</Button>
				);
			})}
		</ButtonGroup>
	);
};

export default LocaleChanger;
