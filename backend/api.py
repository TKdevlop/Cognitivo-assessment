from flask import Flask,jsonify
from flask_cors import CORS
import json
import csv
import ast
app = Flask(__name__)
CORS(app)
file_json = []
genres_json = []
def fill_data_to_list(file, data_list):
	with open(file) as f:
		data = csv.DictReader(f)
		for item in data:
			if file == "./data.csv":
				#convert string to list
				item["artists"] = ast.literal_eval(item["artists"])
				# make sure to only add 2020 data
				if item["release_date"][:4] != "2020":
					pass
			data_list.append(item)

fill_data_to_list("./data.csv",file_json)
fill_data_to_list("./genres.csv",genres_json)

@app.route('/api/popularity')
def most_popular_artist():
	total_artist = {}
	for song in file_json:
		for artist in song['artists']:
			if artist in total_artist:
				total_artist[artist]['song'] +=1
				total_artist[artist]['popularity'] += float(song['popularity'])
				total_artist[artist]['duration'] =+ float(song['duration_ms'])
			else:
				total_artist[artist] = {
				'song':1, 
				'popularity': float(song['popularity']), 
				'duration': float(song['duration_ms'])
				}
	total_artist_list = []
	# formatting artist into list
	for artist in total_artist:
		total_artist[artist]['artist'] = artist
		total_artist_list.append(total_artist[artist])
	sorted_by_popularity_artist = sorted(total_artist_list,key = lambda item : float(item["popularity"])/item['song'],reverse = True)[:10]
	context = {
		"data"   : sorted_by_popularity_artist,
		"success": True
	}
	return jsonify(context)

@app.route('/api/trending/genres')
def trending_genres():
	context = { 
		"data"   : sorted(genres_json, key = lambda item : float(item["popularity"]),reverse =True)[:100],
		"success": True
	}
	return jsonify(context)

if __name__ == "__main__": 
    app.run(host ='0.0.0.0', port = 5000, debug = False) 