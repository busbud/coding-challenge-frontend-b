module Pages.Home_ exposing (Model, Msg, page)

import API.Departures exposing (Departure)
import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Http
import Page
import Request
import Shared exposing (init, update)
import UI.Date
import UI.Price
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page _ _ =
    Page.element
        { init = init
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }


type Model
    = Welcome
    | Searching
    | Results (List Departure)
    | FetchError


init : ( Model, Cmd Msg )
init =
    ( Welcome, Cmd.none )


type Msg
    = GoToSearch
    | FetchedDepartures (Result Http.Error (List Departure))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg _ =
    case msg of
        GoToSearch ->
            ( Searching, API.Departures.fetchDepartures FetchedDepartures { origin = "f2m673", destination = "f25dvk", date = "2021-10-01" } )

        FetchedDepartures (Err _) ->
            ( FetchError, Cmd.none )

        FetchedDepartures (Ok departureList) ->
            ( Results departureList, Cmd.none )


view : Model -> View Msg
view model =
    case model of
        Welcome ->
            template
                [ h2 [] [ text "We will get you to Osheaga in no time" ]
                , giphy "y2J2hwdC4gS7S" 73
                , p [] [ text "Looks like you are in Québec. Let's get you to Montréal" ]
                , button [ onClick GoToSearch ] [ text "Show me the buses" ]
                ]

        Searching ->
            template
                [ h2 [] [ text "Loading..." ]
                , giphy "J1ZajKJKzD0PK" 57
                , p [] [ text "nice spinner, uh? ☝" ]
                ]

        Results departures ->
            template
                [ h2 [] [ text "There we go!" ]
                , ul [ class "buslist" ] (List.map departureView departures)
                ]

        FetchError ->
            template
                [ h2 [] [ text "Ooops" ]
                , giphy "1RkDDoIVs3ntm" 100
                ]


template : List (Html Msg) -> List (Html Msg)
template content =
    [ div [ class "page-header" ] [ h1 [] [ text "Your trip to Osheaga" ] ]
    , div [ class "page-content" ] content
    ]


departureView : Departure -> Html Msg
departureView departure =
    li [ class "buslist-item" ]
        [ div [ class "buslist-departure" ]
            [ text "⏪ "
            , text <| UI.Date.toString departure.departureTime
            , text ": "
            , text departure.departureLocation
            ]
        , div [ class "buslist-arrival" ]
            [ text "⏩ "
            , text <| UI.Date.toString departure.arrivalTime
            , text ": "
            , text departure.arrivalLocation
            ]
        , div [ class "buslist-price" ]
            [ text <| UI.Price.toString departure.price
            ]
        ]


giphy : String -> Int -> Html msg
giphy s magicNumber =
    div [ class "giphy", style "padding-bottom" (String.fromInt magicNumber ++ "%") ]
        [ iframe
            [ src <| "https://giphy.com/embed/" ++ s
            , attribute "frameBorder" "0"
            , attribute "width" "100%"
            , attribute "height" "100%"
            ]
            []
        ]
