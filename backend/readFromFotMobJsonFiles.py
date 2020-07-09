import json
import pprint
import pandas as pd
import os

pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', 1000)

# with open('data/premier_league_schedule_2019.json', 'r') as fin:
#     data = json.loads(fin.read())
#     print(len(data))
#     print(data)

pp = pprint.PrettyPrinter(indent=4)

PlayersRatingsData = pd.DataFrame(columns=['player_id','name','role','acted_as_sweeper','diving_save','goals_conceded',
                                           'minutes_played','punches','saves','saves_inside_box','throws','accurate_passes',
                                           'assists','chances_created','goals','pass_success','total_shots',
                                           'blocked_shots','shot_accuracy','shot_off_target','shot_on_target','shots_woodwork',
                                           'accurate_long_balls','crosses','key_passes','long_balls',
                                           'passes','touches','aerials_lost','aerials_won','clearances','dispossessed',
                                           'dribbles_attempted','dribbles_succeeded','duels_lost','duels_won','fouls',
                                           'interceptions','recoveries','tackles_attempted','tackles_succeeded','was_fouled',
                                           'is_a_sub','was_subbed','yellow_card','red_card','rating'])

# print(len(PlayersRatingsData.columns), len(PlayersRatingsData.columns.unique()))
# print(PlayersRatingsData.columns.value_counts())

def convertAsFeature(feature_name):
    new_str = str(feature_name).replace(" ","_").lower()
    return new_str

df_ind = 0
for filename in os.listdir('data/matches_data/'):
    if filename.endswith(".json"):
        with open('data/matches_data/'+str(filename), 'r') as fin:
            data = json.loads(fin.read())
            bench_players_data = data[0]['bench']
            print(filename)
            for bench_ind in range(0, len(bench_players_data)):
                if 'stats' in bench_players_data[bench_ind]:
                    player_stats = bench_players_data[bench_ind]['stats']
                    if player_stats['0']['Minutes played'] != "-":
                        PlayersRatingsData.at[df_ind, 'player_id'] = bench_players_data[bench_ind]['id']
                        PlayersRatingsData.at[df_ind, 'name'] = bench_players_data[bench_ind]['name']
                        if 'role' in bench_players_data[bench_ind]:
                            PlayersRatingsData.at[df_ind, 'role'] = bench_players_data[bench_ind]['role']
                        PlayersRatingsData.at[df_ind, 'is_a_sub'] = 1
                        for stat_index_key, stat_index_vals in player_stats.items():
                            for stat_key, stat_val in stat_index_vals.items():
                                df_feature = convertAsFeature(str(stat_key))
                                if stat_val == "-":
                                    df_value = 0
                                else:
                                    df_value = stat_val
                                PlayersRatingsData.at[df_ind, df_feature] = df_value
                        if 'events' in bench_players_data[bench_ind]:
                            player_events = bench_players_data[bench_ind]['events']
                            if 'yc' in player_events:
                                PlayersRatingsData.at[df_ind, 'yellow_card'] = 1
                            if 'rc' in player_events:
                                PlayersRatingsData.at[df_ind, 'red_card'] = 1
                            if 'sub' in player_events:
                                if 'isOut' in player_events['sub']:
                                    if player_events['sub']['isOut']:
                                        PlayersRatingsData.at[df_ind, 'was_subbed'] = 1
                                    else:
                                        PlayersRatingsData.at[df_ind, 'was_subbed'] = 0
                        if 'rating' in bench_players_data[bench_ind]:
                            player_rating = bench_players_data[bench_ind]['rating']
                            PlayersRatingsData.at[df_ind, 'rating'] = bench_players_data[bench_ind]['rating']['num']
                        df_ind += 1
                    #pp.pprint(bench_players_data[bench_ind])
            starting_players_data = data[0]['players']
            for start_ind in range(0, len(starting_players_data)):
                #print(len(starting_players_data[start_ind]))
                for line_ind in range(0, len(starting_players_data[start_ind])):
                    if 'stats' in starting_players_data[start_ind][line_ind]:
                        player_stats = starting_players_data[start_ind][line_ind]['stats']
                        if player_stats['0']['Minutes played'] != "-":
                            PlayersRatingsData.at[df_ind, 'player_id'] = starting_players_data[start_ind][line_ind]['id']
                            PlayersRatingsData.at[df_ind, 'name'] = starting_players_data[start_ind][line_ind]['name']
                            if 'role' in starting_players_data[start_ind][line_ind]:
                                PlayersRatingsData.at[df_ind, 'role'] = starting_players_data[start_ind][line_ind]['role']
                            PlayersRatingsData.at[df_ind, 'is_a_sub'] = 0
                            for stat_index_key, stat_index_vals in player_stats.items():
                                for stat_key, stat_val in stat_index_vals.items():
                                    df_feature = convertAsFeature(str(stat_key))
                                    if stat_val == "-":
                                        df_value = 0
                                    else:
                                        df_value = stat_val
                                    PlayersRatingsData.at[df_ind, df_feature] = df_value
                            if 'events' in starting_players_data[start_ind][line_ind]:
                                player_events = starting_players_data[start_ind][line_ind]['events']
                                if 'yc' in player_events:
                                    PlayersRatingsData.at[df_ind, 'yellow_card'] = 1
                                if 'rc' in player_events:
                                    PlayersRatingsData.at[df_ind, 'red_card'] = 1
                                if 'sub' in player_events:
                                    if 'isOut' in player_events['sub']:
                                        if player_events['sub']['isOut']:
                                            PlayersRatingsData.at[df_ind, 'was_subbed'] = 1
                                        else:
                                            PlayersRatingsData.at[df_ind, 'was_subbed'] = 0
                            if 'rating' in starting_players_data[start_ind][line_ind]:
                                player_rating = starting_players_data[start_ind][line_ind]['rating']
                                PlayersRatingsData.at[df_ind, 'rating'] = starting_players_data[start_ind][line_ind]['rating']['num']
                            df_ind += 1
print(PlayersRatingsData)
PlayersRatingsData.to_csv("PlayersRatingData.csv")
exit(0)
