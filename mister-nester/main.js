var codeSamples = [
// Default
{ label: "Identity", code: "d3.nest()\n  .map(data);"},
{ label: "By charge", code: "d3.nest()\n  .key(function(d) { return d.charges; })\n  .map(data);"},
{ label: "Cases by charge", code: "d3.nest()\n  .key(function(d) { return d.charges; })\n  .rollup(function(d) { return d.length; })\n  .map(data);"},
{ label: "Cases by year", code: "var parseTime = d3.timeParse('%d/%m/%Y');\n\nd3.nest()\n  .key(function(d) { return parseTime(d.cs_date_filed).getFullYear(); })\n  .rollup(function(d) { return d.length; })\n  .object(data);"},
{ label: "Cases by year and charge", code: "var parseTime = d3.timeParse('%d/%m/%Y');\n\nd3.nest()\n  .key(function(d) { return parseTime(d.cs_date_filed).getFullYear(); })\n  .key(function(d) { return d.charges; })\n  .rollup(function(d) { return d.length; })\n  .object(data);"},
{ label: "Cases by year (entries)", code: "var parseTime = d3.timeParse('%d/%m/%Y');\n\nd3.nest()\n  .key(function(d) { return parseTime(d.cs_date_filed).getFullYear(); }).sortKeys(d3.ascending)\n  .rollup(function(d) { return d.length; })\n  .entries(data);\n"},
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

d3.text("https://raw.githubusercontent.com/propublica/northern-il-federal-gun-cases/master/processed/federal-gun-cases.csv", function(d) {

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
  if (codeOutput.node().hasChildNodes()) {
    codeOutput.node().removeChild(codeOutput.node().childNodes[0]);
  }
  codeOutput.node().append(renderjson(out));

  //hljs.highlightBlock(codeOutput.node());
}
