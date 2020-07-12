/* eslint-disable no-unused-vars */

// Import necessary libraries
import React from 'react';
import {DocumentHeader, ResponseMessage, RoleInput, RowInput, RowItem, TableHeader} from './SubComponents.js';
import './App.css';
import ReactLoading from 'react-loading';

// To reset the currentInput values
function getInitialState() {
    return {
        name: "",
        role: "",
        diving_save: "",
        goals_conceded: "",
        minutes_played: "",
        punches: "",
        saves: "",
        saves_inside_box: "",
        total_throws: "",
        accurate_passes: "",
        assists: "",
        chances_created: "",
        goals: "",
        total_shots: "",
        blocked_shots: "",
        shot_off_target: "",
        shot_on_target: "",
        accurate_long_balls: "",
        crosses: "",
        key_passes: "",
        long_balls: "",
        passes: "",
        touches: "",
        aerials_lost: "",
        aerials_won: "",
        clearances: "",
        dispossessed: "",
        dribbles_attempted: "",
        dribbles_succeeded: "",
        duels_lost: "",
        duels_won: "",
        fouls: "",
        interceptions: "",
        recoveries: "",
        tackles_attempted: "",
        tackles_succeeded: "",
        was_fouled: "",
        is_a_sub: "No",
        was_subbed: "No",
        yellow_card: "No",
        red_card: "No",
        rating: ""
    };
}

//console.log(Object.keys(getInitialState()))
const keeper_specific_fields = [
    "diving_save", "goals_conceded", "punches", "saves", "saves_inside_box", "total_throws"
]
const player_specific_fields = [
    "chances_created", "goals", "crosses", "blocked_shots"
]
const all_fields = Object.keys(getInitialState())
all_fields.pop()
console.log(all_fields.length)
const keeper_fields = []
const player_fields = []
for (let i = 0; i < all_fields.length; i++) {
    if (player_specific_fields.indexOf(all_fields[i]) === -1) {
        keeper_fields.push(all_fields[i])
    }
    if (keeper_specific_fields.indexOf(all_fields[i]) === -1) {
        player_fields.push(all_fields[i])
    }
}
console.log(keeper_fields)
console.log(player_fields)

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
            keeperRowsDisabled: true,
            responseMessage: "",
            screenLoading: false,
            responseReceived: false
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
        const {currentInput} = this.state;
        if (this.state.role === "") {
            return 0
        } else if (this.state.role === "Keeper") {
            for (let fields of keeper_fields) {
                console.log(currentInput[fields])
                if (currentInput[fields].length < 0) {
                    return 0
                }
            }
            return 1
        } else {
            for (let fields of player_fields) {
                console.log(currentInput[fields])
                if (currentInput[fields].length < 0) {
                    return 0
                }
            }
            return 1
        }
    }

    // For every activity in the active row inputs, store the input values dynamically
    storeInput = event => {
        const {type, name, value} = event.target;
        const currentInput = this.state.currentInput;
        if (type === "number") {
            if (value < 0) {
                alert("Value cannot be less than 0")
                currentInput[name] = "";
            } else {
                currentInput[name] = value;
            }
            this.setState({
                currentInput: currentInput
            })
        } else {
            currentInput[name] = value
            this.setState({
                currentInput: currentInput
            })
        }
    }

    // Store Radio Input values
    storeRadioInput = event => {
        const {name, value} = event.target;
        const currentInput = this.state.currentInput;
        if (value === "No") {
            currentInput[name] = "Yes";
        } else {
            currentInput[name] = "No";
        }
        this.setState({
            currentInput: currentInput
        })
    }

    checkDataValidity = () => {
        const currentRow = this.state.currentInput
        if (parseInt(currentRow.minutes_played) < 1 || parseInt(currentRow.minutes_played) > 120) {
            alert("Minutes played cannot be less than 1 or more than 120")
            return false
        }
        if (parseInt(currentRow.accurate_passes) > parseInt(currentRow.passes)) {
            alert("Accurate Passes cannot be more than no. of Passes")
            return false
        }
        if ((parseInt(currentRow.blocked_shots) > parseInt(currentRow.total_shots)) || (parseInt(currentRow.shot_on_target) > parseInt(currentRow.total_shots)) || (parseInt(currentRow.shot_off_target) > parseInt(currentRow.total_shots))) {
            alert("No. of Blocked Shots, Shots On Target and Shots Off Target cannot be more than Total Shots")
            return false
        }
        if (parseInt(currentRow.accurate_long_balls) > parseInt(currentRow.long_balls)) {
            alert("Accurate Long Balls cannot be more than no. of Long Balls")
            return false
        }
        if (parseInt(currentRow.dribbles_succeeded) > parseInt(currentRow.dribbles_attempted)) {
            alert("Dribbles Succeeded cannot be more than Dribbles Attempted")
            return false
        }
        if (parseInt(currentRow.tackles_succeeded) > parseInt(currentRow.tackles_attempted)) {
            alert("Tackles Succeeded cannot be more than Tackles Attempted")
            return false
        } else {
            return true
        }
    }

    submitInput = () => {
        if (this.checkDataValidity()) {
            console.log(this.state)
            this.setState((state, props) => {
                const {rows, currentInput, role, allRowsDisabled, keeperRowsDisabled, responseMessage} = state;
                const newState = {
                    rows: [...rows, currentInput],
                    currentInput: getInitialState(),
                    role: "",
                    allRowsDisabled: true,
                    keeperRowsDisabled: true,
                    responseMessage: responseMessage,
                    loading: false
                }
                return newState;
            });
        }
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
            this.setState({rows: tempRows});
        }
    };

    validRowsData = () => {
        const {rows} = this.state;
        return rows.length;
    }

    // For every activity in the active row inputs, store the input values dynamically
    enableRows = event => {
        const {name, value} = event.target;
        let allRowsDisabledTemp, keeperRowsDisabledTemp;
        if (value.length === 0) {
            allRowsDisabledTemp = true;
        } else if (value === "Keeper") {
            allRowsDisabledTemp = false
            keeperRowsDisabledTemp = false;
        } else {
            allRowsDisabledTemp = false
            keeperRowsDisabledTemp = true;
        }
        const currentInput = this.state.currentInput;
        currentInput['role'] = value;
        this.setState((state, props) => {
            const {rows, currentInputTemp, role, allRowsDisabled, keeperRowsDisabled, responseMessage} = state;
            return {
                rows: [...rows],
                currentInput: currentInput,
                role: value,
                allRowsDisabled: allRowsDisabledTemp,
                keeperRowsDisabled: keeperRowsDisabledTemp,
                responseMessage: responseMessage
            };
        });
    }

    // // To set the response header message
    // setResponseHeader = (msg) => {
    //   console.log(this.state)
    //   this.setState({
    //     responseMessage: msg
    //   })
    // }

    submitAll = () => {
        if (!this.validRowsData()) {
            alert("Please enter all data and click confirm when done")
            console.log(this.state)
        } else {
            console.log(this.state)
            console.log("Sending request")

            // To convert Object to json
            const body_data = JSON.stringify(this.state.rows)
            console.log(body_data)

            this.setState({
                screenLoading: true
            })

            // To send a POST request to the Backend Server with the XML body
            fetch('/getRating', {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: body_data
            })
                // On receiving response, check status code and display Response Header accordingly
                .then(response => {
                    if (response.status === 500) {
                        throw new Error("SERVER_ERR_500 : CHECK SERVER CONNECTION")
                    }
                    return response.json();
                })
                .then(response => {
                    this.setState(() => {
                        return {
                            rows: response,
                            currentInput: getInitialState(),
                            role: "",
                            allRowsDisabled: true,
                            keeperRowsDisabled: true,
                            responseMessage: "",
                            screenLoading: false,
                            responseReceived: true
                        };
                    })
                    console.log(response)
                })
                .catch((error) => {
                    const error_message = error.message
                    console.log(error_message)
                    this.setState({
                        screenLoading: false,
                        responseMessage: error_message
                    });
                });
        }
    }

    resetScreen = () => {
        // Reset the state
        this.setState(() => {
            return {
                rows: [],
                currentInput: getInitialState(),
                role: "",
                allRowsDisabled: true,
                keeperRowsDisabled: true,
                responseMessage: "",
                screenLoading: false,
                responseReceived: false
            };
        })
    }

    // render() method constantly monitors and renders automatically whenever a state variable is changed
    render() {
        return (
            <div>
                {this.state.screenLoading ? (
                    <div align={'center'}
                         style={{position: "relative", margin: "auto", paddingTop: "220px", fontSize: "40px"}}>
                        Loading......Please Wait
                        <ReactLoading type={"spokes"} color={"black"}/>
                    </div>
                ) : (
                    <div>
                        {!this.state.responseReceived ? (
                            <div>
                                <DocumentHeader
                                    value={"Player Match Rating Predictor"}
                                />
                                <table className="table table-striped" id="players_match_data_request"
                                       style={{marginTop: "62px"}}>
                                    <TableHeader
                                        values={["Role", "Name", "Minutes Played", "Diving Saves", "Goals Conceded By Goalkeeper", "Punches", "Saves", "Saves Inside Box",
                                            "Total Throws", "Passes", "Accurate Passes", "Assists", "Goals", "Chances Created", "Total Shots", "Blocked Shots", "Shots On Target",
                                            "Shots Off Target", "Long Balls", "Accurate Long Balls", "Crosses", "Key Passes", "Touches", "Aerials Lost", "Aerials Won", "Clearances",
                                            "Dispossessed", "Dribbles Attempted", "Dribbles Succeeded", "Duels Lost", "Duels Won", "Fouls", "Interceptions", "Recoveries",
                                            "Tackles Attempted", "Tackles Succeeded", "Was Fouled", "Substituted", "Was a Substitute", "Yellow Card", "Red Card", "Rating"]}
                                    />
                                    <tbody>
                                    {this.state.rows.map((row, idx) => (
                                        <tr key={idx} style={{background: "#D9DBDC"}}>
                                            <RowItem value={row.role}/>
                                            <RowItem value={row.name}/>
                                            <RowItem value={row.minutes_played}/>
                                            <RowItem value={row.diving_save}/>
                                            <RowItem value={row.goals_conceded}/>
                                            <RowItem value={row.punches}/>
                                            <RowItem value={row.saves}/>
                                            <RowItem value={row.saves_inside_box}/>
                                            <RowItem value={row.total_throws}/>
                                            <RowItem value={row.passes}/>
                                            <RowItem value={row.accurate_passes}/>
                                            <RowItem value={row.assists}/>
                                            <RowItem value={row.goals}/>
                                            <RowItem value={row.chances_created}/>
                                            <RowItem value={row.total_shots}/>
                                            <RowItem value={row.blocked_shots}/>
                                            <RowItem value={row.shot_on_target}/>
                                            <RowItem value={row.shot_off_target}/>
                                            <RowItem value={row.long_balls}/>
                                            <RowItem value={row.accurate_long_balls}/>
                                            <RowItem value={row.crosses}/>
                                            <RowItem value={row.key_passes}/>
                                            <RowItem value={row.touches}/>
                                            <RowItem value={row.aerials_lost}/>
                                            <RowItem value={row.aerials_won}/>
                                            <RowItem value={row.clearances}/>
                                            <RowItem value={row.dispossessed}/>
                                            <RowItem value={row.dribbles_attempted}/>
                                            <RowItem value={row.dribbles_succeeded}/>
                                            <RowItem value={row.duels_lost}/>
                                            <RowItem value={row.duels_won}/>
                                            <RowItem value={row.fouls}/>
                                            <RowItem value={row.interceptions}/>
                                            <RowItem value={row.recoveries}/>
                                            <RowItem value={row.tackles_attempted}/>
                                            <RowItem value={row.tackles_succeeded}/>
                                            <RowItem value={row.was_fouled}/>
                                            <RowItem value={row.was_subbed}/>
                                            <RowItem value={row.is_a_sub}/>
                                            <RowItem value={row.yellow_card}/>
                                            <RowItem value={row.red_card}/>
                                            <td/>
                                            <td style={{textAlign: "center"}}>
                                                <button onClick={() => {this.handleRemoveRow(idx)}}
                                                        style={{fontSize: "14px", padding: "2px"}}>
                                                    Clear
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr style={{background: "#D9DBDC"}}>
                                        <RoleInput
                                            name="role"
                                            value={this.state.role}
                                            onChange={this.enableRows}
                                        />
                                        <RowInput
                                            type="text"
                                            name="name"
                                            value={this.state.currentInput.name}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={200}
                                        />
                                        <RowInput
                                            type="number"
                                            name="minutes_played"
                                            value={this.state.currentInput.minutes_played}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                        />
                                        <RowInput
                                            type="number"
                                            name="diving_save"
                                            value={this.state.currentInput.diving_save}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="goals_conceded"
                                            value={this.state.currentInput.goals_conceded}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={100}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="punches"
                                            value={this.state.currentInput.punches}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="saves"
                                            value={this.state.currentInput.saves}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="saves_inside_box"
                                            value={this.state.currentInput.saves_inside_box}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="total_throws"
                                            value={this.state.currentInput.total_throws}
                                            disabled={(this.state.allRowsDisabled || this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="passes"
                                            value={this.state.currentInput.passes}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="accurate_passes"
                                            value={this.state.currentInput.accurate_passes}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="assists"
                                            value={this.state.currentInput.assists}
                                            disabled={(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="goals"
                                            value={this.state.currentInput.goals}
                                            disabled={(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="chances_created"
                                            value={this.state.currentInput.chances_created}
                                            disabled={(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="total_shots"
                                            value={this.state.currentInput.total_shots}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="blocked_shots"
                                            value={this.state.currentInput.blocked_shots}
                                            disabled={(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="shot_on_target"
                                            value={this.state.currentInput.shot_on_target}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="shot_off_target"
                                            value={this.state.currentInput.shot_off_target}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="long_balls"
                                            value={this.state.currentInput.long_balls}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="accurate_long_balls"
                                            value={this.state.currentInput.accurate_long_balls}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="crosses"
                                            value={this.state.currentInput.crosses}
                                            disabled={(this.state.allRowsDisabled || !this.state.keeperRowsDisabled)}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="key_passes"
                                            value={this.state.currentInput.key_passes}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="touches"
                                            value={this.state.currentInput.touches}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="aerials_lost"
                                            value={this.state.currentInput.aerials_lost}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="aerials_won"
                                            value={this.state.currentInput.aerials_won}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="clearances"
                                            value={this.state.currentInput.clearances}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="dispossessed"
                                            value={this.state.currentInput.dispossessed}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={100}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="dribbles_attempted"
                                            value={this.state.currentInput.dribbles_attempted}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={100}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="dribbles_succeeded"
                                            value={this.state.currentInput.dribbles_succeeded}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={100}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="duels_lost"
                                            value={this.state.currentInput.duels_lost}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="duels_won"
                                            value={this.state.currentInput.duels_won}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="fouls"
                                            value={this.state.currentInput.fouls}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={70}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="interceptions"
                                            value={this.state.currentInput.interceptions}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={100}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="recoveries"
                                            value={this.state.currentInput.recoveries}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={90}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="tackles_attempted"
                                            value={this.state.currentInput.tackles_attempted}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={90}
                                            min={"0"}
                                        />
                                        <RowInput
                                            type="number"
                                            name="tackles_succeeded"
                                            value={this.state.currentInput.tackles_succeeded}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={90}
                                            min={0}
                                        />
                                        <RowInput
                                            type="number"
                                            name="was_fouled"
                                            value={this.state.currentInput.was_fouled}
                                            disabled={this.state.allRowsDisabled}
                                            onChange={this.storeInput}
                                            width={80}
                                            min={0}
                                        />
                                        <RowInput
                                            type="radio"
                                            name="was_subbed"
                                            value={this.state.currentInput.was_subbed}
                                            disabled={this.state.allRowsDisabled}
                                            onClick={this.storeRadioInput}
                                            width={100}
                                        />
                                        <RowInput
                                            type="radio"
                                            name="is_a_sub"
                                            value={this.state.currentInput.is_a_sub}
                                            disabled={this.state.allRowsDisabled}
                                            onClick={this.storeRadioInput}
                                            width={70}
                                        />
                                        <RowInput
                                            type="radio"
                                            name="yellow_card"
                                            value={this.state.currentInput.yellow_card}
                                            disabled={this.state.allRowsDisabled}
                                            onClick={this.storeRadioInput}
                                            width={70}
                                        />
                                        <RowInput
                                            type="radio"
                                            name="red_card"
                                            value={this.state.currentInput.red_card}
                                            disabled={this.state.allRowsDisabled}
                                            onClick={this.storeRadioInput}
                                            width={70}
                                        />
                                        <td>

                                        </td>
                                        <td style={{textAlign: "center"}}>
                                            {this.validInput() ? (
                                                <button onClick={this.submitInput}
                                                        style={{fontSize: "14px", padding: "2px"}}>
                                                    Confirm
                                                </button>) : (
                                                <button onClick={this.removeCurrentInput}
                                                        style={{fontSize: "14px", padding: "2px"}}>
                                                    Clear
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style={{textAlign: "left", paddingTop: "450px", position: "fixed"}}>
                                    <button
                                        onClick={this.submitAll}
                                        className="submit"
                                        style={{
                                            width: "100%",
                                            background: "#0B273F",
                                            color: "white",
                                            cursor: "pointer",
                                            border: "none",
                                            height: "50px",
                                            padding: "8px 8px",
                                            boxSizing: "border-box",
                                            alignContent: 'left',
                                            position: "fixed",
                                            fontSize: "16px"
                                        }}>
                                        Get Ratings
                                    </button>
                                </div>
                            </div>) : (
                            <div>
                                <DocumentHeader
                                    value={"Football Players Data"}
                                />
                                <table className="table table-striped" id="players_match_data_response"
                                       style={{paddingTop: "62px"}}>
                                    <TableHeader
                                        values={["Role", "Name", "Minutes Played", "Diving Saves", "Goals Conceded By Goalkeeper", "Punches", "Saves", "Saves Inside Box",
                                            "Total Throws", "Passes", "Accurate Passes", "Assists", "Goals", "Chances Created", "Total Shots", "Blocked Shots", "Shots On Target",
                                            "Shots Off Target", "Long Balls", "Accurate Long Balls", "Crosses", "Key Passes", "Touches", "Aerials Lost", "Aerials Won", "Clearances",
                                            "Dispossessed", "Dribbles Attempted", "Dribbles Succeeded", "Duels Lost", "Duels Won", "Fouls", "Interceptions", "Recoveries",
                                            "Tackles Attempted", "Tackles Succeeded", "Was Fouled", "Substituted", "Was a Substitute", "Yellow Card", "Red Card", "Rating"]}
                                    />
                                    <tbody>
                                    {this.state.rows.map((row, idx) => (
                                        <tr key={idx} style={{background: "#D9DBDC"}}>
                                            <RowItem value={row.role}/>
                                            <RowItem value={row.name}/>
                                            <RowItem value={row.minutes_played}/>
                                            <RowItem value={row.diving_save}/>
                                            <RowItem value={row.goals_conceded}/>
                                            <RowItem value={row.punches}/>
                                            <RowItem value={row.saves}/>
                                            <RowItem value={row.saves_inside_box}/>
                                            <RowItem value={row.total_throws}/>
                                            <RowItem value={row.passes}/>
                                            <RowItem value={row.accurate_passes}/>
                                            <RowItem value={row.assists}/>
                                            <RowItem value={row.goals}/>
                                            <RowItem value={row.chances_created}/>
                                            <RowItem value={row.total_shots}/>
                                            <RowItem value={row.blocked_shots}/>
                                            <RowItem value={row.shot_on_target}/>
                                            <RowItem value={row.shot_off_target}/>
                                            <RowItem value={row.long_balls}/>
                                            <RowItem value={row.accurate_long_balls}/>
                                            <RowItem value={row.crosses}/>
                                            <RowItem value={row.key_passes}/>
                                            <RowItem value={row.touches}/>
                                            <RowItem value={row.aerials_lost}/>
                                            <RowItem value={row.aerials_won}/>
                                            <RowItem value={row.clearances}/>
                                            <RowItem value={row.dispossessed}/>
                                            <RowItem value={row.dribbles_attempted}/>
                                            <RowItem value={row.dribbles_succeeded}/>
                                            <RowItem value={row.duels_lost}/>
                                            <RowItem value={row.duels_won}/>
                                            <RowItem value={row.fouls}/>
                                            <RowItem value={row.interceptions}/>
                                            <RowItem value={row.recoveries}/>
                                            <RowItem value={row.tackles_attempted}/>
                                            <RowItem value={row.tackles_succeeded}/>
                                            <RowItem value={row.was_fouled}/>
                                            <RowItem value={row.was_subbed}/>
                                            <RowItem value={row.is_a_sub}/>
                                            <RowItem value={row.yellow_card}/>
                                            <RowItem value={row.red_card}/>
                                            <RowItem value={row.rating}/>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div style={{textAlign: "left", paddingTop: "450px", position: "fixed"}}>
                                    <button
                                        onClick={this.resetScreen}
                                        className="submit"
                                        style={{
                                            width: "100%",
                                            background: "#0B273F",
                                            color: "white",
                                            cursor: "pointer",
                                            border: "none",
                                            height: "50px",
                                            padding: "8px 8px",
                                            boxSizing: "border-box",
                                            alignContent: 'left',
                                            position: "fixed",
                                            fontSize: "16px"
                                        }}>
                                        Enter New Data
                                    </button>
                                </div>
                            </div>)}
                        <ResponseMessage
                            value={this.state.responseMessage}/>
                    </div>)}
            </div>
        );
    }
}

export default App;
