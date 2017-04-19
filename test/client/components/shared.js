import expect from 'expect';
import React from 'react';

//ensure a11y on component
import a11y from 'react-a11y';

//This reg-exp matches BEM class names
//I did not write it, but got it here: https://regex101.com/r/yP0eM7/1 and mofidied it (source: https://github.com/brigade/scss-lint/issues/240)
let cssBEMRegExp = new RegExp("^([\.\%]?[a-z]*[-]?[a-z0-9\-]*)(\.[a-z0-9\-]*)?(__[a-z0-9]*[-]?[a-z0-9\-]*)?(--[a-z0-9]*[-]?[a-z0-9\-]*)?(\:[a-z]*)*","");

const shared = function(setup) {
    describe('shared component check', function() {

        //cleanup a11y after each test
        beforeEach(() => a11y(React, { throw: true }));
        afterEach(() => a11y.restoreAll());

        it('should be a11y compliant', () => {
            setup();

            //a11y check is done by 'react-a11y', nothing special to do here.
        });

        it('class names should be BEM compliant', () => {
            const { output } = setup();

            if (output.props.className) {
                expect(output.props.className).toMatch(cssBEMRegExp);
            }

            const checkChildren = (children) => {
                if (children) {

                    if (!children.map) {
                        //turn a lonely child into an array
                        children = [children];
                    }

                    children.map(child => {
                        if (child && child.props && child.props.className) {
                            expect(child.props.className).toMatch(cssBEMRegExp);
                            checkChildren(child.props.children);
                        }
                    });
                }
            };

            //recursively check children
            checkChildren(output.props.children);

        });



    });
};

export default shared;

