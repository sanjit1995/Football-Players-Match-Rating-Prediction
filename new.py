import pandas as pd
import pickle
from sklearn.preprocessing import MinMaxScaler
player_data = pd.read_csv(r"backend/data/SoccerPlayersData.csv")
scaler = MinMaxScaler(feature_range=(0,1))
scaler.fit(player_data[['minutes_played']])
print(scaler.transform(player_data[['minutes_played']]))

# player_train = pd.read_csv(r"backend/data/player_train.csv")
# keeper_train = pd.read_csv(r"backend/data/keeper_train.csv")
# player_train = player_train.drop(['Unnamed: 0'], axis=1)
# keeper_train = keeper_train.drop(['Unnamed: 0'], axis=1)
#
# print(player_train, keeper_train)
#
# x_player_train = player_train.drop(['rating'],axis=1)
# y_player_train = player_train['rating']
# x_keeper_train = keeper_train.drop(['rating'],axis=1)
# y_keeper_train = keeper_train['rating']
#
# from xgboost.sklearn import XGBRegressor
# player_model = XGBRegressor()
# player_model.fit(x_player_train, y_player_train)
# from sklearn.svm import SVR
# keeper_model = SVR(C=5.0, epsilon=0.01)
# keeper_model.fit(x_keeper_train, y_keeper_train)

# with open('backend/models/player_model_xgb_from_pickle1.pkl', 'wb') as fp:
#   pickle.dump(player_model, fp)
# with open('backend/models/keeper_model_svr_from_pickle1.pkl', 'wb') as fk:
#   pickle.dump(keeper_model, fk)
# with open('backend/models/scaler_model_from_pickle1.pkl', 'wb') as s:
#   pickle.dump(scaler, s)