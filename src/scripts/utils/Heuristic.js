module.exports = {

  //Manhattan distance.
  manhattan: function(dx, dy) {
      return dx + dy;
  },

  //Euclidean distance.
  euclidean: function(dx, dy) {
      return Math.sqrt(dx * dx + dy * dy);
  },

  //Octile distance.
  octile: function(dx, dy) {
      var F = Math.SQRT2 - 1;
      return (dx < dy) ? F * dx + dy : F * dy + dx;
  },

  //Chebyshev distance.
  chebyshev: function(dx, dy) {
      return Math.max(dx, dy);
  }

};
