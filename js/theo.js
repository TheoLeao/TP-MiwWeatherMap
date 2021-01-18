

dataBorne_1 = {
    "_id": "70:ee:50:15:ee:be",
    "place": {
        "location": [
            0.191006,
            41.015354
        ],
        "timezone": "Europe/Madrid",
        "country": "ES",
        "altitude": 483,
        "city": "Calaceite / Calaceit"
    },
    "mark": 10,
    "measures": {
        "02:00:00:17:5c:a2": {
            "res": {
                "1610980085": [13, 50
                ]
            },
            "type": [
                "temperature",
                "humidity"
            ]
        },
        "70:ee:50:15:ee:be": {
            "res": {
                "1610980086": [1021.4]
            },
            "type": [
                "pressure"
            ]
        },
        "05:00:00:04:43:5a": {
            "rain_60min": 0,
            "rain_24h": 0,
            "rain_live": 0,
            "rain_timeutc": 1610980085
        }
    },
    "modules": [
        "05:00:00:04:43:5a",
        "02:00:00:17:5c:a2"
    ],
    "module_types": {
        "05:00:00:04:43:5a": "NAModule3",
        "02:00:00:17:5c:a2": "NAModule1"
    }
};

dataBorne_2 = {
    "_id": "70:ee:50:27:82:f2",
    "place": {
        "location": [
            0.478502,
            41.077757
        ],
        "timezone": "Europe/Madrid",
        "country": "ES",
        "altitude": 295,
        "city": "Corbera d'Ebre",
        "street": "Carrer del Doctor Ferrán"
    },
    "mark": 14,
    "measures": {
        "02:00:00:27:8d:7a": {
            "res": {
                "1610980431": [
                    13.4,
                    59
                ]
            },
            "type": [
                "temperature",
                "humidity"
            ]
        },
        "70:ee:50:27:82:f2": {
            "res": {
                "1610980440": [
                    1027.5
                ]
            },
            "type": [
                "pressure"
            ]
        },
        "05:00:00:03:e5:d8": {
            "rain_60min": 0,
            "rain_24h": 0,
            "rain_live": 0,
            "rain_timeutc": 1610980431
        },
        "06:00:00:02:51:7c": {
            "wind_strength": 7,
            "wind_angle": 262,
            "gust_strength": 15,
            "gust_angle": 238,
            "wind_timeutc": 1610980438
        }
    },
    "modules": [
        "02:00:00:27:8d:7a",
        "05:00:00:03:e5:d8",
        "06:00:00:02:51:7c"
    ],
    "module_types": {
        "02:00:00:27:8d:7a": "NAModule1",
        "05:00:00:03:e5:d8": "NAModule3",
        "06:00:00:02:51:7c": "NAModule2"
    }
};

//console.log(dataBorne_1.measures);
//console.log(dataBorne_2.measures);
console.log(dataBorne_2.measures);
console.log('Object.keys(dataBorne_2.measures: '+Object.keys(dataBorne_2.measures)[0]);
console.log(dataBorne_2.measures[Object.keys(dataBorne_2.measures)[0]]);
console.log(
    dataBorne_2.measures[Object.keys(dataBorne_2.measures)[0]].res[Object.keys(dataBorne_2.measures[Object.keys(dataBorne_2.measures)[0]].res)[0]]
);