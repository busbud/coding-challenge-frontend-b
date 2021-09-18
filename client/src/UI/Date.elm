module UI.Date exposing (toString)

import Time


toString : Time.Posix -> String
toString time =
    String.fromInt (Time.toYear here time)
        ++ "-"
        ++ toNumberMonth (Time.toMonth here time)
        ++ "-"
        ++ pad (String.fromInt (Time.toDay here time))
        ++ " "
        ++ pad (String.fromInt (Time.toHour here time))
        ++ ":"
        ++ pad (String.fromInt (Time.toMinute here time))


here : Time.Zone
here =
    Time.customZone (2 * 60) []


pad : String -> String
pad str =
    case String.length str of
        0 ->
            "00"

        1 ->
            "0" ++ str

        _ ->
            str


toNumberMonth : Time.Month -> String
toNumberMonth month =
    case month of
        Time.Jan ->
            "01"

        Time.Feb ->
            "02"

        Time.Mar ->
            "03"

        Time.Apr ->
            "04"

        Time.May ->
            "05"

        Time.Jun ->
            "06"

        Time.Jul ->
            "07"

        Time.Aug ->
            "08"

        Time.Sep ->
            "09"

        Time.Oct ->
            "10"

        Time.Nov ->
            "11"

        Time.Dec ->
            "12"
