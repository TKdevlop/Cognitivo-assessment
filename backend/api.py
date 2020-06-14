from flask import Flask,jsonify
from flask_cors import CORS
from helper import fill_data_to_list,add_random_genre_to_song
app = Flask(__name__)
CORS(app)
song_json = []
genres_json = []
#coverting csv to json
fill_data_to_list("./data.csv",song_json)
fill_data_to_list("./genres.csv",genres_json)

@app.route('/api/popularity')
def most_popular_artist():
	"""
	Approch was to get all unique artist with number of song they singed
	along with there duration & popularity and return top artist based
	on there item["popularity"])/item['song']
	"""
	total_artist = {}
	for song in song_json:
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
	"""
	Approch was to select a random genre and add to a song and after that 
	return song based on there popularity and display various song
	characteristics with it.
	"""
	updated_song_data = add_random_genre_to_song(song_json, genres_json)
	context = { 
		"data"   : sorted(updated_song_data, key = lambda item : float(item["popularity"]),reverse =True)[:100],
		"success": True
	}
	return jsonify(context)

if __name__ == "__main__": 
    app.run(host ='0.0.0.0', port = 5000, debug = False) 