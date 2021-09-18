module UI.Date exposing (toString)

import Time


toString : Time.Posix -> String
toString time =
    pad (String.fromInt (Time.toDay here time))
        ++ " "
        ++ monthShortName (Time.toMonth here time)
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


monthShortName : Time.Month -> String
monthShortName month =
    case month of
        Time.Jan ->
            "Jan"

        Time.Feb ->
            "Feb"

        Time.Mar ->
            "Mar"

        Time.Apr ->
            "Apr"

        Time.May ->
            "May"

        Time.Jun ->
            "Jun"

        Time.Jul ->
            "Jul"

        Time.Aug ->
            "Aug"

        Time.Sep ->
            "Sep"

        Time.Oct ->
            "Oct"

        Time.Nov ->
            "Nov"

        Time.Dec ->
            "Dec"
