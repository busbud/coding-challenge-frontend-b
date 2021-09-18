module View exposing (View, map, none, placeholder, toBrowserDocument)

import Browser
import Html exposing (Html)


type alias View msg =
    List (Html msg)


placeholder : String -> View msg
placeholder str =
    [ Html.text str ]


none : View msg
none =
    placeholder ""


map : (a -> b) -> View a -> View b
map fn view =
    List.map (Html.map fn) view


toBrowserDocument : View msg -> Browser.Document msg
toBrowserDocument view =
    { title = title
    , body = view
    }


title : String
title =
    "Budoshea"
