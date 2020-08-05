'use strict';

// Init variables
let data = [];
let tot_export = 0;
let tot_import = 0;
let tot_dsq = 0;
let tot_production = 0;
let tot_Processing = 0;
let tot_seed = 0;

let stacked_data = [];

let tb_export, tb_import, tb_dsq, tb_production, tb_processing, tb_seed = null;
let bar_elements, bar_items, donut, scatter = null;
let linechart = null;
let stacked_bar, item_stacked_bar = null;

let elements = [];
let element_codes = [];
let items = [];
let values = [];
let year_values = [];
let years = [];

let element_picklist = null;
let item_keys =[];
let item_dict = [];

d3.json('/load_data').then(d => {

    // Redefine
    data = d.nfbs;

    const nest = d3.nest()
        .key(d => d.year)
        .rollup(v => {
            const map = v.map(d => d.value)
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const sum = map.reduce(reducer);
            return sum;
        })
        .entries(data);
    // re-formate string year to digits
    nest.forEach(d => {
        d.key = +d.key
    })

    for(var i = 0; i < data.length; i++) {
        var obj = data[i];


        element_codes.push(obj.element_code);
        elements.push(obj.element);
        items.push(obj.item_code);
        values.push(obj.value);
        years.push(obj.year);

        //sum total numbers for each item type
        var current_item_sums = d3.nest().key(function(d){
            return d.item; })       // *** By Item
        .rollup(function(leaves){
            return d3.sum(leaves, function(d){
                return d.value;
            });
        }).entries(data)
        .map(function(d){
            return { key:d.key, value:d.value};
        });

        var current_domain_sums = d3.nest().key(function(d){
            return d.element; })        // *** By Element
        .rollup(function(leaves){
            return d3.sum(leaves, function(d){
                return d.value;
            });
        }).entries(data)
        .map(function(d){
            return { key:d.key, value:d.value};
        });
    }

    //init default visualizations
    stacked_bar = new StackBar(current_domain_sums,'vis_tb1');
    item_stacked_bar =new StackBarItem(current_item_sums,'vis_tb2');
    linechart = new LineChart(nest, 'Year', 'New Food Balance', 'vis1');

}).catch(err => console.log(err));