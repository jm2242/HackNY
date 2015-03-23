import os
from flask import Flask
from flask import request
import base64
import subprocess
import logging
import sys
from pprint import pprint
import time
import pymongo
from pymongo import MongoClient
from flask import jsonify
from bson.json_util import dumps
from flask import render_template

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)
client = MongoClient('mongodb://localhost:27017/').whatsPoppin

@app.route('/')
def index():
    render_template('/static/index.html')
    #return '<a href="/call">Click for tweets</a>'

@app.route('/call')
def fetchTweets():
    p = subprocess.Popen("python ./stream.py", shell = True)
    return "<p>Tweets being collected!"





    
    # time.sleep(40)
    # subprocess.call(["kill", "-9", "%d" % p.pid])
    # tweet_file = open('./out_file.txt', 'r')
    # http_out = "angello is always right"
    # for line in tweet_file:
    #     http_out = http_out+ '<p> '+line+''
    # return http_out

@app.route('/getTweets')
def getTweets():
    y = [x for x in client.tweets.find({})]
    return dumps(y)

@app.route('/analyzeText')
def analyzeText(data):
    print data['data']



port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))