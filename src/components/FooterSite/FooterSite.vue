<template lang="pug">

	footer#site-footer.footer-site

		div.site-footer-top

			div.block-logo
				router-link(:to="{ name: 'home' }")
					svg(viewbox="0 0 84 28").site-logo
						use(xlink:href="/dist/assets/icons/icons.svg#logo")

			nav.block-left

				h3.footer-site-title.heading-4.bold Company

				a(href="https://www.busbud.com/blog/").link Blog
				a(href="https://engineering.busbud.com/").link Engineering blog
				a(href="https://www.busbud.com/en/about").link About
				a(href="https://www.busbud.com/en/about/press").link Press
				a(href="https://www.busbud.com/en/careers").link Careers

			nav.block-center

				h3.footer-site-title.heading-4.bold Support

				a(href="https://www.busbud.com/en/support").link Help
				a(href="http://help.busbud.com/hc/en-us").link Contact
				a(href="https://www.busbud.com/en/about/tos").link Terms of use
				a(href="https://www.busbud.com/en/about/privacy").link Privacy

			nav.block-right

				h3.footer-site-title.heading-4.bold Community

				a(href="mailto:info@busbud.com").link Work with us
				a(href="https://busbud.com/partner").link Affiliate products

				nav.social

					a(href="http://facebook.com/busbud", target="_blank")
						svg(viewbox="0 0 24 24").social__icon.icon
							use(xlink:href="/dist/assets/icons/icons.svg#facebook")

					a(href="http://twitter.com/busbud", target="_blank")
						svg(viewbox="0 0 24 24").social__icon.icon
							use(xlink:href="/dist/assets/icons/icons.svg#twitter")

					a(href="https://www.instagram.com/busbud_com/", target="_blank")
						svg(viewbox="0 0 97.395 97.395").social__icon.icon
							use(xlink:href="/dist/assets/icons/icons.svg#instagram")


		div.site-footer-bottom

			p.copyright.reading-text © Fake Busbud inc. All rights reserved.

</template>

