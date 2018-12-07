import React from 'react';
import renderer from 'react-test-renderer';
import withI18n from '../withI18n';
import I18nProvider from '../I18nProvider';

const props = {
    children: <div /> 
};

describe('withI18n', () => {
    it('should return the component wrapped in i18n', () => {
        const Cmp = withI18n(({i18n}) => <div>{i18n.currentLanguage}</div>);
        const tree = renderer.create(<I18nProvider {...props}><Cmp /></I18nProvider>);
        expect(tree).toMatchSnapshot();
    })
})