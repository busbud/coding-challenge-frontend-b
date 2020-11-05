// @flow
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ChevronIcon } from '../../assets/images/chevron-icon.svg';
import { AmenitiesWrapper, Button } from './styledComponent';

type Props = {
    amenities: Array<String>,
}

function AmenitiesToggle(props: Props) {
  const {
    amenities,
  } = props;

  const { t } = useTranslation();

  const [showAmenities, setShowAmenities] = useState(false);

  return (
    <>
      {(amenities.length > 0) && (
      <Button
        type="button"
        onClick={() => setShowAmenities(!showAmenities)}
        showAmenities={showAmenities}
      >
        {t('amenities')}
        <ChevronIcon
          style={{
            transform: `rotate(${showAmenities ? 180 : 0}deg)`,
          }}
        />
      </Button>
      )}
      {showAmenities && (
        <AmenitiesWrapper>
            {amenities.map((amenity) => {
              return (
                <p key={amenity}>{t(`amenity_${amenity}`)}</p>
              );
            })}
        </AmenitiesWrapper>
      )}
    </>
  );
}

export default AmenitiesToggle;
