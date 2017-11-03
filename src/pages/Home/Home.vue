<template lang="pug">

	div#main-container.container
		
		section(style="background-image: url(/dist/assets/images/hero-bg.jpg)").site-hero
			
			header.navigation-site
				
				div.navigation-site-wrapper
					
					div.block-left
						router-link(:to="{ name: 'home' }")
							svg(viewbox="0 0 84 28").site-logo
								use(xlink:href="/dist/assets/icons/icons.svg#logo")
						a(href="https://www.busbud.com/en/about", target="_blank", title="Learn more about the real Busbud").link.light.no-mobile About Us

					div.block-right
						nav.links-group
							a(href="https://www.busbud.com/en/activity").link.light My searches
							a(href="https://www.busbud.com/en/support").link.light Help
							a(href="https://www.busbud.com/en/account/signin").button-primary.button-primary--small.button-primary--transparent Sign in


			div.site-hero-wrapper
				
				div.site-hero-content

					h1.tagline.heading-1.light The Best Way to Book #[strong Bus Tickets]

					p.subline.reading-text.big.thin.light Skip the line and book your bus tickets in no time.

					search-field

					a(href="https://www.busbud.com/", target="_blank", title="Visit the real Busbud website").more-link.reading-text.light
						span or&nbsp;
						strong Visit Busbud.com
						svg(viewbox="0 0 12 7").icon
							use(xlink:href="/dist/assets/icons/icons.svg#arrow-right")


		departures-listing


		footer-site

</template>


<script src="./Home.js"></script>
