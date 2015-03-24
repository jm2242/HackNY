import tweepy
import json
from pymongo import MongoClient
from datetime import datetime


out_file = open('./out_file.txt','w')

class CustomStreamListener(tweepy.StreamListener):
    #creates a MongoClient to the running mongod instance
    def __init__(self, api):
        self.api = api
        super(tweepy.StreamListener, self).__init__()

        self.db = MongoClient('mongodb://localhost:27017/').whatsPoppin #<---Not needed, but can add database to it
        self.db.tweets.remove()
        self.db.tweets.create_index("insertedAt", expireAfterSeconds=30)
        print "Did the init"

        

    def on_data(self, tweet):
        try:
            print "data"
            tweet_data = json.loads(tweet)

            clean_tweet = {'text': tweet_data['text'], 'time': tweet_data['created_at'],\
                           'insertedAt': datetime.utcnow(),\
                           'locationx': tweet_data['coordinates']['coordinates'][0],\
                           'locationy': tweet_data['coordinates']['coordinates'][1]}
            
            print clean_tweet
            #print str(clean_tweet)

            self.db.tweets.insert(clean_tweet)
        except:
            pass
    def on_error(self, status_code):
        print status_code
        print "error"

def main():

    keys = ['VXPrlNSLZDwrFItHMlz6Nk7pu','sOlV6iZAuitpxodsp4GN5j3E5YEWsxVrA2KnBmXLH7bBIT9ERk',\
            '37540821-UCFtwa0nVC5fECEldWLrTyxIkMOSRzu8VYlluLJsj', 'Ry37tIpZ6VJ5HFZGQZTYS8PwjlAnyfAOmhc9aKaAWpdVS']
    my_location = [-74.011797,40.725375,-73.933818,40.834443]

    auth = tweepy.OAuthHandler(keys[0], keys[1])
    auth.set_access_token(keys[2], keys[3])
    api = tweepy.API(auth)
    print "connecting to stream"
    sapi = tweepy.streaming.Stream(auth, CustomStreamListener(api))
    sapi.filter(locations=my_location)

if __name__ == '__main__':
    main()