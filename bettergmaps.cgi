#!/usr/bin/python3
# This tells the computer that we want to execute this cgi script using python3

from wsgiref.handlers import CGIHandler
from werkzeug.contrib.fixers import ProxyFix

from flask import request, render_template, redirect, url_for, Flask, Response
from stopFinder import getStop, getTrip, getStopName

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def index():
    return Response(render_template('base.html'))

@app.route('/stopFinder', methods=['GET','POST'])
def stopFinder(): # Stop Finder Search
    if request.method == 'POST': # If clicked search
        stops = getStop(request.form['searchBox']) # get dictionary of stops
        return Response(render_template("stopFinderResults.html", searchTerm=request.form['searchBox'], stops=stops))
    return Response(render_template('stopFinder.html'))

@app.route("/tripFinder", methods=['GET', 'POST'])
def tripFinder():
    if request.method == 'POST':
        
        date = request.form['dateBox'].replace('-','')
        time = request.form['timeBox'].replace(':', '')
        departStop = getStop(request.form['departBox'])
        arriveStop = getStop(request.form['arriveBox'])
        trips = getTrip(request.form['depArrRadio'], date, time, departStop[0]['id'], arriveStop[0]['id'])
        return Response(render_template("tripResults.html", src=getStopName(request.form['departBox']), dest=getStopName(request.form['arriveBox']), trips=trips))
    return Response(render_template('trip.html'))

if __name__ == '__main__':
    app.wsgi_app = ProxyFix(app.wsgi_app) # Setup HTTP headers
    CGIHandler().run(app)