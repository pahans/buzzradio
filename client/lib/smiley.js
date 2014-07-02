SimpleSmiley = function(text) {
  var emoticons = {
    ':-)': 'smiley.png',
    ':)': 'smiley.png',
    ':D': 'smiley-grin.png',
    ':-D': 'smiley-grin.png',
    ':-(': 'smiley-sad.png',
    ':(': 'smiley-sad.png',
    ':\'(': 'smiley-cry.png',
    ':-O': 'smiley-surprise.png',
    ':O': 'smiley-surprise.png',
    ';)': 'smiley-wink.png',
    ';-)': 'smiley-wink.png',
    'B)': 'smiley-cool.png',
    'B-)': 'smiley-cool.png',
    'x-(': 'smiley-cool.png',
    ':-P': 'smiley-razz.png',
    ':P': 'smiley-razz.png'
  };

  var url = "emoticon/";
  var patterns = [];
  var metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

  // build a regex pattern for each defined property
  for (var i in emoticons) {
    if (emoticons.hasOwnProperty(i)) { // escape metacharacters
      patterns.push('(' + i.replace(metachars, "\\$&") + ')');
    }
  }

  // build the regular expression and replace
  return text
    .replace(
      new RegExp(patterns.join('|'), 'g'),
      function(match) {
        return typeof emoticons[match] != 'undefined' ? '<img src="' + url + emoticons[match] + '"/>' : match;
      });
}