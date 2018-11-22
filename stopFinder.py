import sys, requests, json, time
from datetime import datetime
from trip import Trip


def datetime_from_utc_to_local(utc_datetime):
    now_timestamp = time.time()
    offset = datetime.fromtimestamp(now_timestamp) - datetime.utcfromtimestamp(now_timestamp)
    return utc_datetime + offset


def printSummary(minutes, depart, arrive, summary, routes):
    print(str(depart) + " - " + str(arrive) +
            " (" + str(minutes) + " mins)")
    for index, item in enumerate(summary):
        print(item + " (" + routes[index] + ") -> ", end="", flush=True)
    print()

def writeJSONToFile(journeys):
    with open("trip.json", "w") as w:
        w.write(json.dumps(journeys, indent=4))
def getStop(searchTerm):

    dictToReturn = 'locations' # If this changes in the future, change this variable
    api_key = "Y2c69i8Cmf6QA5g838QzNSXPzbGEYssJDySK"

    base_url = "https://api.transport.nsw.gov.au/v1/tp/stop_finder"

    headers = {"Authorization": "apikey " + api_key}

    payload = {"outputFormat": "rapidJSON", \
            "type_sf": "stop", \
            "name_sf": searchTerm, \
			"coordOutputFormat": "EPSG:4326", \
            "TfNSWSF": "true",\
			"version": "10.2.1.42"}

    response = requests.get(base_url, headers=headers, stream=True, params=payload)
    # print("response code: " + str(response.status_code))
    data = json.loads(response.content)
    # print(str(data[dictToReturn]))
    # print(data[dictToReturn])
    return data[dictToReturn]

def getStopName(stopID):
    dictToReturn = 'locations'  # If this changes in the future, change this variable
    api_key = "Y2c69i8Cmf6QA5g838QzNSXPzbGEYssJDySK"

    base_url = "https://api.transport.nsw.gov.au/v1/tp/stop_finder"

    headers = {"Authorization": "apikey " + api_key}

    payload = {"outputFormat": "rapidJSON", \
            "type_sf": "stop", \
            "name_sf": stopID, \
			"coordOutputFormat": "EPSG:4326", \
            "TfNSWSF": "true",\
			"version": "10.2.1.42"}

    response = requests.get(base_url, headers=headers, stream=True, params=payload)
    # print("response code: " + str(response.status_code))
    data = json.loads(response.content)
    
    # print(data[dictToReturn])
    return data[dictToReturn][0]["name"]

def getLegInfo(legs): # Gets info from legs array and puts it into a new array for easier read/write
    simpleLegs = []

    for index, leg in enumerate(legs): # iterate through array
        simpleLeg = {}
        simpleLeg["origin"] = leg["origin"]["name"]
        simpleLeg["destination"] = leg["destination"]["name"]
        if "number" in leg["transportation"]: # Detect if the leg is a walk or not
            simpleLeg["route"] = leg["transportation"]["number"]
        else:
            simpleLeg["route"] = "walk"
        originTime = datetime.strptime(
            leg["origin"]['departureTimePlanned'], "%Y-%m-%dT%H:%M:%SZ")
        destTime = datetime.strptime(
            leg["destination"]['arrivalTimePlanned'], "%Y-%m-%dT%H:%M:%SZ")
            
        originTime = datetime_from_utc_to_local(originTime)
        destTime = datetime_from_utc_to_local(destTime)
        simpleLeg["originTime"] = str(originTime)
        simpleLeg["destTime"] = str(destTime)
        print("%s: %d" % (simpleLeg["origin"], index))
        simpleLegs.append(simpleLeg)
    return simpleLegs

# depArrMacro = dep
# itdDate = 20161001
# itdTime = 1200
# stopSrc = Rouse Hill Town Centre
# stopDest = Parramatta
def getTrip(depArrMacro, itdDate, itdTime, stopSrc, stopDest, stopNameSrc, stopNameDest):
    api_key = "Y2c69i8Cmf6QA5g838QzNSXPzbGEYssJDySK"

    base_url = "https://api.transport.nsw.gov.au/v1/tp/trip"

    headers = {"Authorization": "apikey " + api_key}

    payload = {"outputFormat": "rapidJSON",
               "coordOutputFormat": "EPSG:4326",
               "depArrMacro": depArrMacro,
               "itdDate": itdDate,
               "itdTime": itdTime,
               "type_origin": "any",
               "name_origin": stopSrc,
               "type_destination": "any",
               "name_destination": stopDest,
               "calcNumberOfTrips": 6,
               "TfNSWSF": "true",
               "version": "10.2.1.42"}
    # Load payload to send to TfNSW Server
    response = requests.get(base_url, headers=headers, stream=True, params=payload)
    data = json.loads(response.content)

    # Get response from server

    journeys = data['journeys'] # Get journeys part of data
    writeJSONToFile(journeys) # For debugging
    trips = [] # Array of trip objects
    for journey in journeys: # go through array of journeys - journeys has search results of trips
        legs = journey['legs'] # put into variables for easier writing code
        fares = journey['fare']
        totalDuration = 0
        summary = [] # contains transportation types
        routes = [] # contains routes
        legNumber = 0
        for leg in legs: # following code uses code from TfNSW Documentation
            totalDuration += leg['duration']

            origin = leg['origin']
            destination = leg['destination']

            if legNumber == 0:
                depart = datetime.strptime(origin['departureTimePlanned'], "%Y-%m-%dT%H:%M:%SZ")
                depart = datetime_from_utc_to_local(depart)
            if legNumber == len(legs) - 1:
                arrive = datetime.strptime(destination['arrivalTimePlanned'], "%Y-%m-%dT%H:%M:%SZ")
                arrive = datetime_from_utc_to_local(arrive)
            transportation = leg['transportation']

            if "number" in transportation: # If number is not in transportation, then it is a walking leg
                routes.append(transportation['number'])
            else:
                routes.append("Walk")

            routeType = int(transportation['product']['class'])
            if (routeType == 1):
                summary.append("Train")
            elif routeType == 4:
                summary.append("Light Rail")
            elif routeType == 5:
                summary.append("Bus")
            elif routeType == 7:
                summary.append("Coach")
            elif routeType == 9:
                summary.append("Ferry")
            elif routeType == 11:
                summary.append("School Bus")
            else:
                summary.append("Walk")
            legNumber += 1
        minutes = totalDuration / 60
        # def __init__(self, minutes, depart, arrive, transportTypes, routes):

        # Load data into trip object/class
        origin = stopNameSrc
        dest = stopNameDest
        trip = Trip(origin, dest, minutes, depart, arrive, summary, routes, getLegInfo(legs))
        trips.append(trip)
    return trips





if __name__ == '__main__':
    # getStop("Rouse Hill Town Centre")
    # getTrip("dep", "20181111", "2000", "10131333", "10101229")
    print(getStopName("10104007"))
    
