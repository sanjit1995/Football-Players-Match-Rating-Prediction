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
        was_fouled: "No",
        is_a_sub: "No",
        was_subbed: "No",
        yellow_card: "No",
        red_card: "No",
        rating: ""
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
            return false
        } else if (this.state.role === "Keeper") {
            return currentInput.name && currentInput.diving_save && currentInput.goals_conceded && currentInput.minutes_played && currentInput.punches
                && currentInput.saves && currentInput.saves_inside_box && currentInput.total_throws && currentInput.accurate_passes && currentInput.total_shots
                && currentInput.shot_off_target && currentInput.shot_on_target && currentInput.accurate_long_balls && currentInput.key_passes
                && currentInput.long_balls && currentInput.passes && currentInput.touches && currentInput.aerials_lost && currentInput.aerials_won
                && currentInput.clearances && currentInput.dispossessed && currentInput.dribbles_attempted && currentInput.dribbles_succeeded
                && currentInput.duels_lost && currentInput.duels_won && currentInput.fouls && currentInput.interceptions && currentInput.recoveries
                && currentInput.tackles_attempted && currentInput.tackles_succeeded;
        } else {
            return currentInput.name && currentInput.assists && currentInput.chances_created && currentInput.minutes_played && currentInput.goals
                && currentInput.crosses && currentInput.blocked_shots && currentInput.accurate_passes && currentInput.total_shots
                && currentInput.shot_off_target && currentInput.shot_on_target && currentInput.accurate_long_balls && currentInput.key_passes
                && currentInput.long_balls && currentInput.passes && currentInput.touches && currentInput.aerials_lost && currentInput.aerials_won
                && currentInput.clearances && currentInput.dispossessed && currentInput.dribbles_attempted && currentInput.dribbles_succeeded
                && currentInput.duels_lost && currentInput.duels_won && currentInput.fouls && currentInput.interceptions && currentInput.recoveries
                && currentInput.tackles_attempted && currentInput.tackles_succeeded;
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
        if (currentRow.minutes_played < 1 || currentRow.minutes_played > 120) {
            alert("Minutes played cannot be less than 1 or more than 120")
            return false
        }
        if (currentRow.accurate_passes > currentRow.passes) {
            alert("Accurate Passes cannot be more than no. of Passes")
            return false
        }
        if ((currentRow.blocked_shots > currentRow.total_shots) || (currentRow.shot_on_target > currentRow.total_shots) || (currentRow.shot_off_target > currentRow.total_shots)) {
            alert("No. of Blocked Shots, Shots On Target and Shots Off Target cannot be more than Total Shots")
            return false
        }
        if (currentRow.accurate_long_balls > currentRow.long_balls) {
            alert("Accurate Long Balls cannot be more than no. of Long Balls")
            return false
        }
        if (currentRow.dribbles_succeeded > currentRow.dribbles_attempted) {
            alert("Dribbles Succeeded cannot be more than Dribbles Attempted")
            return false
        }
        if (currentRow.tackles_succeeded > currentRow.tackles_attempted) {
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

            // To convert the data into an XML request
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
                    "content_type": "application/json",
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
                                            <td/>
                                            <td style={{textAlign: "center"}}>
                                                <button onClick={() => {
                                                    this.handleRemoveRow(idx)
                                                }}>
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
                                                <button onClick={this.submitInput} style={{fontSize: "18px"}}>
                                                    Confirm
                                                </button>) : (
                                                <button onClick={this.removeCurrentInput} style={{fontSize: "14px", padding: "2px"}}>
                                                    Clear
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div style={{textAlign: "left", paddingTop: "430px"}}>
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
                                            margin: "4px 2px",
                                            padding: "8px 16px",
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
                                <div style={{textAlign: "left", paddingLeft: "5px"}}>
                                    <div style={{display: "inline-block"}}>
                                        <button
                                            onClick={this.resetScreen}
                                            className="submit"
                                            style={{
                                                width: "400px",
                                                background: "#4CAF50",
                                                color: "white",
                                                cursor: "pointer",
                                                border: "none",
                                                margin: "4px 2px",
                                                padding: "8px 16px",
                                                boxSizing: "border-box",
                                                alignContent: 'left'
                                            }}>
                                            Enter New Data
                                        </button>
                                    </div>
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
