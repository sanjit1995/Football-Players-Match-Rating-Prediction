/* eslint-disable no-unused-vars */

// Import necessary libraries
import React from 'react';
import { TableHeader, RowItem, RowInput, ResponseMessage, DocumentHeader, RoleInput } from './SubComponents.js';
import './App.css';

// To reset the currentInput values
function getInitialState() {
  return {
    name: "", role: "", diving_save: "", goals_conceded: "", minutes_played: "", punches: "", saves: "", saves_inside_box: "", total_throws: "",
    accurate_passes: "", assists: "", chances_created: "", goals: "", total_shots: "", blocked_shots: "", shot_off_target: "", shot_on_target: "",
    accurate_long_balls: "", crosses: "", key_passes: "", long_balls: "", passes: "", touches: "", aerials_lost: "", aerials_won: "", clearances: "",
    dispossessed: "", dribbles_attempted: "", dribbles_succeeded: "", duels_lost: "", duels_won: "", fouls: "", interceptions: "", recoveries: "",
    tackles_attempted: "", tackles_succeeded: "", was_fouled: "", is_a_sub: "", was_subbed: "", yellow_card: "", red_card: "", rating: ""
  };
}

// Main App class, an ES6 class to define a component. Comes with a render() function which renders changes
// automatically
class App extends React.Component {

  // Constructor to define default parameters
  constructor(props) {
    super(props)

    this.state = {
      rows: [],
      currentInput: getInitialState(),
      role: "",
      allRowsDisabled: true,
      keeperRowsDisabled: true
    };
  }

  // // Gets executed after the render() method
  // componentDidMount() {
  //   // To focus the selected element everytime on reloading the page
  //   this.inputRef.current.focus()
  //   console.log(this.inputRef)
  // }

  // To check if all the required parameters are entered
  validInput = () => {
    const { currentInput } = this.state;
    if (this.state.role === ""){
      return false
    }
    else if (this.state.role === "Keeper"){
      return currentInput.name && currentInput.diving_save && currentInput.goals_conceded && currentInput.minutes_played && currentInput.punches
          && currentInput.saves && currentInput.saves_inside_box && currentInput.total_throws && currentInput.accurate_passes && currentInput.total_shots
          && currentInput.shot_off_target && currentInput.shot_on_target && currentInput.accurate_long_balls && currentInput.key_passes
          && currentInput.long_balls && currentInput.passes && currentInput.touches && currentInput.aerials_lost && currentInput.aerials_won
          && currentInput.clearances && currentInput.dispossessed && currentInput.dribbles_attempted && currentInput.dribbles_succeeded
          && currentInput.duels_lost && currentInput.duels_won && currentInput.fouls && currentInput.interceptions && currentInput.recoveries
          && currentInput.tackles_attempted && currentInput.tackles_succeeded && currentInput.was_fouled && currentInput.is_a_sub && currentInput.was_subbed
          && currentInput.yellow_card && currentInput.red_card;
    }
    else{
      return currentInput.name && currentInput.assists && currentInput.chances_created && currentInput.minutes_played && currentInput.goals
          && currentInput.crosses && currentInput.blocked_shots && currentInput.accurate_passes && currentInput.total_shots
          && currentInput.shot_off_target && currentInput.shot_on_target && currentInput.accurate_long_balls && currentInput.key_passes
          && currentInput.long_balls && currentInput.passes && currentInput.touches && currentInput.aerials_lost && currentInput.aerials_won
          && currentInput.clearances && currentInput.dispossessed && currentInput.dribbles_attempted && currentInput.dribbles_succeeded
          && currentInput.duels_lost && currentInput.duels_won && currentInput.fouls && currentInput.interceptions && currentInput.recoveries
          && currentInput.tackles_attempted && currentInput.tackles_succeeded && currentInput.was_fouled && currentInput.is_a_sub && currentInput.was_subbed
          && currentInput.yellow_card && currentInput.red_card;
    }
  }

  // For every activity in the active row inputs, store the input values dynamically
  storeInput = event => {
    const { name, value } = event.target;
    const currentInput = this.state.currentInput;
    currentInput[name] = value;
    this.setState({
      currentInput : currentInput
    })
  }

  submitInput = () => {
    console.log(this.state)
    this.setState((state, props) => {
      const { rows, currentInput, role, allRowsDisabled, keeperRowsDisabled } = state;
      const newState = {
        rows: [...rows, currentInput],
        currentInput: getInitialState(),
        role: "",
        allRowsDisabled: true,
        keeperRowsDisabled: true
      }
      return newState;
    });
  }

  removeCurrentInput = () => {
    this.setState({
      currentInput: getInitialState()
    });
  };

  // To remove a row from the frozen data
  handleRemoveRow = (idx) => {
    console.log(idx)
    var tempRows = [...this.state.rows]; // make a separate copy of the array
    if (idx !== -1) {
      tempRows.splice(idx, 1);
      this.setState({ rows: tempRows });
    }
  };

  // callForRole = (event) => {
  //   this.enableRows(event)
  //   this.storeInput(event)
  // }

  // For every activity in the active row inputs, store the input values dynamically
  enableRows = event => {
    const { name, value } = event.target;
    let allRowsDisabledTemp, keeperRowsDisabledTemp;
    if (value.length === 0){
      allRowsDisabledTemp = true;
    }
    else if (value === "Keeper"){
      allRowsDisabledTemp = false
      keeperRowsDisabledTemp = false;
    }
    else {
      allRowsDisabledTemp = false
      keeperRowsDisabledTemp = true;
    }
    const currentInput = this.state.currentInput;
    currentInput['role'] = value;
    this.setState((state, props) => {
      const { rows, currentInputTemp, role, allRowsDisabled, keeperRowsDisabled } = state;
      const newState = {
        rows: [...rows],
        currentInput: currentInput,
        role: value,
        allRowsDisabled: allRowsDisabledTemp,
        keeperRowsDisabled: keeperRowsDisabledTemp
      }
      return newState;
    });
  }
  // render() method constantly monitors and renders automatically whenever a state variable is changed
  render() {
    return (
      <div>
        <DocumentHeader
          value={"Football Players Data"}
        />
        <table className="table table-striped" style={{ tableLayout: "auto", width: "100%" }} id="players_match_data" border={'1px solid black'}>
          <TableHeader
            values={["Role", "Name", "Minutes Played", "Diving Saves", "Goals Conceded By Goalkeeper", "Punches", "Saves", "Saves Inside Box",
              "Total Throws", "Passes", "Accurate Passes", "Assists", "Goals", "Chances Created", "Total Shots", "Blocked Shots", "Shots On Target",
              "Shots Off Target", "Long Balls", "Accurate Long Balls", "Crosses", "Key Passes", "Touches", "Aerials Lost", "Aerials Won", "Clearances",
              "Dispossessed", "Dribbles Attempted", "Dribbles Succeeded", "Duels Lost", "Duels Won", "Fouls", "Interceptions", "Recoveries",
              "Tackles Attempted", "Tackles Succeeded", "Was Fouled", "Substituted", "Was a Substitute", "Yellow Card", "Red Card", "Rating"]}
          />
          <tbody>
            {this.state.rows.map((row, idx) => (
                <tr key={idx}>
                  <RowItem value={row.role} />
                  <RowItem value={row.name} />
                  <RowItem value={row.minutes_played} />
                  <RowItem value={row.diving_save} />
                  <RowItem value={row.goals_conceded} />
                  <RowItem value={row.punches} />
                  <RowItem value={row.saves} />
                  <RowItem value={row.saves_inside_box} />
                  <RowItem value={row.total_throws} />
                  <RowItem value={row.passes} />
                  <RowItem value={row.accurate_passes} />
                  <RowItem value={row.assists} />
                  <RowItem value={row.goals} />
                  <RowItem value={row.chances_created} />
                  <RowItem value={row.total_shots} />
                  <RowItem value={row.blocked_shots} />
                  <RowItem value={row.shot_on_target} />
                  <RowItem value={row.shot_off_target} />
                  <RowItem value={row.long_balls} />
                  <RowItem value={row.accurate_long_balls} />
                  <RowItem value={row.crosses} />
                  <RowItem value={row.key_passes} />
                  <RowItem value={row.touches} />
                  <RowItem value={row.aerials_lost} />
                  <RowItem value={row.aerials_won} />
                  <RowItem value={row.clearances} />
                  <RowItem value={row.dispossessed} />
                  <RowItem value={row.dribbles_attempted} />
                  <RowItem value={row.dribbles_succeeded} />
                  <RowItem value={row.duels_lost} />
                  <RowItem value={row.duels_won} />
                  <RowItem value={row.fouls} />
                  <RowItem value={row.interceptions} />
                  <RowItem value={row.recoveries} />
                  <RowItem value={row.tackles_attempted} />
                  <RowItem value={row.tackles_succeeded} />
                  <RowItem value={row.was_fouled} />
                  <RowItem value={row.was_subbed} />
                  <RowItem value={row.is_a_sub} />
                  <RowItem value={row.yellow_card} />
                  <RowItem value={row.red_card} />
                  <td style={{ textAlign: "center" }}>
                    <button onClick={() => { this.handleRemoveRow(idx) }} padding="15px 32px" fontSize="40px" width="100%">
                      Clear
                    </button>
                  </td>
                </tr>
            ))}
            <tr>
              <RoleInput
                name="role"
                value={this.state.role}
                onChange={this.enableRows}
              />
              <RowInput
                type="text"
                name="name"
                value={this.state.currentInput.name}
                disabled = {this.state.allRowsDisabled}
                onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="minutes_played"
                  value={this.state.currentInput.minutes_played}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="diving_save"
                  value={this.state.currentInput.diving_save}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="goals_conceded"
                  value={this.state.currentInput.goals_conceded}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="punches"
                  value={this.state.currentInput.punches}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="saves"
                  value={this.state.currentInput.saves}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="saves_inside_box"
                  value={this.state.currentInput.saves_inside_box}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="total_throws"
                  value={this.state.currentInput.total_throws}
                  disabled = {(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="passes"
                  value={this.state.currentInput.passes}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="accurate_passes"
                  value={this.state.currentInput.accurate_passes}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="assists"
                  value={this.state.currentInput.assists}
                  disabled = {(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="goals"
                  value={this.state.currentInput.goals}
                  disabled = {(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="chances_created"
                  value={this.state.currentInput.chances_created}
                  disabled = {(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="total_shots"
                  value={this.state.currentInput.total_shots}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="blocked_shots"
                  value={this.state.currentInput.blocked_shots}
                  disabled = {(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="shot_on_target"
                  value={this.state.currentInput.shot_on_target}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="shot_off_target"
                  value={this.state.currentInput.shot_off_target}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="long_balls"
                  value={this.state.currentInput.long_balls}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="accurate_long_balls"
                  value={this.state.currentInput.accurate_long_balls}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="crosses"
                  value={this.state.currentInput.crosses}
                  disabled = {(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="key_passes"
                  value={this.state.currentInput.key_passes}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="touches"
                  value={this.state.currentInput.touches}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="aerials_lost"
                  value={this.state.currentInput.aerials_lost}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="aerials_won"
                  value={this.state.currentInput.aerials_won}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="clearances"
                  value={this.state.currentInput.clearances}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="dispossessed"
                  value={this.state.currentInput.dispossessed}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="dribbles_attempted"
                  value={this.state.currentInput.dribbles_attempted}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="dribbles_succeeded"
                  value={this.state.currentInput.dribbles_succeeded}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="duels_lost"
                  value={this.state.currentInput.duels_lost}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="duels_won"
                  value={this.state.currentInput.duels_won}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="fouls"
                  value={this.state.currentInput.fouls}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="interceptions"
                  value={this.state.currentInput.interceptions}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="recoveries"
                  value={this.state.currentInput.recoveries}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="tackles_attempted"
                  value={this.state.currentInput.tackles_attempted}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="tackles_succeeded"
                  value={this.state.currentInput.tackles_succeeded}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="was_fouled"
                  value={this.state.currentInput.was_fouled}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="was_subbed"
                  value={this.state.currentInput.was_subbed}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="is_a_sub"
                  value={this.state.currentInput.is_a_sub}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="yellow_card"
                  value={this.state.currentInput.yellow_card}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <RowInput
                  type="number"
                  name="red_card"
                  value={this.state.currentInput.red_card}
                  disabled = {this.state.allRowsDisabled}
                  onChange = {this.storeInput}
              />
              <td>

              </td>
              <td style={{ textAlign: "center" }}>
                {this.validInput() ? (
                    <button onClick={this.submitInput} padding="15px 32px" fontSize="40px" width="100%">
                      Confirm
                    </button>) : (
                    <button onClick={this.removeCurrentInput} padding="15px 32px" fontSize="40px" width="100%">
                      Clear
                    </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
