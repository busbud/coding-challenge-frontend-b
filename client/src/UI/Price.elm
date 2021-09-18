module UI.Price exposing (Price, toString)

import String exposing (fromInt)


type alias Price =
    ( Int, String )


toString : Price -> String
toString ( amount, currency ) =
    let
        dolars =
            amount // 100

        cents =
            modBy 100 amount
    in
    fromInt dolars ++ "." ++ fromInt cents ++ " " ++ currency
