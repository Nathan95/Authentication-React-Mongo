module.exports = function(app){
  //req = incoming http request
  // res = represents response
  //next = error handling
  app.get('/', function(req, res, next) {
    res.send(['waterbottle', 'phone', 'paper'])
  });
}
