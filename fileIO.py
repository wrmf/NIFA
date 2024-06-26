import pandas as pd

def read_from_rec_file():
	rec_df = pd.read_csv('static/rec/key/keys.csv')
	return rec_df
