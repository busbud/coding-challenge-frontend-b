import React from "react";
import { Flex, Button } from 'rebass';
import { withLocalize } from "react-localize-redux";

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => (
  <Flex my={3}>
    {languages.map(lang => (
      <Button mx={3} bg='#bf5648' onClick={() => setActiveLanguage(lang.code)} key={lang.code}>
        {lang.name}
      </Button>
    ))}
  </Flex>
);

export default withLocalize(LanguageToggle);