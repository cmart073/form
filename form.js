///set fetch listener
addEventListener('fetch', event => { event.respondWith(html(event.request)) })

//get html content
async function html(request) 
{
  var config = {
  api: {
    base: "https://cmart-form.pick-em.app",
    route: "/",
    email: "",
    token: ""
  },
  app: {
    name: "Pick\'em Form",
    version: "3.0.0"
  },
  masters:{
    debug: 0,
    name: "The Masters",
    course: "Augusta National"

  }
}

//var url = request.url
//console.log(url)


  var group1 = ['Jon Rahm','Scottie Scheffler','Cameron Smith','Justin Thomas','Dustin Johnson','Rory McIlroy','Viktor Hovland','Brooks Koepka','Jordan Spieth','Xander Schauffele','Collin Morikawa','Hideki Matsuyama','Patrick Cantlay','Daniel Berger','Will Zalatoris','Russell Henley','Bryson DeChambeau','Tiger Woods','Louis Oosthuizen','Tyrrell Hatton']
  var group2 = ['Sam Burns', 'Paul Casey', 'Matt Fitzpatrick', 'Marc Leishman', 'Adam Scott', 'Shane Lowry', 'Corey Conners', 'Tony Finau', 'Sungjae Im', 'Patrick Reed', 'Joaquin Niemann', 'Sergio Garcia', 'Robert MacIntyre', 'Bubba Watson', 'Max Homa', 'Billy Horschel', 'Abraham Ancer', 'Justin Rose', 'Tommy Fleetwood', 'Si Woo Kim']
  var group3 = ['Webb Simpson', 'Gary Woodland', 'Thomas Pieters', 'Talor Gooch', 'Seamus Power', 'Christiaan Bezuidenhout', 'Cameron Young', 'Matthew Wolff', 'Kevin Na', 'Jason Kokrak', 'Cameron Champ', 'Brian Harman', 'Lee Westwood', 'Kevin Kisner', 'Harold Varner III', 'Tom Hoge', 'Ryan Palmer', 'Mackenzie Hughes', 'Luke List', 'Garrick Higgo']
  var group4 = ['Francesco Molinari', 'Erik Van Rooyen', 'Takumi Kanaya', 'Danny Willett', 'Lucas Herbert', 'Guido Migliozzi', 'Stewart Cink', 'Zach Johnson', 'Sepp Straka', 'Cameron Davis', 'Padraig Harrington', 'Min Woo Lee', 'Lucas Glover', 'K.H. Lee', 'Harry Higgs', 'Charl Schwartzel', 'Hudson Swafford', 'Fred Couples', 'Vijay Singh', 'Sandy Lyle', 'Mike Weir', 'Bernhard Langer', 'Larry Mize', 'Jose Maria Olazabal']


  var result = ''
  payload = ''
  //response = await fetch('https://site.web.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=pga') 
  response = await fetch('https://golf-leaderboard-data.p.rapidapi.com/entry-list/456',{
        method:'GET',
        headers:{
          'x-rapidapi-key': 'KEY',
	        'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'  
        }
    })
  await response.json().then(d => { j = d })
  
  list = await entry_list.get("entry_list","json")
  //console.log(list)
  console.log("KV: "+list.length)
  console.log("entry_list: "+j.results.entry_list.length)
  const pga = j.results
  const leaderboard = pga.entry_list

  var tourney_name = JSON.stringify(pga.tournament.name,null,2).replace(/\"/g, "")
  var course_name = JSON.stringify(pga.tournament.course,null,2).replace(/\"/g, "")
  //var par_in = JSON.stringify(courses.parIn,null,2).replace(/\"/g, "")
  //var par_out = JSON.stringify(courses.parOut,null,2).replace(/\"/g, "")
  //var par_total = JSON.stringify(courses.shotsToPar,null,2).replace(/\"/g, "")
  const size = JSON.stringify(list.length)
  var blahs = ''
  var dude = ''
  let hazel = ''
  let idk = ''
  let end = ''
  var picksPerRound = 0
  var lower = 0
  var div_class = ''
  var a = 0
  var b = 0
  var c = 0
  var d = 0
  for (w = 0; w <= 4 - 1; w++){
 
    blahs = '<center><div class="col-md-12"><div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">GROUP'+(w+1)+'</h3></div><div class="panel-body bg-info" >'
      switch (w) {
        case 0:
          picksPerRound = 3;
          lower = 0;
          div_class = "col-md-4";
          break;
        case 1:
          picksPerRound = 5;
          lower = 3;
          div_class = "col-md-6";
          break;
        case 2:
          picksPerRound = 7;
          lower = 5;
          div_class = "col-md-6";
          break;
        case 3:
          picksPerRound = 8;
          lower = 7;
          div_class = "col-md-12";
          break;
      }
      idk = ''
      for (y = lower; y <= picksPerRound - 1; y++) {
        hazel = ''
        dude = '<div class='+div_class+'><div class="panel panel-success"><select  class="panel-body panel-success" style="width:100%; text-align:center" id="player'+(y + 1)+'" name="player'+(y + 1)+'" class="form-control form-control-lg" required><option style="text-align:center" value="" disabled selected required>Select your pick '+(y + 1)+'</option>'      
        //list.sort(function (a, b) {
          //return a.position - b.position;
        //});
        //console.log(list)
        for (x = 0; x <= size -1; x++) {
          let player_id = JSON.stringify(list[x].player_id,null,2).replace(/\"/g, "")
          let firstName = JSON.stringify(list[x].first_name,null,2).replace(/\"/g, "")
          let lastName = JSON.stringify(list[x].last_name,null,2).replace(/\"/g, "")
          let displayName = firstName+' '+lastName
          let position = list[x].position
          toUpper = function(x){ 
            return x.toUpperCase();
          };

          
          if(w==0){
            //if(1 <= position && position <= 20){
            group1 = group1.map(toUpper)
            if(group1.includes(displayName.toUpperCase())){
              a ++
              hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
            }
          }
          if(w==1){
            //if(20 < position && position <= 40){
            group2 = group2.map(toUpper)
            if(group2.includes(displayName.toUpperCase())){
              b++
              hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
            }
          }
          if(w==2){
            //if(40 < position && position <= 60){
            group3 = group3.map(toUpper)
            if(group3.includes(displayName.toUpperCase())){
              c++
              hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
              
            }
          }
          if(w==3){
            //if(60 < position){
            group4 = group4.map(toUpper)
            if(group4.includes(displayName.toUpperCase())){
              d++
              hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
            }else if(!group1.includes(displayName.toUpperCase()) && !group2.includes(displayName.toUpperCase()) && !group3.includes(displayName.toUpperCase()) && !group4.includes(displayName.toUpperCase())){
              d++
              hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
            }
          }
          
          //hazel += `<option type='text' value='{"id":"${player_id}","name":"${displayName}"}'>${displayName}</option>`
        
        }
        idk += dude+hazel+'</select></div></div><input type="hidden" />'
      }    
      end +=blahs+idk+'</div></div></div></center>'
  
  
//if ((size > 0 && config.masters.debug == 0) || url == "https://cmart-form.pick-em.app/"){

  form = `<form  action="${config.api.base}${config.api.route}" id="myForm" method="post">
                <div data-role="fieldcontain">
                <div class='+div_class+'><div class="panel panel-success">
                <select  class="panel-body panel-success" style="width:100%; text-align:center" id="sponsor" name="sponsor" class="form-control form-control-lg" required>
                <option style="text-align:center" value="" disabled selected required>Select your sponsor</option>
                <option type="text" value="Dan D">Dan D</option>
                <option type="text" value="Chris M">Chris M</option>
                </select></div></div><input type="hidden" />

                  <h3> Email Address:
                    <input maxlength="25" style="width:75%; text-align:center" type="in" name="email" id="email" required/>
                  </h3>
                  <h3> First Name:
                    <input maxlength="25" style="width:75%; text-align:center" type="in" name="userFirst" id="userFirst" required/>
                  </h3>
                  <h3> Last Name:
                    <input maxlength="25" style="width:75%; text-align:center" type="in" name="userLast" id="userLast" required/>
                  </h3>
                  <h3> Pick Name:
                    <input maxlength="25" style="width:75%; text-align:center" type="in" name="pickName" id="pickName" required/>
                  </h3>
                  ${end}
                  <h3>Tournament winner's Final Score:
                    <input maxlength="3" style="width:75%; text-align:center" type="in number"  name="winnerTotal" required/>
                  </h3> 
                                      <!-- Button trigger modal -->
                    <button id="yup" onclick="return go();" type="submit" style="width:50%; text-align:center" class="btn btn-success btn-lg btn-block" >
                      Submit Picks
                    </button>
                </div>
              </form>`
/*}else{
  var tourney_name = config.masters.name
  var course_name = config.masters.course
  var par_in = 36
  var par_out = 36
  var par_total = 72
  form = `<form  action="${config.api.base}${config.api.route}" id="myForm" method="post">
            <div data-role="fieldcontain">
              <h1>The field has not been finalized, check back later or enter your email to be notified when the field is populated</h1>
              <h3> Email Address:
                <input maxlength="25" style="width:75%; text-align:center" type="in" name="email" id="email" required/>
              </h3>
              <button id="yup" onclick="return go();" type="submit" style="width:50%; text-align:center" class="btn btn-success btn-lg btn-block" >
                Submit Picks
              </button>
            </div>
          </form>`
}
*/
  //create response parameters
  var init = {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
    }
  }


var content = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="Content-Style-Type" content="text/css"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<title>${config.app.name}</title>
</head>
<body>
  <center>
    <div class="col-md-12">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h5 class="panel-title">
            <h1>
              ${tourney_name}
            </h1>
            <h2 class="card-title">
              ${course_name}
            </h2>
            Par In: 36 Par Out: 36 Par: 72
          </h5>
          <h5>version: ${config.app.version}</h5>
        </div>
        <div class="panel-body bg-info" >
          <div class=card text-white bg-info mb-3>
            <center>
              ${form}
            </center>
          </div>
        </div>
      </div>
    </div>
  </center>
  <script>
  function go(){
   var selects = document.getElementsByTagName('select');
    var values = [];
    for(i=0;i<selects.length;i++) {
        var select = selects[i];
        if(values.indexOf(select.value)>-1) {
            alert('You cannot select duplicate players! Try again.');
            return false;
        }
        else 
            values.push(select.value);
          
            
    }
  }
</script>
</body>
<footer>
</footer>
</html>`
}

   // if http method is post
  if(request.method == "POST")
  {
    //get post data
    var post = await request.formData()
 
    //grab form variables
    var userFirst = post.get('userFirst')
    var userLast = post.get('userLast')
    var pickName = post.get('pickName')
    var winnerTotal = post.get('winnerTotal')

    var pick1_array = JSON.parse(post.get('player1'))
    var pick1_name = pick1_array.name
    var pick1 = pick1_array.id

    var pick2_array = JSON.parse(post.get('player2'))
    var pick2_name = pick2_array.name
    var pick2 = pick2_array.id

    var pick3_array = JSON.parse(post.get('player3'))
    var pick3_name = pick3_array.name
    var pick3 = pick3_array.id

    var pick4_array = JSON.parse(post.get('player4'))
    var pick4_name = pick4_array.name
    var pick4 = pick4_array.id

    var pick5_array = JSON.parse(post.get('player5'))
    var pick5_name = pick5_array.name
    var pick5 = pick5_array.id

    var pick6_array = JSON.parse(post.get('player6'))
    var pick6_name = pick6_array.name
    var pick6 = pick6_array.id

    var pick7_array = JSON.parse(post.get('player7'))
    var pick7_name = pick7_array.name
    var pick7 = pick7_array.id

    var pick8_array = JSON.parse(post.get('player8'))
    var pick8_name = pick8_array.name
    var pick8 = pick8_array.id

    var sponsor = post.get('sponsor')
    var email = post.get('email')          

   /*for (x = 0; x <= size -1; x++) {
      var player_id = JSON.stringify(leaderboard[x].player_id,null,2).replace(/\"/g, "")
      if (pick1 == player_id){
        var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
        var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
        var displayName = firstName+' '+lastName
        var pick1_name = displayName
    }
    if (pick2 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick2_name = displayName
    }
    if (pick3 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick3_name = displayName
    }
    if (pick4 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick4_name = displayName
    }
    if (pick5 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick5_name = displayName
    }
    if (pick6 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick6_name = displayName
    }
    if (pick7 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick7_name = displayName
    }
    if (pick8 == player_id){
      var firstName = JSON.stringify(leaderboard[x].first_name,null,2).replace(/\"/g, "")
      var lastName = JSON.stringify(leaderboard[x].last_name,null,2).replace(/\"/g, "")
      var displayName = firstName+' '+lastName
      var pick8_name = displayName
    }
   }*/

    //check for required parameters
    
    if(userFirst != null && userLast != null)
    {
      // do api processing here
      try{
      await variable.put(pickName+Date.now(),'[{"email":"'+email+'","sponsor":"'+sponsor+'","userFirst":"'+userFirst+'","userLast":"'+userLast+'","pickName":"'+pickName+'","1":"'+pick1+'","pick1name":"'+pick1_name+'","2":"'+pick2+'","pick2name":"'+pick2_name+'","3":"'+pick3+'","pick3name":"'+pick3_name+'","4":"'+pick4+'","pick4name":"'+pick4_name+'","5":"'+pick5+'","pick5name":"'+pick5_name+'","6":"'+pick6+'","pick6name":"'+pick6_name+'","7":"'+pick7+'","pick7name":"'+pick7_name+'","8":"'+pick8+'","pick8name":"'+pick8_name+'","winnerTotal":"'+winnerTotal+'"}]');
      }catch (err){return new Response(err.stack || err)}

        
    var init = {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
        }
    }

   var b = {
            'personalizations': [
                {'to': [{'email': email}],
                'bcc':[{'email':'cmart073@pick-em.app'}]}],
                //'bcc':[{'email':'cmart073@gmail.com'},{'email':'danieldust15@gmail.com'}]}],
                'from': {'email': 'confirmation@pick-em.app'},
                'subject': '[Confirmation] Your pick '+pickName+' has been submitted',
                'content': [
                    {
                    'type': 'text/plain', 
                    'value': "Thank you "+userFirst+" "+userLast+" for submitting "+pickName+".\r\nPick 1: "+pick1_name+"\r\nPick 2: "+pick2_name+"\r\nPick 3: "+pick3_name+"\r\nPick 4: "+pick4_name+"\r\nPick 5: "+pick5_name+"\r\nPick 6: "+pick6_name+"\r\nPick 7: "+pick7_name+"\r\nPick 8:"+pick8_name+"\r\nWinner's Total: "+winnerTotal+"\r\nSponsor: "+sponsor+"\r\n\r\nGo check out https://masters.pick-em.app for live results once the tournament starts."}
                    ]
            }

    await fetch('https://api.sendgrid.com/v3/mail/send',{
        method:'POST',
        headers:{
            'Authorization': 'Bearer '+SENDGRID_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b)
    })

    var content = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="Content-Style-Type" content="text/css"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><title></title>
</head>
<body>
  <center>
    <div class="panel panel-success">
        <div class="panel-heading">
          <h5 class="panel-title">
            <h2 class="card-title">
              Thank you ${userFirst} ${userLast}
            </h2>
            <h2>for submitting ${pickName}</h2>
            Good Luck!<br>
            <i> Please save a screen shot or take note of all the information here in case you come to find Chris can't program </i>
            <br><i>You should also recieve a confirmation email from confirmation@pick-em.app </i>
          </h5>
        </div>
        <div class="panel-body bg-info" >
            <h3>
              Email: ${email}
            </h3>
            <h3>
              Sponsor: ${sponsor}
            </h3>
            <h3>
              Winner Total: ${winnerTotal}
            </h3>
            <h3>
              Pick 1: ${pick1_name}
            </h3>
            <h3>
              Pick 2: ${pick2_name}
            </h3>
            <h3>
              Pick 3: ${pick3_name}
            </h3>
            <h3>
              Pick 4: ${pick4_name}
            </h3>
            <h3>
              Pick 5: ${pick5_name}
            </h3>
            <h3>
              Pick 6: ${pick6_name}
            </h3>
            <h3>
              Pick 7: ${pick7_name}
            </h3>
            <h3>
              Pick 8: ${pick8_name}
            </h3>
        </div>
      </div>
  </center>
</body>
</html>`
  //return response with content
  return new Response(content, init)
  }
  //COLLECTING EMAILS **********************************************************
  else if(email != null && userFirst == null && userLast == null)
    {
      // do api processing here
      try{
      await WAIT_LIST.put(email+Date.now(),email);
      }catch (err){return new Response(err.stack || err)}

        
    var init = {
    status: 200,
    headers: {
      'Content-Type': 'text/html'
        }
    }

    var content = `<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta http-equiv="Content-Style-Type" content="text/css"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script><title></title>
</head>
<body>
  <center>
    <div class="panel panel-success">
        <div class="panel-heading">
          <h5 class="panel-title">
            <h2 class="card-title">
              Thank you for submitting your email: ${email}. You will be notified once the field is polulated!
            </h2>
        </div>
      </div>
  </center>
</body>
</html>`
  //return response with content
  return new Response(content, init)
  }
  
    }else{

  //return response with content
  return new Response(content, init)
  
}

}
