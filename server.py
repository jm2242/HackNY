import os
from flask import Flask
from flask import request
import base64
import subprocess
import logging
import sys
from pprint import pprint
import time

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)


@app.route('/')
def hello():
    return '<a href="/call">Click for tweets</a>'

@app.route('/call')
def thisFunc():
    p = subprocess.Popen("C:\Python27\python.exe ./stream.py", shell = True)
    time.sleep(40)
    subprocess.call(["kill", "-9", "%d" % p.pid])
    tweet_file = open('./out_file.txt', 'r')
    http_out = ""
    for line in tweet_file:
        http_out = http_out+ '<p> '+line+''
    return http_out



port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))