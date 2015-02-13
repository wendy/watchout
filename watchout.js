// start slingin' some d3 here.
var width = 800;
var height = 600;

var container = d3.selectAll('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style("border", "1px solid black")


// function to fill asteroid data array
var generateArray = function (n) {
  var generatedArray = [];
  for (var i = 0; i < n; i++) {
    generatedArray.push(i);
  }
  return generatedArray
}

var imgs = container.selectAll("image")
  .data(generateArray(15));
  imgs.enter()
  .append("svg:image")
  .attr("class", "enemy")
  .attr("xlink:href", "asteroid.png")
  .attr("x", function(d){ return d * 30})
  .attr("y", "0") // put in circle - sin and cos
  .attr("width", "20")
  .attr("height", "20");

function update(data) {
/*  var enemies = container.selectAll('imgs')
    .data(data, function(d) { return d; })
*/
  //UPDATE ENEMIES POSITION
  data.transition().duration(1000)
    .attr("x", function(d) { return Math.floor(Math.random() * width);})
    .attr("y", function(d) { return Math.floor(Math.random() * height);})

}
update(imgs);

setInterval(function() {
  update(imgs);
}, 1000)
