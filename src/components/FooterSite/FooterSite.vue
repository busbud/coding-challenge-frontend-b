<template lang="pug">

	footer#site-footer.site-footer

		div.site-footer__top

			div.site-footer__top__logo
				router-link(:to="{ name: 'home' }")
					svg(viewbox="0 0 84 28").site-footer__top__logo__icon
						use(xlink:href="/dist/assets/icons/icons.svg#logo")

			nav.site-footer__top__block-left

				h3.site-footer__top__title.heading-4.bold Company

				a(href="https://www.busbud.com/blog/").link Blog
				a(href="https://engineering.busbud.com/").link Engineering blog
				a(href="https://www.busbud.com/en/about").link About
				a(href="https://www.busbud.com/en/about/press").link Press
				a(href="https://www.busbud.com/en/careers").link Careers

			nav.site-footer__top__block-center

				h3.site-footer__top__title.heading-4.bold Support

				a(href="https://www.busbud.com/en/support").link Help
				a(href="http://help.busbud.com/hc/en-us").link Contact
				a(href="https://www.busbud.com/en/about/tos").link Terms of use
				a(href="https://www.busbud.com/en/about/privacy").link Privacy

			nav.site-footer__top__block-right

				h3.site-footer__top__title.heading-4.bold Community

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


		div.site-footer__bottom

			p.site-footer__bottom__copyright.reading-text © Fake Busbud inc. All rights reserved.

</template>

