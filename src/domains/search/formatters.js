const getImageUrl = (doc) => {
  const { lccn, oclc, isbn } = doc;
  const coverUrl = 'https://covers.openlibrary.org/b/{KEY}/{VALUE}-M.jpg';

  if (lccn) {
    return coverUrl.replace('{KEY}', 'lccn').replace('{VALUE}', lccn[0]);
  }

  if (oclc) {
    return coverUrl.replace('{KEY}', 'oclc').replace('{VALUE}', oclc[0]);
  }

  if (isbn) {
    return coverUrl.replace('{KEY}', 'isbn').replace('{VALUE}', isbn[0]);
  }

  return undefined;
};

export const mapDocsToBooks = docs => docs.map(doc => ({
  authors: doc.author_name,
  title: doc.title_suggest,
  firstPublishYear: doc.first_publish_year,
  imageUrl: getImageUrl(doc),
}));
