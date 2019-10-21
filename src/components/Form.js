import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
    padding: 5px 10px;
    font-size: 18px;
    .form__input-group {
        margin: 3px 0;
        &__label {
            margin-right: 5px;
        }
    }
    @media only screen and (min-width: 767px) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        .form__input-group {
            margin: 0 10px;
        }
    }
`

export default ({ 
    handleForm, 
    handleSubmit,
    formData: { adult, lang, currency } 
}) => (
    <Form className='form' onSubmit={handleSubmit} onChange={handleForm}>
        <div className='form__input-group'>
            <label className='form__input-group__label' htmlFor='adult'>Adult(s)</label>
            <input className='form__input-group__input' type='number' id='adult' min='1' max='5' defaultValue={adult} />
        </div>
        <div className='form__input-group'>
            <label className='form__input-group__label' htmlFor='lang'>Language</label>
                {/* https://stackoverflow.com/a/38909979/9828708 */}
                <select className='form__input-group__input' id='lang' name="lang" defaultValue={lang}>
                    <option value="AF">Afrikanns</option>
                    <option value="SQ">Albanian</option>
                    <option value="AR">Arabic</option>
                    <option value="HY">Armenian</option>
                    <option value="EU">Basque</option>
                    <option value="BN">Bengali</option>
                    <option value="BG">Bulgarian</option>
                    <option value="CA">Catalan</option>
                    <option value="KM">Cambodian</option>
                    <option value="ZH">Chinese (Mandarin)</option>
                    <option value="HR">Croation</option>
                    <option value="CS">Czech</option>
                    <option value="DA">Danish</option>
                    <option value="NL">Dutch</option>
                    <option value="EN">English</option>
                    <option value="ET">Estonian</option>
                    <option value="FJ">Fiji</option>
                    <option value="FI">Finnish</option>
                    <option value="FR">French</option>
                    <option value="KA">Georgian</option>
                    <option value="DE">German</option>
                    <option value="EL">Greek</option>
                    <option value="GU">Gujarati</option>
                    <option value="HE">Hebrew</option>
                    <option value="HI">Hindi</option>
                    <option value="HU">Hungarian</option>
                    <option value="IS">Icelandic</option>
                    <option value="ID">Indonesian</option>
                    <option value="GA">Irish</option>
                    <option value="IT">Italian</option>
                    <option value="JA">Japanese</option>
                    <option value="JW">Javanese</option>
                    <option value="KO">Korean</option>
                    <option value="LA">Latin</option>
                    <option value="LV">Latvian</option>
                    <option value="LT">Lithuanian</option>
                    <option value="MK">Macedonian</option>
                    <option value="MS">Malay</option>
                    <option value="ML">Malayalam</option>
                    <option value="MT">Maltese</option>
                    <option value="MI">Maori</option>
                    <option value="MR">Marathi</option>
                    <option value="MN">Mongolian</option>
                    <option value="NE">Nepali</option>
                    <option value="NO">Norwegian</option>
                    <option value="FA">Persian</option>
                    <option value="PL">Polish</option>
                    <option value="PT">Portuguese</option>
                    <option value="PA">Punjabi</option>
                    <option value="QU">Quechua</option>
                    <option value="RO">Romanian</option>
                    <option value="RU">Russian</option>
                    <option value="SM">Samoan</option>
                    <option value="SR">Serbian</option>
                    <option value="SK">Slovak</option>
                    <option value="SL">Slovenian</option>
                    <option value="ES">Spanish</option>
                    <option value="SW">Swahili</option>
                    <option value="SV">Swedish </option>
                    <option value="TA">Tamil</option>
                    <option value="TT">Tatar</option>
                    <option value="TE">Telugu</option>
                    <option value="TH">Thai</option>
                    <option value="BO">Tibetan</option>
                    <option value="TO">Tonga</option>
                    <option value="TR">Turkish</option>
                    <option value="UK">Ukranian</option>
                    <option value="UR">Urdu</option>
                    <option value="UZ">Uzbek</option>
                    <option value="VI">Vietnamese</option>
                    <option value="CY">Welsh</option>
                    <option value="XH">Xhosa</option>
                </select>
        </div>
        <div className='form__input-group'>
            <label className='form__input-group__label' htmlFor='currency'>Currency</label>
                {/* https://gist.github.com/AmrMekkawy/a5425a4dd4e453a4eb4d#file-currency-dropdown-list-html */}
                <select className='form__input-group__input' id='currency' name="currency" defaultValue={currency}>
                    <option value="USD">United States Dollars</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">United Kingdom Pounds</option>
                    <option value="DZD">Algeria Dinars</option>
                    <option value="ARP">Argentina Pesos</option>
                    <option value="AUD">Australia Dollars</option>
                    <option value="ATS">Austria Schillings</option>
                    <option value="BSD">Bahamas Dollars</option>
                    <option value="BBD">Barbados Dollars</option>
                    <option value="BEF">Belgium Francs</option>
                    <option value="BMD">Bermuda Dollars</option>
                    <option value="BRR">Brazil Real</option>
                    <option value="BGL">Bulgaria Lev</option>
                    <option value="CAD">Canada Dollars</option>
                    <option value="CLP">Chile Pesos</option>
                    <option value="CNY">China Yuan Renmimbi</option>
                    <option value="CYP">Cyprus Pounds</option>
                    <option value="CSK">Czech Republic Koruna</option>
                    <option value="DKK">Denmark Kroner</option>
                    <option value="NLG">Dutch Guilders</option>
                    <option value="XCD">Eastern Caribbean Dollars</option>
                    <option value="EGP">Egypt Pounds</option>
                    <option value="FJD">Fiji Dollars</option>
                    <option value="FIM">Finland Markka</option>
                    <option value="FRF">France Francs</option>
                    <option value="DEM">Germany Deutsche Marks</option>
                    <option value="XAU">Gold Ounces</option>
                    <option value="GRD">Greece Drachmas</option>
                    <option value="HKD">Hong Kong Dollars</option>
                    <option value="HUF">Hungary Forint</option>
                    <option value="ISK">Iceland Krona</option>
                    <option value="INR">India Rupees</option>
                    <option value="IDR">Indonesia Rupiah</option>
                    <option value="IEP">Ireland Punt</option>
                    <option value="ILS">Israel New Shekels</option>
                    <option value="ITL">Italy Lira</option>
                    <option value="JMD">Jamaica Dollars</option>
                    <option value="JPY">Japan Yen</option>
                    <option value="JOD">Jordan Dinar</option>
                    <option value="KRW">Korea (South) Won</option>
                    <option value="LBP">Lebanon Pounds</option>
                    <option value="LUF">Luxembourg Francs</option>
                    <option value="MYR">Malaysia Ringgit</option>
                    <option value="MXP">Mexico Pesos</option>
                    <option value="NLG">Netherlands Guilders</option>
                    <option value="NZD">New Zealand Dollars</option>
                    <option value="NOK">Norway Kroner</option>
                    <option value="PKR">Pakistan Rupees</option>
                    <option value="XPD">Palladium Ounces</option>
                    <option value="PHP">Philippines Pesos</option>
                    <option value="XPT">Platinum Ounces</option>
                    <option value="PLZ">Poland Zloty</option>
                    <option value="PTE">Portugal Escudo</option>
                    <option value="ROL">Romania Leu</option>
                    <option value="RUR">Russia Rubles</option>
                    <option value="SAR">Saudi Arabia Riyal</option>
                    <option value="XAG">Silver Ounces</option>
                    <option value="SGD">Singapore Dollars</option>
                    <option value="SKK">Slovakia Koruna</option>
                    <option value="ZAR">South Africa Rand</option>
                    <option value="KRW">South Korea Won</option>
                    <option value="ESP">Spain Pesetas</option>
                    <option value="XDR">Special Drawing Right (IMF)</option>
                    <option value="SDD">Sudan Dinar</option>
                    <option value="SEK">Sweden Krona</option>
                    <option value="CHF">Switzerland Francs</option>
                    <option value="TWD">Taiwan Dollars</option>
                    <option value="THB">Thailand Baht</option>
                    <option value="TTD">Trinidad and Tobago Dollars</option>
                    <option value="TRL">Turkey Lira</option>
                    <option value="VEB">Venezuela Bolivar</option>
                    <option value="ZMK">Zambia Kwacha</option>
                    <option value="EUR">Euro</option>
                    <option value="XCD">Eastern Caribbean Dollars</option>
                    <option value="XDR">Special Drawing Right (IMF)</option>
                    <option value="XAG">Silver Ounces</option>
                    <option value="XAU">Gold Ounces</option>
                    <option value="XPD">Palladium Ounces</option>
                    <option value="XPT">Platinum Ounces</option>
                </select>
        </div>
        <input className='form__submit' type='submit' />
    </Form>
)
