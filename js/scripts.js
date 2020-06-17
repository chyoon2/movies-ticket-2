function Theater() {
  this.movies = [];
}

Theater.prototype.moviesOutNow = function(name) {
  if (name === "mulan") {
    let mulan = {name:"Mulan", rating:"G" , isNew: true, showtime:[1100, 1700, 2000, 2200]};
    this.movies.push(mulan); 
    }
  else if (name === "rock") {
    let rock = {name:"rock", rating: "R" , isNew: false, showtime: [1200, 1300, 1600, 2200]};
    this.movies.push(rock);
    }
  else if (name === "leo") {
    let leo = {name:"leo", rating: "R" , isNew: false, showtime: [1300, 1300, 1700, 2100]};
    this.movies.push(leo); 
  } 
}

function displayShowtimesform(theater) {
  let variableForSelector = $(".show-time");
  $("#form-one").empty(); 
  variableForSelector.append(`<h3>What time were you thinking?</h3>`)
  theater.movies[0].showtime.forEach(function(showtime) {
    displayShowtimeString= "<li>" + showtime + "</li>";
    variableForSelector.append(`<label><input type = 'radio' name = 'showtime' value = '${showtime}'>${showtime}</label><br>`);
  }); 
  let buttons = $(".show-time");
  buttons.append(`<button id="button2" type="button" class="btn btn-warning">Submit</button><br>`);
}

function attachshowtimeListener(theater) {
  $("button#button2").click( function(){
  let selectedShowtime = $("input:radio[name=showtime]:checked").val();
  displayAgeForm(theater);
  theater.movies.push(selectedShowtime);
  return selectedShowtime
  });
};

function displayAgeForm(theater) {
  let selector = $(".show-time");
  selector.empty(); 
  selector.append(`<label for="age">Enter your age</label><input type ="number" id = "age"<br>`);
  let buttons = $(".show-time");
  buttons.append(`<br><button id="button3" type="button" class="btn btn-danger">Submit</button><br>`);
  attachAgeListener(theater);
}

function attachAgeListener(theater) {
  $("button#button3").click( function(){
    $(".show-time").empty();
  let age = parseInt($("#age").val());
    if (age >= 65) {
      alert ("You are automatically qualified for a senior discount")
    }
    else if (age < 18 && theater.movies[1].rating === "R") {
      return alert ("You need parent/guardian permission to see this film")
    }
    calculateCost(age, theater);
  return age;
  });
};

function calculateCost(age, theater){
  cost = 10;
  if (theater.movies[0].isNew){
    cost += 6;
  }
  if(age>65){
    cost -= 1;
  }
  if(parseInt(theater.movies[1]) > 1600){
    cost +=1;
  }
  theater.movies.push("$" + cost);
  console.log(cost)
  printTicket(theater);
}

function printTicket(theater){
  const ticketKeys = Object.keys(theater);
  let ticketString = ""

  ticketKeys.forEach(function(key) {
    ticketString = ticketString.concat(key + ": " + theater[key] + "\n"); 
    let selector = $(".show-time");
    selector.append(ticketString)
});
}
$(document).ready(function() {
  $("form#form-one").submit(function(event) {
    event.preventDefault();
    let theater = new Theater();
    const name = $("#name").val();
    theater.moviesOutNow(name);
    displayShowtimesform(theater);
    attachshowtimeListener(theater);
  });
});