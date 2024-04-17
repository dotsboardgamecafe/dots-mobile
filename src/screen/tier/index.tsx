import React, { Suspense, lazy } from 'react'
import Container from '../../components/container'
import { scaleHeight } from '../../utils/pixel.ratio'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const Tier = (): React.ReactNode => {
	return (
		<Container
			manualAppbar
			barStyle='light-content'
		>
			<Suspense fallback={ null }>
				<LazyBannerTier screen='tier' style={ {
					height: scaleHeight(248)
				} as any }
				starsFieldContentStyle={ {
					marginTop: 38,
					height: scaleHeight(210),
					justifyContent: 'space-between',
				} as any }/>
			</Suspense>
		</Container>
	)
}

export default React.memo(Tier)