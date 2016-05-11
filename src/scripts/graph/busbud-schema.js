/**
 * basic schema for relational-json, based off the busbud api responses
 */
module.exports = {
    City: {
        primary: "id",
        fields: {
            id: {
                dataType: "string"
            },
            name: {
                dataType: "string"
            },
            full_name: {
                dataType: "string"
            }
        }
    },
    Location: {
        primary: "id",
        fields: {
            id: {
                dataType: "integer"
            },
            city_id: {
                dataType: "string"
            },
            name: {
                dataType: "string"
            },
            address: {
                dataType: "string",
                allowNull: true
            }
        },
        aggregates: [
            {
                table: "City",
                alias: "City",
                localField: "city_id",
                foreignField: "id",
                cardinality: "single"
            }
        ]
    },
    Departure: {
        primary: "id",
        fields: {
            id: {
                dataType: "string"
            },
            class: {
                dataType: "string"
            },
            class_name: {
                dataType: "string"
            },
            destination_location_id: {
                dataType: "integer"
            },
            origin_location_id: {
                dataType: "integer"
            },
            duration: {
                dataType: "integer",
                allowNull: true
            },
            operator_id: {
                dataType: "string"
            },
            total_price: {
                dataType: "integer",
                allowNull: true
            },
            departure_time: {
                dataType: "datetime"
            },
            arrival_time: {
                dataType: "datetime"
            }
        },
        aggregates: [
            {
                table: "Operator",
                alias: "Operator",
                localField: "operator_id",
                foreignField: "id",
                cardinality: "single"
            },
            {
                table: "Location",
                alias: "OriginLocation",
                localField: "origin_location_id",
                foreignField: "id",
                cardinality: "single"
            },
            {
                table: "Location",
                alias: "DestinationLocation",
                localField: "destination_location_id",
                foreignField: "id",
                cardinality: "single"
            }
        ]
    },
    Operator: {
        primary: "id",
        fields: {
            id: {
                dataType: "string"
            },
            name: {
                dataType: "string"
            },
            logo_url: {
                dataType: "string"
            },
            display_name: {
                dataType: "string",
                allowNull: true
            }
        }
    }
};
