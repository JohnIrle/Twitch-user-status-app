$(document).ready(function() {

  var streamers = ["ESL_SC2", "brunofin", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];

  function statusBox(element, index, array) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + element + '?client_id=a8uhmph19al46n4gcyujk2ynas21hz0&callback=?', function(data) {

      var status;

      if (data.status === 404) {
        status = "not-found"
      } else if (data.stream === null) {
        status = "offline";
      } else {
        status = "online";
      };

      $.getJSON('https://api.twitch.tv/kraken/channels/' + element + '?client_id=a8uhmph19al46n4gcyujk2ynas21hz0&callback=?', function(data) {
        console.log(data);
        var logo = data.logo,
          name = data.display_name,
          game = data.game,
          url = data.url,
          desc = data.status;

        if (status === "offline") {
          $('.media-container').append('<div class="media offline"><a class="media-left" href="' + url + '"><img class="logo" src="' + logo + '"/></a><div class="media-body"><a href="' + url + '" target="_blank"><h4 class="media-heading">' + name + '</h4></a>' + "Offline" + '</div></div>');
        } else if (status === "online") {
          $('.media-container').prepend('<div class="media online"><a class="media-left" href="' + url + '" target="_blank"><img class="logo" src="' + logo + '"/></a><div class="media-body"><a href="' + url + '"><h4 class="media-heading">' + name + '</h4></a>' + game + ': ' + desc + '</div></div>');
        } else if (status === "not-found") {
          $('.media-container').append('<div class="media offline"><a class="media-left" href="' + url + '" target="_blank"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></a><div class="media-body"><h4 class="media-heading">' + element + '</h4>Account closed</div></div>');
        }
      });
    })
  }
  streamers.forEach(statusBox);
});
