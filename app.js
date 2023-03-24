let connect = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
jsonData = d3.json(connect)

function init(){
    jsonData.then(function(data){
        console.log(data);
        let list_choice = d3.select("#selDataset");
        let choices = data.names;
        let selection;
        choices.forEach((subjectId) => {
            selection = list_choice.append('option');
            selection.text(subjectId);
            selection.property('value', subjectId);
        });
        let valueOne = choices[0];
        bar_plot(valueOne, data)
    });
 };

function optionChanged(value){
    console.log(value)
    jsonData.then(function(data){
        bar_plot(value,data)
    })};

function demoTable(data){
    let demographics = d3.select('#sample-metadata')
    demographics.html("");
    let demo_info = demographics.append()
    Object.entries(data).forEach(([key, type]) => {
        demo_info.append("h6").text(`${key}: ${type}`);
    });
};

function bar_plot(value, data){
    console.log("data is", data.metadata);
    let indication = data.samples.find(sample=> sample.id.toString() === value)
    let information = data.metadata.find(sample=> sample.id.toString() === value)
    barChart(indication)
    bubbleChart(indication)
    demoTable(information)
    console.log(indication)
    console.log(information)
};

function barChart(data){
     let barIds = data.otu_ids;
     let labels = data.otu_labels.slice(0, 10);
     let values = data.sample_values.slice(0,10).reverse();
     let yData = barIds.slice(0,10);
     let yLabels = [];
     yData.forEach(function(ylabel){
         yLabels.push(`OTU ${ylabel.toString()}`);
     });

     let trace1 = {
        x: values,
        y: yLabels.reverse(),
        text: labels,
        type: "bar",
        orientation: "h",
        marker: {color: "rgb(158,202,225)",
                 opacity: 0.6,
        line:{color: "rgb(8,48,107)",
              width: 1.5}
      }
    };

      let layout1 = {title: "<b>Top 10 OTUs</b>",
        autosize: false,
        titlefont: {size: 25}
};

    Plotly.newPlot("bar", [trace1], layout1);
};

function bubbleChart(data){
    let bubbleIds = data.otu_ids;
    let bubbleLabels = data.otu_labels;
    let bubbleValues = data.sample_values;

    let trace2 = {
        x: bubbleIds,
        y: bubbleValues,
        mode: 'markers',
        marker: {size: bubbleValues,
                 color: bubbleIds,
                 colorscale: "YlGnBu"
        }
    };

    let layout2 = {xaxis: {title: "<b>OTU ID</b>"},
    title: "<b>Bubble Chart</b>",
    titlefont: {size: 25}
};
    Plotly.newPlot("bubble", [trace2], layout2);
};

init();