import * as React from 'react';

const Html = (props: any) => (
    <html>
        <head>
            <title>App</title>
        </head>
        <body>
            <div id="app">{props.children}</div>
            <script id="initial-data" type="text/plain" data-json={props.initialData}></script>
            <script defer src="vendors~main.bundle.js" />
            <script defer src="bundle.js" />
        </body>
    </html>
);

export default Html;