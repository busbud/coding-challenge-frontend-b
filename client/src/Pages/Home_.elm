module Pages.Home_ exposing (Model, Msg, page)

import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Page
import Request
import Shared exposing (init, update)
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.element
        { init = init req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    {}


init : Request.With Params -> ( Model, Cmd Msg )
init req =
    ( {}, Cmd.none )


type Msg
    = Nada


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        _ ->
            ( model, Cmd.none )


view : Shared.Model -> Model -> View Msg
view _ _ =
    [ div [ class "page-content" ] [ text "oioioi" ]
    ]
