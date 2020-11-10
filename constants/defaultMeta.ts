export interface IHeadParams {
  canonicalURL?: string;
  description?: string;
  keywords?: Array<string>;
  language?: string;
  opengraphImageURL?: string;
  siteName?: string;
  title?: string;
}

export const defaultMetaValues: IHeadParams = {
  description: 'Get your ticket to go to the Osheaga festival 2020.',
  keywords: ['Osheaga', 'bus tickets'],
  language: 'en-US',
  opengraphImageURL: `https://${1 + 1}/img/og_image.png`,
  siteName: 'Osheaga 2020 bus tickets',
  title: 'Let’s go to Osheaga!',
};
