import React, { Suspense, lazy } from 'react'
import Container from '../../components/container'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const Tier = (): React.ReactNode => {
	return (
		<Container
			manualAppbar
			barStyle='light-content'
		>
			<Suspense fallback={ null }>
				<LazyBannerTier style={ {
					height: 208
				} as any }
				starsFieldContentStyle={ {
					marginTop: 38
				} as any }/>
			</Suspense>
		</Container>
	)
}

export default React.memo(Tier)