// start slingin' some d3 here.

var container = d3.selectAll('body').append('svg')
  .attr('width', 800)
  .attr('height', 600)
  .style("border", "1px solid black")

var imgs = container.selectAll("image").data([0,1,2,3,4,5,6,7,8,9]);
  imgs.enter()
  .append("svg:image")
  .attr("class", "enemy")
  .attr("xlink:href", "asteroid.png")
  .attr("x", function(d){ return d * 30})
  .attr("y", "0") // put in circle - sin and cos
  .attr("width", "20")
  .attr("height", "20");
