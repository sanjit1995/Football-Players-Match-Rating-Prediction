import requests
import json
import os

# Extract Schedule (Premier League)
# premier_league_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=47&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = premier_league_schedule_2019.json()['matchesTab']
# premier_league_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         premier_league_schedule_2019_list.append(val_json)
# print(premier_league_schedule_2019_list)
#
# with open('data/premier_league_schedule_2019.json', 'w') as fout:
#     json.dump(premier_league_schedule_2019_list, fout)

# Extract Schedule (Bundesliga)
# bundesliga_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=54&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = bundesliga_schedule_2019.json()['matchesTab']
# bundesliga_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         bundesliga_schedule_2019_list.append(val_json)
# print(bundesliga_schedule_2019_list)
#
# with open('data/bundesliga_schedule_2019.json', 'w') as fout:
#     json.dump(bundesliga_schedule_2019_list, fout)

# Extract Schedule (LaLiga)
# # la_liga_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=87&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# # matches = la_liga_schedule_2019.json()['matchesTab']
# # la_liga_schedule_2019_list = []
# # for date_key, matches_on_day in matches.items():
# #     for ind in range(0, len(matches_on_day)):
# #         val_json = matches_on_day[ind]
# #         la_liga_schedule_2019_list.append(val_json)
# # print(la_liga_schedule_2019_list)
# #
# # with open('data/la_liga_schedule_2019.json', 'w') as fout:
# #     json.dump(la_liga_schedule_2019_list, fout)

# Extract Schedule (Ligue1)
# ligue1_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=53&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = ligue1_schedule_2019.json()['matchesTab']
# ligue1_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         ligue1_schedule_2019_list.append(val_json)
# print(ligue1_schedule_2019_list)
#
# with open('data/ligue1_schedule_2019.json', 'w') as fout:
#     json.dump(ligue1_schedule_2019_list, fout)

# # Extract Schedule (SerieA)
# serie_a_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=55&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = serie_a_schedule_2019.json()['matchesTab']
# serie_a_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         serie_a_schedule_2019_list.append(val_json)
# print(serie_a_schedule_2019_list)
#
# with open('data/serie_a_schedule_2019.json', 'w') as fout:
#     json.dump(serie_a_schedule_2019_list, fout)

# # Extract Schedule (ChampionsLeague)
# champions_league_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=42&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = champions_league_schedule_2019.json()['matchesTab']
# champions_league_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         champions_league_schedule_2019_list.append(val_json)
# print(champions_league_schedule_2019_list)
#
# with open('data/champions_league_schedule_2019.json', 'w') as fout:
#     json.dump(champions_league_schedule_2019_list, fout)

# # Extract Schedule (EuropaLeague)
# europa_league_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=73&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = europa_league_schedule_2019.json()['matchesTab']
# europa_league_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         europa_league_schedule_2019_list.append(val_json)
# print(europa_league_schedule_2019_list)
# 
# with open('data/europa_league_schedule_2019.json', 'w') as fout:
#     json.dump(europa_league_schedule_2019_list, fout)

# # Extract Schedule (FA Cup)
# fa_cup_schedule_2019 = requests.get(r'https://www.fotmob.com/leagues?id=132&tab=matches&type=league&timeZone=Asia%2FCalcutta')
# matches = fa_cup_schedule_2019.json()['matchesTab']
# fa_cup_schedule_2019_list = []
# for date_key, matches_on_day in matches.items():
#     for ind in range(0, len(matches_on_day)):
#         val_json = matches_on_day[ind]
#         fa_cup_schedule_2019_list.append(val_json)
# print(fa_cup_schedule_2019_list)
#
# with open('data/fa_cup_schedule_2019.json', 'w') as fout:
#     json.dump(fa_cup_schedule_2019_list, fout)

# Extract Player Data by Matches
count = 0
with open('data/fa_cup_schedule_2019.json', 'r') as fin:
    schedule_data = json.loads(fin.read())
    for ind in range(0, len(schedule_data)):
        match_id = schedule_data[ind]['id']
        data = requests.get(r'https://www.fotmob.com/matchDetails?matchId=' + str(schedule_data[ind]['id']))
        valid_match_flag = data.json()['header']['status']['finished'] and not data.json()['header']['status']['cancelled']
        if not valid_match_flag:
            continue
        if not data.json()['content']['lineup']:
            print("No Lineup Available, moving on")
            continue
        matchData = data.json()['content']['lineup']['lineup']
        if os.path.isfile('data/matches_data/' + match_id + '.json'):
            print("Same file exists, continuing")
            continue
        with open('data/matches_data/' + match_id + '.json', 'w') as fout:
            json.dump(matchData, fout)
        count += 1
        print("Scraping Done for " + match_id + ", count = " + str(count))

