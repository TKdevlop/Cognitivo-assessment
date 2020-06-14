import csv
import ast
from random import randrange
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

def add_random_genre_to_song(song_list, genres_list):
	genres_list_len  = len(genres_list) -1
	for song in song_list:
		song['genres'] = genres_list[randrange(genres_list_len)]['genres']
	return song_list