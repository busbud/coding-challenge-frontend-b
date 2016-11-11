
/* eslint-disable prefer-template, max-len */

export default vo => `

<!DOCTYPE html>
<html lang="en">

  <head>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Exo+2:400,600">
    ${vo.cssBundle ? '<link rel="stylesheet" href="' + vo.cssBundle + '">' : ''}

    <title>Universal React Starter Kyt</title>
  </head>

  <body>
    <div id="root"><div>${vo.root}</div></div>
    <script src="${vo.jsBundle}"></script>
  </body>

</html>

`;
