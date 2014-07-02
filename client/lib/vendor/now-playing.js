  musesCallback = function(event, param) {
    switch (event) {
    case "volume":
      document.getElementById('ffmp3volume').innerHTML = param;
      break;
    case "buffering":
      document.getElementById('buffering').style.display = "block";
      break;
    case "play":
    case "stop":
    case "ioError":
      document.getElementById('ffmp3status').innerHTML = event;
      document.getElementById('buffering').style.display = "none";
      break;
    case "metadata-json":
      document.getElementById('ffmp3metadatajson').innerHTML = param;
      eval("var metadata=" + param + ";");
      // here you have the metadata object to play with.
      break;
    case "metadata":
      var shortString = "";
      if (param.length > 40) {
        shortString = param.substring(0, 40);
      } else {
        shortString = param;
      }
      var songNTitle = shortString.split("_");
      var song = songNTitle[0];
      var songName = "";
      var songNameFull = "";
      if (typeof song != 'undefined') {
        songName = song.split(/(?=[A-Z])/);
        for (i = 0; i < songName.length; i++) {
          if (typeof songName[i] != 'undefined') {
            songNameFull = songNameFull + " " + songName[i];
          }
        }
      }

      var artist = songNTitle[1];
      var artistName = "";
      var artistNameFull = "";
      if (typeof artist != 'undefined') {
        artistName = artist.split(/(?=[A-Z])/);
        for (i = 0; i < songName.length; i++) {
          if (typeof artistName[i] != 'undefined') {
            artistNameFull = artistNameFull + " " + artistName[i];
          }
        }
      }
      songNameFull = songNameFull.replace(/[^a-zA-Z 0-9]+/g, '');
      artistNameFull = artistNameFull.replace(/[^a-zA-Z 0-9]+/g, '');
      var fullTitle = "";
      if (artistNameFull == "") {
        fullTitle = songNameFull;
      } else {
        fullTitle = songNameFull + " - " + artistNameFull;
      }

      if (typeof fullTitle == 'undefined') {
        fullTitle = shortString;
      }
      document.getElementById('ffmp3parsedmetadata').innerHTML = fullTitle;
      break;
    case "source":
      document.getElementById('ffmp3source').innerHTML = param;
      break;
    case "fallback":
      document.getElementById('ffmp3fallback').innerHTML = param;
      break;
    default:
      break;
    }
  }