<template lang="pug">

	div#main-container.container
		
		section(style="background-image: url(/dist/assets/images/hero-bg.jpg)").site-hero
			
			header.navigation-site
				
				div.navigation-site__wrapper
					
					div.navigation-site__wrapper__block-left
						router-link(:to="{ name: 'home' }")
							svg(viewbox="0 0 84 28").site-hero__site-logo
								use(xlink:href="/dist/assets/icons/icons.svg#logo")
						a(href="https://www.busbud.com/en/about", target="_blank", title="Learn more about the real Busbud").link.link--light.no-mobile About Us

					div.navigation-site__wrapper__block-right
						nav.navigation-site__wrapper__block-right__links-group
							a(href="https://www.busbud.com/en/activity").link.link--light My searches
							a(href="https://www.busbud.com/en/support").link.link--light Help
							a(href="https://www.busbud.com/en/account/signin").button-primary.button-primary--small.button-primary--transparent Sign in


			div.site-hero__wrapper
				
				div.site-hero__wrapper__content

					h1.site-hero__wrapper__content__tagline.heading-1.heading-1--light The Best Way to Book #[strong.heading-1__strong Bus Tickets]

					p.site-hero__wrapper__content__subline.reading-text.reading-text--big.reading-text--thin.reading-text--light Skip the line and book your bus tickets in no time.

					search-field.site-hero__wrapper__content__search-field

					a(href="https://www.busbud.com/", target="_blank", title="Visit the real Busbud website").site-hero__wrapper__content__more-link.reading-text.reading-text--light
						span or&nbsp;
						strong Visit Busbud.com
						svg(viewbox="0 0 12 7").icon
							use(xlink:href="/dist/assets/icons/icons.svg#arrow-right")


		departures-listing


		footer-site

</template>


<script src="./Home.js"></script>
