from flask import request, render_template, redirect, url_for
from app import app
from app.stopFinder import getStop, getTrip, getStopName

mainRoute = ''

@app.route(mainRoute + '/', methods=['GET','POST'])
def index():
    return render_template('base.html')

@app.route(mainRoute + '/stopFinder', methods=['GET','POST'])
def stopFinder(): # Stop Finder Search
    if request.method == 'POST': # If clicked search
        stops = getStop(request.form['searchBox']) # get dictionary of stops
        return render_template("stopFinderResults.html", searchTerm=request.form['searchBox'], stops=stops)
    return render_template('stopFinder.html')

@app.route(mainRoute + "/tripFinder", methods=['GET', 'POST'])
def tripFinder():
    if request.method == 'POST':
        
        date = request.form['dateBox'].replace('-','')
        time = request.form['timeBox'].replace(':', '')
        departStop = getStop(request.form['departBox'])
        arriveStop = getStop(request.form['arriveBox'])
        
        stopSrcName = getStopName(departStop[0]['id'])
        stopDestName = getStopName(arriveStop[0]['id'])
        trips = getTrip(request.form['depArrRadio'], date, time, departStop[0]['id'], arriveStop[0]['id'],
                        stopSrcName, stopDestName)
        return render_template("tripResults.html", src=stopSrcName, dest=stopDestName, trips=trips)
    return render_template('trip.html')

@app.route(mainRoute + "/favourites", methods=['GET', 'POST'])
def favourites():
    # if request.method == 'POST':
    
    return render_template("favourites.html")

@app.route(mainRoute + "/getStopID", methods=['POST'])
def getStopID():
    name = str(request.get_data().decode('utf-8'))
    return getStopName(name)
