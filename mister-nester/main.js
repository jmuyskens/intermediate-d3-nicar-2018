var codeSamples = [
// Default
{ label: "Identity", code: "d3.nest()\n  .map(data);"},
{ label: "By country", code: "d3.nest()\n  .key(function(d) { return d.LOCATION; })\n  .map(data);"},
{ label: "By year", code: "d3.nest()\n  .key(function(d) { return d.TIME; })\n  .map(data);"},
{ label: "Number of countries by year", code: "d3.nest()\n  .key(function(d) { return d.TIME; })\n  .rollup(function(d) { return d.length; })\n  .map(data);"},
{ label: "By country (entries)", code: "d3.nest()\n  .key(function(d) { return d.LOCATION; })\n  .entries(data);"},
];

var html = d3.select("#converter");

var left = html.append("div")
    .classed("left", true);

var input = left.append("div")
    .classed("input", true);

input.append("h3")
    .text("Input CSV or TSV");

input.append("textarea");

var code = left.append("div")
    .classed("code", true);

var snippets = code.append("div")
    .classed("snippets", true);

snippets.selectAll("snippet")
    .data(codeSamples)
  .enter().append("a")
    .classed("snippet", true)
    .text(function(d) { return d.label; })
    .attr("href", "#")
    .on("click", function(d) {
      d3.event.preventDefault();
      code.select("textarea")
          .property("value", d.code);
      update();
    });

code.append("h3")
    .text("Code");

code.append("textarea");

var right = html.append("div")
    .classed("right", true);

var output = right.append("div")
    .classed("output", true);

output.append("button")
    .text("Update Output")
    .on("click", update);

var codeOutput = output.append("pre");

codeOutput.append("code");

d3.text("/data/oecd.csv", function(d) {

    input.select("textarea")
        .property("value", d);

    code.select("textarea")
        .property("value", codeSamples[0].code);

    update();
});

function update() {
  var t = input.select("textarea")
      .property("value");

  var c = code.select("textarea")
      .property("value");

  var data = (t.indexOf("\t") < 0 ? d3.csvParse : d3.tsvParse)(t);

  var out = eval(c);
  renderjson.set_show_to_level(1);
  /*if (codeOutput.node().hasChildNodes()) {
    codeOutput.node().removeChild(codeOutput.node().childNodes[0]);
  }*/
  //codeOutput.node().append(renderjson(out));
  codeOutput.text(JSON.stringify(out, null, 4));
  hljs.highlightBlock(codeOutput.node());
}
