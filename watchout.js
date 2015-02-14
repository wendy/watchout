// start slingin' some d3 here.
var width = 800;
var height = 600;

var container = d3.selectAll('body').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style("border", "1px solid black")


// function to fill asteroid data array
var balls = 15;
var generateArray = function (n) {
  var generatedArray = [];
  for (var i = 0; i < n; i++) {
    generatedArray.push(i);
  }
  return generatedArray
}

var imgs = container.selectAll("image")
  .data(generateArray(balls));
  imgs.enter()
  .append("svg:image")
  .attr("class", "enemy")
  .attr("xlink:href", "asteroid.png")
  // .attr("x", function(d){ return d * 30})
  .attr("x", "0")
  .attr("y", "0") // put in circle - sin and cos
  .attr("width", "20")
  .attr("height", "20");

// drag effect for user's circle piece
var drag = d3.behavior.drag()
  .on('dragstart', function () { circle.style('fill', 'pink');})
  .on('drag', function() { circle.attr('cx', d3.event.x)
      .attr('cy', d3.event.y);})
  .on('dragend', function() {circle.style('fill', 'black');});

// declare user's circle piece
var circle = container.selectAll('.draggableCircle')
  .data([{ x: (width/2), y: (height/2), r: 10}])
  .enter()
  .append('svg:circle')
  .attr('class', 'draggableCircle')
  .attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', function(d) {return d.r;})
  .call(drag)
  .style('fill', 'black');


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

var nonCollisions = 0;
var collisions = 0;
var hscore = 0;

setInterval(function() {
  update(imgs);
}, 1000);


setInterval(function() {
  nonCollisions++;
  d3.selectAll('.current').select('span').text(nonCollisions);
  checkCollisions();
}, 100);


var checkCollisions = function(){
  var Cx = circle.attr("cx");
  var Cy = circle.attr("cy");

  for( var i = 0; i < imgs[0].length; i++ ){
    var Ex = imgs[0][i].x.animVal.value + 10;
    var Ey = imgs[0][i].y.animVal.value + 10;
    var distance = Math.sqrt(Math.pow(Cx - Ex, 2) + Math.pow(Cy - Ey, 2));

    if (distance < 20) {
      var highscore = d3.selectAll('.high').select('span');
      var current = d3.selectAll('.current').select('span');
        if( nonCollisions > hscore ) {
          hscore = nonCollisions;
          highscore.text(nonCollisions);
        }
      collisions++;
      d3.selectAll('.collisions').select('span').text(collisions);
      current.text('0');
      nonCollisions = 0;
    }
  }
};
