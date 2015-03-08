import tweepy
import json
import pymongo
from pymongo import MongoClient



out_file = open('./out_file.txt','w')

class CustomStreamListener(tweepy.StreamListener):
    #creates a MongoClient to the running mongod instance
    def __init__(self, api):
        self.api = api
        super(tweepy.StreamListener, self).__init__()
        self.db = MongoClient('mongodb://localhost:27017/').whatsPoppin #<---Not needed, but can add database to it
        

    def on_data(self, tweet):
        tweet_data = json.loads(tweet)
        self.db.tweets.insert(tweet_data) 
        global user_id_list
    
        print tweet_data
        try:
            out_file.write(str(tweet_data['coordinates']['coordinates']).rstrip()+' '+str(tweet_data['text'].encode('utf-8')).rstrip())
            out_file.write('\n')
            pass
        except:
            pass



def main():

    keys = ['VXPrlNSLZDwrFItHMlz6Nk7pu','sOlV6iZAuitpxodsp4GN5j3E5YEWsxVrA2KnBmXLH7bBIT9ERk',\
            '37540821-UCFtwa0nVC5fECEldWLrTyxIkMOSRzu8VYlluLJsj', 'Ry37tIpZ6VJ5HFZGQZTYS8PwjlAnyfAOmhc9aKaAWpdVS']
    my_location = [-74.011797,40.725375,-73.933818,40.834443]

    auth = tweepy.OAuthHandler(keys[0], keys[1])
    auth.set_access_token(keys[2], keys[3])
    api = tweepy.API(auth)

    sapi = tweepy.streaming.Stream(auth, CustomStreamListener(api))
    sapi.filter(locations=my_location)





if __name__ == '__main__':
    main()