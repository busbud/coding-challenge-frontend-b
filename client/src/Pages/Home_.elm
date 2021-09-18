module Pages.Home_ exposing (Model, Msg, page)

import API.Departures exposing (Departure)
import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Http
import Page
import Request
import Shared exposing (init, update)
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
    ( Searching, API.Departures.fetchDepartures FetchedDepartures { origin = "f2m673", destination = "f25dvk", date = "2021-10-01" } )



-- ( Welcome, Cmd.none )


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
            [ div [ class "page-content" ]
                [ h1 [] [ text "Welcome to Budoshea!" ]
                , h2 [] [ text "We will get you to Osheaga in no time" ]
                , button [ onClick GoToSearch ] [ text "Stop talking and get me there" ]
                ]
            ]

        Searching ->
            [ div [ class "page-content" ]
                [ h1 [] [ text "Well, you're late. 2021's Osheaga is in the past..." ]
                , h2 [] [ text "But we cang et you to the next Get Together in October 1st" ]
                , p [] [ text "We're figuring out your trip, gimme a sec." ]
                ]
            ]

        Results departures ->
            [ div [ class "page-content" ]
                [ h1 [] [ text "Here we go!" ]
                , ul []
                    (departures
                        |> List.map
                            (\departure ->
                                li []
                                    [ div []
                                        [ text "Leave "
                                        , text departure.departureLocation
                                        , text "at "
                                        , text <| String.fromInt departure.departureTime
                                        , text ". "
                                        , text "Arrive in "
                                        , text departure.arrivalLocation
                                        , text "at "
                                        , text <| String.fromInt departure.arrivalTime
                                        , text ". "
                                        , text "For the amazing price of "
                                        , text <| String.fromInt <| Tuple.first departure.price
                                        , text " "
                                        , text <| Tuple.second departure.price
                                        ]
                                    ]
                            )
                    )
                ]
            ]

        FetchError ->
            [ div [ class "page-content" ]
                [ h1 [] [ text "Ooops, we got an error here!" ]
                ]
            ]
