(this.webpackJsonpfootball_players_rating_predictor=this.webpackJsonpfootball_players_rating_predictor||[]).push([[0],{13:function(e,t,a){e.exports=a(19)},18:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),l=a(7),r=a.n(l),o=(a(18),a(3)),i=a(4),c=a(8),u=a(9),d=a(12),p=a(11),h=(a(6),function(e){return n.a.createElement("td",{align:"center",style:{padding:"2px"}},n.a.createElement("input",{type:e.type,name:e.name,value:e.value,onChange:e.onChange,onClick:e.onClick,style:{width:e.width,padding:"4px"},disabled:e.disabled,checked:"Yes"===e.value,height:"100px"}))}),m=function(e){return n.a.createElement("td",{align:"center"},n.a.createElement("div",{className:"box",style:{padding:"2px"}},n.a.createElement("select",{value:e.value,onChange:e.onChange},n.a.createElement("option",{value:""},"--- select ---"),n.a.createElement("option",{value:"Keeper"},"Keeper"),n.a.createElement("option",{value:"Defender"},"Defender"),n.a.createElement("option",{value:"Midfielder"},"Midfielder"),n.a.createElement("option",{value:"Attacker"},"Attacker"))))},_=function(e){return n.a.createElement("td",{align:"center",style:{padding:"4px",fontFamily:"trebuchetMS",fontSize:"14px",fontStretch:"2px"}},n.a.createElement("span",null," ",e.value," "))},b=function(e){return n.a.createElement("thead",{style:{backgroundColor:"gainsboro",color:"black",tableLayout:"auto",width:"180px",border:"auto",fontSize:"14px"}},n.a.createElement("tr",null,e.values.map((function(e,t){return n.a.createElement("th",{key:t,className:"text-center",style:{fontFamily:"trebuchetMS",fontSize:"14px",fontStretch:"2px"}},e)}))))},v=function(e){return n.a.createElement("p",{align:"center"},e.value?alert(e.value):"")},g=function(e){return n.a.createElement("div",{style:{fontSize:"40px",justifyContent:"center",color:"white",backgroundColor:"#3B3B38",width:"100%",position:"fixed",top:"0"},align:"center"},e.value)},w=a(10),E=a.n(w);var f=["diving_save","goals_conceded","punches","saves","saves_inside_box","total_throws"],y=["chances_created","goals","crosses","blocked_shots"],I=Object.keys({name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""});I.pop(),console.log(I.length);for(var k=[],R=[],D=0;D<I.length;D++)-1===y.indexOf(I[D])&&k.push(I[D]),-1===f.indexOf(I[D])&&R.push(I[D]);console.log(k),console.log(R);var C=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var s;return Object(c.a)(this,a),(s=t.call(this,e)).validInput=function(){var e=s.state.currentInput;if(""===s.state.role)return 0;if("Keeper"===s.state.role){var t,a=Object(i.a)(k);try{for(a.s();!(t=a.n()).done;){var n=t.value;if(console.log(e[n]),e[n].length<0)return 0}}catch(c){a.e(c)}finally{a.f()}return 1}var l,r=Object(i.a)(R);try{for(r.s();!(l=r.n()).done;){var o=l.value;if(console.log(e[o]),e[o].length<0)return 0}}catch(c){r.e(c)}finally{r.f()}return 1},s.storeInput=function(e){var t=e.target,a=t.type,n=t.name,l=t.value,r=s.state.currentInput;"number"===a?(l<0?(alert("Value cannot be less than 0"),r[n]=""):r[n]=l,s.setState({currentInput:r})):(r[n]=l,s.setState({currentInput:r}))},s.storeRadioInput=function(e){var t=e.target,a=t.name,n=t.value,l=s.state.currentInput;l[a]="No"===n?"Yes":"No",s.setState({currentInput:l})},s.checkDataValidity=function(){var e=s.state.currentInput;return parseInt(e.minutes_played)<1||parseInt(e.minutes_played)>120?(alert("Minutes played cannot be less than 1 or more than 120"),!1):parseInt(e.accurate_passes)>parseInt(e.passes)?(alert("Accurate Passes cannot be more than no. of Passes"),!1):parseInt(e.blocked_shots)>parseInt(e.total_shots)||parseInt(e.shot_on_target)>parseInt(e.total_shots)||parseInt(e.shot_off_target)>parseInt(e.total_shots)?(alert("No. of Blocked Shots, Shots On Target and Shots Off Target cannot be more than Total Shots"),!1):parseInt(e.accurate_long_balls)>parseInt(e.long_balls)?(alert("Accurate Long Balls cannot be more than no. of Long Balls"),!1):parseInt(e.dribbles_succeeded)>parseInt(e.dribbles_attempted)?(alert("Dribbles Succeeded cannot be more than Dribbles Attempted"),!1):!(parseInt(e.tackles_succeeded)>parseInt(e.tackles_attempted))||(alert("Tackles Succeeded cannot be more than Tackles Attempted"),!1)},s.submitInput=function(){s.checkDataValidity()&&(console.log(s.state),s.setState((function(e,t){var a=e.rows,s=e.currentInput,n=(e.role,e.allRowsDisabled,e.keeperRowsDisabled,e.responseMessage);return{rows:[].concat(Object(o.a)(a),[s]),currentInput:{name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""},role:"",allRowsDisabled:!0,keeperRowsDisabled:!0,responseMessage:n,loading:!1}})))},s.removeCurrentInput=function(){s.setState({currentInput:{name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""}})},s.handleRemoveRow=function(e){console.log(e);var t=Object(o.a)(s.state.rows);-1!==e&&(t.splice(e,1),s.setState({rows:t}))},s.validRowsData=function(){return s.state.rows.length},s.enableRows=function(e){var t,a,n=e.target,l=(n.name,n.value);0===l.length?t=!0:"Keeper"===l?(t=!1,a=!1):(t=!1,a=!0);var r=s.state.currentInput;r.role=l,s.setState((function(e,s){var n=e.rows,i=(e.currentInputTemp,e.role,e.allRowsDisabled,e.keeperRowsDisabled,e.responseMessage);return{rows:Object(o.a)(n),currentInput:r,role:l,allRowsDisabled:t,keeperRowsDisabled:a,responseMessage:i}}))},s.submitAll=function(){if(s.validRowsData()){console.log(s.state),console.log("Sending request");var e=JSON.stringify(s.state.rows);console.log(e),s.setState({screenLoading:!0}),fetch("/getRating",{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:e}).then((function(e){if(500===e.status)throw new Error("SERVER_ERR_500 : CHECK SERVER CONNECTION");return e.json()})).then((function(e){s.setState((function(){return{rows:e,currentInput:{name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""},role:"",allRowsDisabled:!0,keeperRowsDisabled:!0,responseMessage:"",screenLoading:!1,responseReceived:!0}})),console.log(e)})).catch((function(e){var t=e.message;console.log(t),s.setState({screenLoading:!1,responseMessage:t})}))}else alert("Please enter all data and click confirm when done"),console.log(s.state)},s.resetScreen=function(){s.setState((function(){return{rows:[],currentInput:{name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""},role:"",allRowsDisabled:!0,keeperRowsDisabled:!0,responseMessage:"",screenLoading:!1,responseReceived:!1}}))},s.state={rows:[],currentInput:{name:"",role:"",diving_save:"",goals_conceded:"",minutes_played:"",punches:"",saves:"",saves_inside_box:"",total_throws:"",accurate_passes:"",assists:"",chances_created:"",goals:"",total_shots:"",blocked_shots:"",shot_off_target:"",shot_on_target:"",accurate_long_balls:"",crosses:"",key_passes:"",long_balls:"",passes:"",touches:"",aerials_lost:"",aerials_won:"",clearances:"",dispossessed:"",dribbles_attempted:"",dribbles_succeeded:"",duels_lost:"",duels_won:"",fouls:"",interceptions:"",recoveries:"",tackles_attempted:"",tackles_succeeded:"",was_fouled:"",is_a_sub:"No",was_subbed:"No",yellow_card:"No",red_card:"No",rating:""},role:"",allRowsDisabled:!0,keeperRowsDisabled:!0,responseMessage:"",screenLoading:!1,responseReceived:!1},s}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",null,this.state.screenLoading?n.a.createElement("div",{align:"center",style:{position:"relative",margin:"auto",paddingTop:"220px",fontSize:"40px"}},"Loading......Please Wait",n.a.createElement(E.a,{type:"spokes",color:"black"})):n.a.createElement("div",null,this.state.responseReceived?n.a.createElement("div",null,n.a.createElement(g,{value:"Football Players Data"}),n.a.createElement("table",{className:"table table-striped",id:"players_match_data_response",style:{paddingTop:"62px"}},n.a.createElement(b,{values:["Role","Name","Minutes Played","Diving Saves","Goals Conceded By Goalkeeper","Punches","Saves","Saves Inside Box","Total Throws","Passes","Accurate Passes","Assists","Goals","Chances Created","Total Shots","Blocked Shots","Shots On Target","Shots Off Target","Long Balls","Accurate Long Balls","Crosses","Key Passes","Touches","Aerials Lost","Aerials Won","Clearances","Dispossessed","Dribbles Attempted","Dribbles Succeeded","Duels Lost","Duels Won","Fouls","Interceptions","Recoveries","Tackles Attempted","Tackles Succeeded","Was Fouled","Substituted","Was a Substitute","Yellow Card","Red Card","Rating"]}),n.a.createElement("tbody",null,this.state.rows.map((function(e,t){return n.a.createElement("tr",{key:t,style:{background:"#D9DBDC"}},n.a.createElement(_,{value:e.role}),n.a.createElement(_,{value:e.name}),n.a.createElement(_,{value:e.minutes_played}),n.a.createElement(_,{value:e.diving_save}),n.a.createElement(_,{value:e.goals_conceded}),n.a.createElement(_,{value:e.punches}),n.a.createElement(_,{value:e.saves}),n.a.createElement(_,{value:e.saves_inside_box}),n.a.createElement(_,{value:e.total_throws}),n.a.createElement(_,{value:e.passes}),n.a.createElement(_,{value:e.accurate_passes}),n.a.createElement(_,{value:e.assists}),n.a.createElement(_,{value:e.goals}),n.a.createElement(_,{value:e.chances_created}),n.a.createElement(_,{value:e.total_shots}),n.a.createElement(_,{value:e.blocked_shots}),n.a.createElement(_,{value:e.shot_on_target}),n.a.createElement(_,{value:e.shot_off_target}),n.a.createElement(_,{value:e.long_balls}),n.a.createElement(_,{value:e.accurate_long_balls}),n.a.createElement(_,{value:e.crosses}),n.a.createElement(_,{value:e.key_passes}),n.a.createElement(_,{value:e.touches}),n.a.createElement(_,{value:e.aerials_lost}),n.a.createElement(_,{value:e.aerials_won}),n.a.createElement(_,{value:e.clearances}),n.a.createElement(_,{value:e.dispossessed}),n.a.createElement(_,{value:e.dribbles_attempted}),n.a.createElement(_,{value:e.dribbles_succeeded}),n.a.createElement(_,{value:e.duels_lost}),n.a.createElement(_,{value:e.duels_won}),n.a.createElement(_,{value:e.fouls}),n.a.createElement(_,{value:e.interceptions}),n.a.createElement(_,{value:e.recoveries}),n.a.createElement(_,{value:e.tackles_attempted}),n.a.createElement(_,{value:e.tackles_succeeded}),n.a.createElement(_,{value:e.was_fouled}),n.a.createElement(_,{value:e.was_subbed}),n.a.createElement(_,{value:e.is_a_sub}),n.a.createElement(_,{value:e.yellow_card}),n.a.createElement(_,{value:e.red_card}),n.a.createElement(_,{value:e.rating}))})))),n.a.createElement("div",{style:{textAlign:"left",paddingTop:"450px",position:"fixed"}},n.a.createElement("button",{onClick:this.resetScreen,className:"submit",style:{width:"100%",background:"#0B273F",color:"white",cursor:"pointer",border:"none",height:"50px",padding:"8px 8px",boxSizing:"border-box",alignContent:"left",position:"fixed",fontSize:"16px"}},"Enter New Data"))):n.a.createElement("div",null,n.a.createElement(g,{value:"Player Match Rating Predictor"}),n.a.createElement("table",{className:"table table-striped",id:"players_match_data_request",style:{marginTop:"62px"}},n.a.createElement(b,{values:["Role","Name","Minutes Played","Diving Saves","Goals Conceded By Goalkeeper","Punches","Saves","Saves Inside Box","Total Throws","Passes","Accurate Passes","Assists","Goals","Chances Created","Total Shots","Blocked Shots","Shots On Target","Shots Off Target","Long Balls","Accurate Long Balls","Crosses","Key Passes","Touches","Aerials Lost","Aerials Won","Clearances","Dispossessed","Dribbles Attempted","Dribbles Succeeded","Duels Lost","Duels Won","Fouls","Interceptions","Recoveries","Tackles Attempted","Tackles Succeeded","Was Fouled","Substituted","Was a Substitute","Yellow Card","Red Card","Rating"]}),n.a.createElement("tbody",null,this.state.rows.map((function(t,a){return n.a.createElement("tr",{key:a,style:{background:"#D9DBDC"}},n.a.createElement(_,{value:t.role}),n.a.createElement(_,{value:t.name}),n.a.createElement(_,{value:t.minutes_played}),n.a.createElement(_,{value:t.diving_save}),n.a.createElement(_,{value:t.goals_conceded}),n.a.createElement(_,{value:t.punches}),n.a.createElement(_,{value:t.saves}),n.a.createElement(_,{value:t.saves_inside_box}),n.a.createElement(_,{value:t.total_throws}),n.a.createElement(_,{value:t.passes}),n.a.createElement(_,{value:t.accurate_passes}),n.a.createElement(_,{value:t.assists}),n.a.createElement(_,{value:t.goals}),n.a.createElement(_,{value:t.chances_created}),n.a.createElement(_,{value:t.total_shots}),n.a.createElement(_,{value:t.blocked_shots}),n.a.createElement(_,{value:t.shot_on_target}),n.a.createElement(_,{value:t.shot_off_target}),n.a.createElement(_,{value:t.long_balls}),n.a.createElement(_,{value:t.accurate_long_balls}),n.a.createElement(_,{value:t.crosses}),n.a.createElement(_,{value:t.key_passes}),n.a.createElement(_,{value:t.touches}),n.a.createElement(_,{value:t.aerials_lost}),n.a.createElement(_,{value:t.aerials_won}),n.a.createElement(_,{value:t.clearances}),n.a.createElement(_,{value:t.dispossessed}),n.a.createElement(_,{value:t.dribbles_attempted}),n.a.createElement(_,{value:t.dribbles_succeeded}),n.a.createElement(_,{value:t.duels_lost}),n.a.createElement(_,{value:t.duels_won}),n.a.createElement(_,{value:t.fouls}),n.a.createElement(_,{value:t.interceptions}),n.a.createElement(_,{value:t.recoveries}),n.a.createElement(_,{value:t.tackles_attempted}),n.a.createElement(_,{value:t.tackles_succeeded}),n.a.createElement(_,{value:t.was_fouled}),n.a.createElement(_,{value:t.was_subbed}),n.a.createElement(_,{value:t.is_a_sub}),n.a.createElement(_,{value:t.yellow_card}),n.a.createElement(_,{value:t.red_card}),n.a.createElement("td",null),n.a.createElement("td",{style:{textAlign:"center"}},n.a.createElement("button",{onClick:function(){e.handleRemoveRow(a)},style:{fontSize:"14px",padding:"2px"}},"Clear")))})),n.a.createElement("tr",{style:{background:"#D9DBDC"}},n.a.createElement(m,{name:"role",value:this.state.role,onChange:this.enableRows}),n.a.createElement(h,{type:"text",name:"name",value:this.state.currentInput.name,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:200}),n.a.createElement(h,{type:"number",name:"minutes_played",value:this.state.currentInput.minutes_played,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70}),n.a.createElement(h,{type:"number",name:"diving_save",value:this.state.currentInput.diving_save,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"goals_conceded",value:this.state.currentInput.goals_conceded,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:100,min:"0"}),n.a.createElement(h,{type:"number",name:"punches",value:this.state.currentInput.punches,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"saves",value:this.state.currentInput.saves,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"saves_inside_box",value:this.state.currentInput.saves_inside_box,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"total_throws",value:this.state.currentInput.total_throws,disabled:this.state.allRowsDisabled||this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"passes",value:this.state.currentInput.passes,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"accurate_passes",value:this.state.currentInput.accurate_passes,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"assists",value:this.state.currentInput.assists,disabled:this.state.allRowsDisabled||!this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"goals",value:this.state.currentInput.goals,disabled:this.state.allRowsDisabled||!this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"chances_created",value:this.state.currentInput.chances_created,disabled:this.state.allRowsDisabled||!this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"total_shots",value:this.state.currentInput.total_shots,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"blocked_shots",value:this.state.currentInput.blocked_shots,disabled:this.state.allRowsDisabled||!this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"shot_on_target",value:this.state.currentInput.shot_on_target,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"shot_off_target",value:this.state.currentInput.shot_off_target,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"long_balls",value:this.state.currentInput.long_balls,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"accurate_long_balls",value:this.state.currentInput.accurate_long_balls,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"crosses",value:this.state.currentInput.crosses,disabled:this.state.allRowsDisabled||!this.state.keeperRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"key_passes",value:this.state.currentInput.key_passes,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"touches",value:this.state.currentInput.touches,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"aerials_lost",value:this.state.currentInput.aerials_lost,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"aerials_won",value:this.state.currentInput.aerials_won,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"clearances",value:this.state.currentInput.clearances,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"dispossessed",value:this.state.currentInput.dispossessed,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:100,min:"0"}),n.a.createElement(h,{type:"number",name:"dribbles_attempted",value:this.state.currentInput.dribbles_attempted,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:100,min:"0"}),n.a.createElement(h,{type:"number",name:"dribbles_succeeded",value:this.state.currentInput.dribbles_succeeded,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:100,min:"0"}),n.a.createElement(h,{type:"number",name:"duels_lost",value:this.state.currentInput.duels_lost,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"duels_won",value:this.state.currentInput.duels_won,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"fouls",value:this.state.currentInput.fouls,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:70,min:"0"}),n.a.createElement(h,{type:"number",name:"interceptions",value:this.state.currentInput.interceptions,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:100,min:"0"}),n.a.createElement(h,{type:"number",name:"recoveries",value:this.state.currentInput.recoveries,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:90,min:"0"}),n.a.createElement(h,{type:"number",name:"tackles_attempted",value:this.state.currentInput.tackles_attempted,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:90,min:"0"}),n.a.createElement(h,{type:"number",name:"tackles_succeeded",value:this.state.currentInput.tackles_succeeded,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:90,min:0}),n.a.createElement(h,{type:"number",name:"was_fouled",value:this.state.currentInput.was_fouled,disabled:this.state.allRowsDisabled,onChange:this.storeInput,width:80,min:0}),n.a.createElement(h,{type:"radio",name:"was_subbed",value:this.state.currentInput.was_subbed,disabled:this.state.allRowsDisabled,onClick:this.storeRadioInput,width:100}),n.a.createElement(h,{type:"radio",name:"is_a_sub",value:this.state.currentInput.is_a_sub,disabled:this.state.allRowsDisabled,onClick:this.storeRadioInput,width:70}),n.a.createElement(h,{type:"radio",name:"yellow_card",value:this.state.currentInput.yellow_card,disabled:this.state.allRowsDisabled,onClick:this.storeRadioInput,width:70}),n.a.createElement(h,{type:"radio",name:"red_card",value:this.state.currentInput.red_card,disabled:this.state.allRowsDisabled,onClick:this.storeRadioInput,width:70}),n.a.createElement("td",null),n.a.createElement("td",{style:{textAlign:"center"}},this.validInput()?n.a.createElement("button",{onClick:this.submitInput,style:{fontSize:"14px",padding:"2px"}},"Confirm"):n.a.createElement("button",{onClick:this.removeCurrentInput,style:{fontSize:"14px",padding:"2px"}},"Clear"))))),n.a.createElement("div",{style:{textAlign:"left",paddingTop:"450px",position:"fixed"}},n.a.createElement("button",{onClick:this.submitAll,className:"submit",style:{width:"100%",background:"#0B273F",color:"white",cursor:"pointer",border:"none",height:"50px",padding:"8px 8px",boxSizing:"border-box",alignContent:"left",position:"fixed",fontSize:"16px"}},"Get Ratings"))),n.a.createElement(v,{value:this.state.responseMessage})))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){}},[[13,1,2]]]);
//# sourceMappingURL=main.6130c25d.chunk.js.map