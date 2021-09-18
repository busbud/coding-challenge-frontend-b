module API.Departures exposing (Departure, fetchDepartures)

import Http
import Json.Decode as Decode exposing (Decoder, field, int, list, map2, string)
import Json.Decode.Pipeline exposing (required)


type alias Departure =
    { arrivalLocation : String
    , arrivalTime : Int
    , departureLocation : String
    , departureTime : Int
    , price : Price
    }


type alias Price =
    ( Int, String )


type alias Options =
    { origin : String
    , destination : String
    , date : String
    }


fetchDepartures : (Result Http.Error (List Departure) -> msg) -> Options -> Cmd msg
fetchDepartures msg options =
    Http.get
        { url = "http://budoshea.herokuapp.com/api/departures/from/" ++ options.origin ++ "/to/" ++ options.destination ++ "/date/" ++ options.date
        , expect = Http.expectJson msg decodeDepartures
        }


decodeDepartures : Decoder (List Departure)
decodeDepartures =
    list decodeDeparture


decodeDeparture : Decoder Departure
decodeDeparture =
    Decode.succeed Departure
        |> required "arrivalLocationName" string
        |> required "arrivalEpoch" int
        |> required "departureLocationName" string
        |> required "departureEpoch" int
        |> required "price" decodePrice


decodePrice : Decoder Price
decodePrice =
    map2 Tuple.pair (field "amount" int) (field "currency" string)
