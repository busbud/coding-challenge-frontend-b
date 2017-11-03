<template lang="pug">

	div#main-container.container
		
		section.site-hero.bar
			
			header.navigation-site
				
				div.navigation-site-wrapper
					
					div.block-left
						router-link(:to="{ name: 'home' }")
							svg(viewbox="0 0 84 28").site-logo
								use(xlink:href="/dist/assets/icons/icons.svg#logo")
						a(href="https://www.busbud.com/en/about", target="_blank", title="Learn more about the real Busbud").link.link--light.no-mobile About Us

					div.block-right
						nav.links-group
							a(href="https://www.busbud.com/en/activity").link.link--light My searches
							a(href="https://www.busbud.com/en/support").link.link--light Help
							a(href="https://www.busbud.com/en/account/signin").button-primary.button-primary--small.button-primary--transparent Sign in


		section.block-static

			h1.heading-1 404

			p.heading-3 Seems like you missed your connection.

			router-link(:to="{name: 'home'}").block-static__button.button-primary Back home



		footer-site

</template>

<script src="./NotFoundError.js"></script>

