import React from "react";
import ContentLoader from "react-content-loader"

export const CardLoader = () => (
    <ContentLoader
        height={70}
        width={600}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="5" y="5" rx="3" ry="3" width="100" height="20" />
        <rect x="5" y="30" rx="3" ry="3" width="130" height="15" />
        <rect x="5" y="50" rx="3" ry="3" width="90" height="10" />
        <rect x="495" y="5" rx="3" ry="3" width="100" height="20" />
        <rect x="465" y="30" rx="3" ry="3" width="130" height="15" />
        <rect x="505" y="50" rx="3" ry="3" width="90" height="10" />
    </ContentLoader>
)

export default CardLoader;
