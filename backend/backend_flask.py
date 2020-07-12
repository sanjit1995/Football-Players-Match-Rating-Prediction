# Import Libraries
from flask import Flask, request, jsonify, render_template
import pandas as pd
import json
import pickle
import numpy as np

# Define app variable
app = Flask(__name__, template_folder='./build', static_folder='./build/static', static_url_path='/static')

@app.route('/')
def render_react():
    return render_template("index.html")

# Define function for /getRating route
@app.route('/getRating', methods=['POST'])
def getRating():
    #print(request.json)
    with open(r'models/scaler_model_from_pickle1.pkl', 'rb') as fs:
        scaler = pickle.load(fs)
    with open(r'models/keeper_model_svr_from_pickle1.pkl', 'rb') as fk:
        keeper_model = pickle.load(fk)
    with open(r'models/player_model_xgb_from_pickle1.pkl', 'rb') as fp:
        player_model = pickle.load(fp)
    # scaler = joblib.load(r'models/scaler_minutes_played.pkl')
    # keeper_model = joblib.load(r'models/keeper_model_svr.pkl')
    # player_model = joblib.load(r'models/player_model_xgb.pkl')
    keeper_train_dtypes_dict = {'accurate_long_balls': 'int64','accurate_passes': 'int64','aerials_lost': 'int64','aerials_won': 'int64','clearances': 'int64','dispossessed': 'int64','diving_save': 'int64','dribbles_attempted': 'int64','dribbles_succeeded': 'int64','duels_lost': 'int64','duels_won': 'int64','fouls': 'int64','goals_conceded': 'int64','interceptions': 'int64','is_a_sub': 'int64','key_passes': 'int64','long_balls': 'int64','minutes_played': 'float64','pass_success': 'float64','passes': 'int64','punches': 'int64','recoveries': 'int64','red_card': 'int64','saves': 'int64','saves_inside_box': 'int64','shot_accuracy': 'float64','shot_off_target': 'int64','shot_on_target': 'int64','tackles_attempted': 'int64','tackles_succeeded': 'int64','throws': 'int64','total_shots': 'int64','touches': 'int64','was_fouled': 'int64','was_subbed': 'int64','yellow_card': 'int64'}
    player_train_dtypes_dict = {'accurate_long_balls': 'int64','accurate_passes': 'int64','aerials_lost': 'int64','aerials_won': 'int64','assists': 'int64','blocked_shots': 'int64','chances_created': 'int64','clearances': 'int64', 'crosses': 'int64', 'dispossessed': 'int64', 'dribbles_attempted': 'int64', 'dribbles_succeeded': 'int64', 'duels_lost': 'int64', 'duels_won': 'int64', 'fouls': 'int64', 'goals': 'int64', 'interceptions': 'int64', 'is_a_sub': 'int64', 'key_passes': 'int64', 'long_balls': 'int64', 'minutes_played': 'float64', 'pass_success': 'float64', 'passes': 'int64', 'recoveries': 'int64', 'red_card': 'int64', 'role_Attacker': 'uint8', 'role_Defender': 'uint8', 'role_Midfielder': 'uint8', 'shot_accuracy': 'float64', 'shot_off_target': 'int64', 'shot_on_target': 'int64', 'tackles_attempted': 'int64', 'tackles_succeeded': 'int64', 'total_shots': 'int64', 'touches': 'int64', 'was_fouled': 'int64', 'was_subbed': 'int64', 'yellow_card': 'int64'}
    players_data = request.json
    final_players_data = []
    for player_data in players_data:
        if player_data['role'] == 'Keeper':
            test_keeper = pd.DataFrame(
                columns=['diving_save', 'goals_conceded', 'minutes_played', 'punches', 'saves', 'saves_inside_box',
                         'throws', 'accurate_passes', 'pass_success', 'total_shots', 'shot_accuracy', 'shot_off_target',
                         'shot_on_target', 'accurate_long_balls', 'key_passes', 'long_balls', 'passes', 'touches',
                         'aerials_lost', 'aerials_won', 'clearances', 'dispossessed', 'dribbles_attempted',
                         'dribbles_succeeded', 'duels_lost', 'duels_won', 'fouls', 'interceptions', 'recoveries',
                         'tackles_attempted', 'tackles_succeeded', 'was_fouled', 'is_a_sub', 'was_subbed',
                         'yellow_card', 'red_card'])
            test_keeper.at[0, 'diving_save'] = player_data['diving_save']
            test_keeper.at[0, 'goals_conceded'] = player_data['goals_conceded']
            test_keeper.at[0, 'minutes_played'] = scaler.transform(np.array([[player_data['minutes_played']]]))
            test_keeper.at[0, 'punches'] = player_data['punches']
            test_keeper.at[0, 'saves'] = player_data['saves']
            test_keeper.at[0, 'saves_inside_box'] = player_data['saves_inside_box']
            test_keeper.at[0, 'throws'] = player_data['total_throws']
            test_keeper.at[0, 'accurate_passes'] = player_data['accurate_passes']
            if str(player_data['passes']) == str(0):
                test_keeper.at[0, 'pass_success'] = float(0)
            else:
                test_keeper.at[0, 'pass_success'] = (float(player_data['accurate_passes']) / float(player_data['passes']))
            test_keeper.at[0, 'total_shots'] = player_data['total_shots']
            if str(player_data['total_shots']) == str(0):
                test_keeper.at[0, 'shot_accuracy'] = float(0)
            else:
                test_keeper.at[0, 'shot_accuracy'] = (float(player_data['shot_on_target']) / float(player_data['total_shots']))
            test_keeper.at[0, 'shot_off_target'] = player_data['shot_off_target']
            test_keeper.at[0, 'shot_on_target'] = player_data['shot_on_target']
            test_keeper.at[0, 'accurate_long_balls'] = player_data['accurate_long_balls']
            test_keeper.at[0, 'key_passes'] = player_data['key_passes']
            test_keeper.at[0, 'long_balls'] = player_data['long_balls']
            test_keeper.at[0, 'passes'] = player_data['passes']
            test_keeper.at[0, 'touches'] = player_data['touches']
            test_keeper.at[0, 'aerials_lost'] = player_data['aerials_lost']
            test_keeper.at[0, 'aerials_won'] = player_data['aerials_won']
            test_keeper.at[0, 'clearances'] = player_data['clearances']
            test_keeper.at[0, 'dispossessed'] = player_data['dispossessed']
            test_keeper.at[0, 'dribbles_attempted'] = player_data['dribbles_attempted']
            test_keeper.at[0, 'dribbles_succeeded'] = player_data['dribbles_succeeded']
            test_keeper.at[0, 'duels_lost'] = player_data['duels_lost']
            test_keeper.at[0, 'duels_won'] = player_data['duels_won']
            test_keeper.at[0, 'fouls'] = player_data['fouls']
            test_keeper.at[0, 'interceptions'] = player_data['interceptions']
            test_keeper.at[0, 'recoveries'] = player_data['recoveries']
            test_keeper.at[0, 'tackles_attempted'] = player_data['tackles_attempted']
            test_keeper.at[0, 'tackles_succeeded'] = player_data['tackles_succeeded']
            if str(player_data['was_fouled']) == "Yes":
                test_keeper.at[0, 'was_fouled'] = 1
            else:
                test_keeper.at[0, 'was_fouled'] = 0
            if str(player_data['is_a_sub']) == "Yes":
                test_keeper.at[0, 'is_a_sub'] = 1
            else:
                test_keeper.at[0, 'is_a_sub'] = 0
            if str(player_data['was_subbed']) == "Yes":
                test_keeper.at[0, 'was_subbed'] = 1
            else:
                test_keeper.at[0, 'was_subbed'] = 0
            if str(player_data['yellow_card']) == "Yes":
                test_keeper.at[0, 'yellow_card'] = 1
            else:
                test_keeper.at[0, 'yellow_card'] = 0
            if str(player_data['red_card']) == "Yes":
                test_keeper.at[0, 'red_card'] = 1
            else:
                test_keeper.at[0, 'red_card'] = 0
            for x in test_keeper.columns:
                test_keeper[x] = test_keeper[x].astype(keeper_train_dtypes_dict[x])
            pred = keeper_model.predict(test_keeper)[0]
            player_data['rating'] = str(pred)
            final_players_data.append(player_data)
        else:
            test_player = pd.DataFrame(
                columns=['minutes_played', 'accurate_passes', 'assists', 'chances_created', 'goals', 'pass_success',
                         'total_shots', 'blocked_shots', 'shot_accuracy', 'shot_off_target', 'shot_on_target',
                         'accurate_long_balls', 'crosses', 'key_passes', 'long_balls', 'passes', 'touches',
                         'aerials_lost', 'aerials_won', 'clearances', 'dispossessed', 'dribbles_attempted',
                         'dribbles_succeeded', 'duels_lost', 'duels_won', 'fouls', 'interceptions', 'recoveries',
                         'tackles_attempted', 'tackles_succeeded', 'was_fouled', 'is_a_sub', 'was_subbed',
                         'yellow_card', 'red_card', 'role_Attacker', 'role_Defender', 'role_Midfielder'])
            test_player.at[0, 'minutes_played'] = scaler.transform(np.array([[player_data['minutes_played']]]))
            test_player.at[0, 'accurate_passes'] = player_data['accurate_passes']
            test_player.at[0, 'assists'] = player_data['assists']
            test_player.at[0, 'chances_created'] = player_data['chances_created']
            test_player.at[0, 'goals'] = player_data['goals']
            if str(player_data['passes']) == str(0):
                test_player.at[0, 'pass_success'] = float(0)
            else:
                test_player.at[0, 'pass_success'] = (float(player_data['accurate_passes']) / float(player_data['passes']))
            test_player.at[0, 'total_shots'] = player_data['total_shots']
            test_player.at[0, 'blocked_shots'] = player_data['blocked_shots']
            if str(player_data['total_shots']) == str(0):
                test_player.at[0, 'shot_accuracy'] = float(0)
            else:
                test_player.at[0, 'shot_accuracy'] = (float(player_data['shot_on_target']) / float(player_data['total_shots']))
            test_player.at[0, 'shot_off_target'] = player_data['shot_off_target']
            test_player.at[0, 'shot_on_target'] = player_data['shot_on_target']
            test_player.at[0, 'accurate_long_balls'] = player_data['accurate_long_balls']
            test_player.at[0, 'crosses'] = player_data['crosses']
            test_player.at[0, 'key_passes'] = player_data['key_passes']
            test_player.at[0, 'long_balls'] = player_data['long_balls']
            test_player.at[0, 'passes'] = player_data['passes']
            test_player.at[0, 'touches'] = player_data['touches']
            test_player.at[0, 'aerials_lost'] = player_data['aerials_lost']
            test_player.at[0, 'aerials_won'] = player_data['aerials_won']
            test_player.at[0, 'clearances'] = player_data['clearances']
            test_player.at[0, 'dispossessed'] = player_data['dispossessed']
            test_player.at[0, 'dribbles_attempted'] = player_data['dribbles_attempted']
            test_player.at[0, 'dribbles_succeeded'] = player_data['dribbles_succeeded']
            test_player.at[0, 'duels_lost'] = player_data['duels_lost']
            test_player.at[0, 'duels_won'] = player_data['duels_won']
            test_player.at[0, 'fouls'] = player_data['fouls']
            test_player.at[0, 'interceptions'] = player_data['interceptions']
            test_player.at[0, 'recoveries'] = player_data['recoveries']
            test_player.at[0, 'tackles_attempted'] = player_data['tackles_attempted']
            test_player.at[0, 'tackles_succeeded'] = player_data['tackles_succeeded']
            if str(player_data['was_fouled']) == "Yes":
                test_player.at[0, 'was_fouled'] = 1
            else:
                test_player.at[0, 'was_fouled'] = 0
            if str(player_data['is_a_sub']) == "Yes":
                test_player.at[0, 'is_a_sub'] = 1
            else:
                test_player.at[0, 'is_a_sub'] = 0
            if str(player_data['was_subbed']) == "Yes":
                test_player.at[0, 'was_subbed'] = 1
            else:
                test_player.at[0, 'was_subbed'] = 0
            if str(player_data['yellow_card']) == "Yes":
                test_player.at[0, 'yellow_card'] = 1
            else:
                test_player.at[0, 'yellow_card'] = 0
            if str(player_data['red_card']) == "Yes":
                test_player.at[0, 'red_card'] = 1
            else:
                test_player.at[0, 'red_card'] = 0
            if str(player_data['role']) == "Attacker":
                test_player.at[0, 'role_Attacker'] = 1
                test_player.at[0, 'role_Midfielder'] = 0
                test_player.at[0, 'role_Defender'] = 0
            elif str(player_data['role']) == "Midfielder":
                test_player.at[0, 'role_Attacker'] = 0
                test_player.at[0, 'role_Midfielder'] = 1
                test_player.at[0, 'role_Defender'] = 0
            else:
                test_player.at[0, 'role_Attacker'] = 0
                test_player.at[0, 'role_Midfielder'] = 0
                test_player.at[0, 'role_Defender'] = 1

            for x in test_player.columns:
                test_player[x] = test_player[x].astype(player_train_dtypes_dict[x])
            pred = player_model.predict(test_player)[0]
            player_data['rating'] = str(pred)
            final_players_data.append(player_data)
    return jsonify(final_players_data)

if __name__ == '__main__':
    app.run(debug=True,)
