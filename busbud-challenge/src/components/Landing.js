import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Image, Heading } from 'rebass';
import { CenteredContainer, CTAButton } from './ui-components';
import { withLocalize, Translate } from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';
import globalTranslations from '../translations/global.json';
import LanguageToggle from './SetLanguage';

class Landing extends Component {
	constructor(props) {
		super(props);

		this.props.initialize({
			languages: [
				{ name: "English", code: "en" },
				{ name: "French", code: "fr" }
			],
			translation: globalTranslations,
			options: { renderToStaticMarkup }
		});
	}
    render() {
        return (
					<CenteredContainer>
						<LanguageToggle />
						<Image src='https://cloud.githubusercontent.com/assets/1574577/12971188/13471bd0-d066-11e5-8729-f0ca5375752e.png' />
						<Heading as='h1' color='white' fontSize={[3,4,5]}>
							<Translate id="landing_title"/>
						</Heading>
						<Link to="/search">
							<CTAButton
								bg='#bf5648'
								px={4}
								py={4}
								fontSize={[5,6,7]}
								m={4}
							>
								<Translate id="landing_cta"/>
							</CTAButton>
						</Link>
					</CenteredContainer>
        )
    }
}

export default withLocalize(Landing);