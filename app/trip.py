class Trip():
    # This code was added because of a suggestion by Roshan Sriram
    def checkForRichmondLine(self):
        with open("app/static/richmondLine.txt", "r") as r:
            stations = r.readlines()
        stations = [x.strip() for x in stations]
        if self._origin in stations or self._destination in stations:
            for index, route in enumerate(self._routes):
                if route.find("T1 North Shore, Northern & Western Line") != -1:
                    self._routes[index] = "T1 Richmond Line"
    def checkForPenrithLine(self):
        with open("app/static/penrithLine.txt", "r") as r:
            stations = r.readlines()
        stations = [x.strip() for x in stations]
        if self._origin in stations or self._destination in stations:
            for index, route in enumerate(self._routes):
                if route.find("T1 North Shore, Northern & Western Line") != -1:
                    self._routes[index] = "T1 Penrith Line"
    
    def checkLines(self):
        self.checkForRichmondLine()
        self.checkForPenrithLine()

    def __init__(self, origin, destination, minutes, depart, arrive, transportTypes, routes, legs):
        self._origin = origin
        self._destination = destination
        self._minutes = minutes;
        self._depart = depart
        self._arrive = arrive
        self._transportTypes = transportTypes
        self._routes = routes
        self._legs = legs
        self.checkLines()

    @property
    def origin(self):
        return self._origin
    @property
    def destination(self):
        return self._destination
    @property
    def minutes(self):
        return self._minutes
    
    @property
    def depart(self):
        return self._depart

    @property
    def arrive(self):
        return self._arrive
    
    @property
    def transportTypes(self):
        return self._transportTypes
    
    @property
    def routes(self):
        return self._routes
    
    @property
    def legs(self):
        return self._legs
    
    def stringRoutes(self):
        string = ""
        for index, route in enumerate(self._routes):
            string += route
            if index != len(self._routes) - 1:
                string += " -> "
        return string

