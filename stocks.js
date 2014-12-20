// Marcus Yeagle 12/20/14 -- https://github.com/marcus-yeagle
//
// This script is written is Node.js and uses the 'yahoo-finance' API
//
// Users should be able to enter a valid stock ticker, and the current price
// and the last percent change should be displayed.
// Formatting using 'colors' and 'util' 
//
// Special thanks to Pilwon Huh https://github.com/pilwon/node-yahoo-finance

require('colors');
var util = require('util');
var _ = require('lodash');
var prompt = require('prompt');
var yahooFinance = require('yahoo-finance');

var FIELDS = _.flatten([
  // Pricing
  ['a', 'b', 'b2', 'b3', 'p', 'o'],
  // Dividends
  ['y', 'd', 'r1', 'q'],
  // Date
  ['c1', 'c', 'c6', 'k2', 'p2', 'd1', 'd2', 't1'],
  // Averages
  ['c8', 'c3', 'g', 'h', 'k1', 'l', 'l1', 't8', 'm5', 'm6', 'm7', 'm8', 'm3', 'm4'],
  // Misc
  ['w1', 'w4', 'p1', 'm', 'm2', 'g1', 'g3', 'g4', 'g5', 'g6'],
  // 52 Week Pricing
  ['k', 'j', 'j5', 'k4', 'j6', 'k5', 'w'],
  // System Info
  ['i', 'j1', 'j3', 'f6', 'n', 'n4', 's1', 'x', 'j2'],
  // Volume
  ['v', 'a5', 'b6', 'k3', 'a2'],
  // Ratio
  ['e', 'e7', 'e8', 'e9', 'b4', 'j4', 'p5', 'p6', 'r', 'r2', 'r5', 'r6', 'r7', 's7'],
  // Misc
  ['t7', 't6', 'i5', 'l2', 'l3', 'v1', 'v7', 's6', 'e1']
]);

var message = "Please enter a valid stock symbol below";
var SYMBOL = "";
console.log(util.format('=== %s ===', message).cyan);

// begins the prompt
prompt.start();

// Gets ticker property from the user 
prompt.get('ticker', function(err, result){

  // Parses result JSON to stirng in SYMBOL var
  SYMBOL = JSON.stringify(result.ticker);

  yahooFinance.snapshot({
  fields: FIELDS,
  symbol: SYMBOL
  }, function (err, snapshot) {
    console.log(util.format('*** %s ***', SYMBOL).yellow);

    // Add any error handling here..
    if (err) { throw err; }

    // Parses result JSON to stirng in SYMBOL var
    var change = JSON.stringify(snapshot.changeRealtime, null, 2);

    // Conditional to determine color based on change, then ouput.
    if (change > 0){
    console.log(util.format('Change- %', snapshot.changeRealtime).green);
    console.log('Price-- $' + snapshot.lastTradePriceOnly);
    } else { 
    console.log(util.format('Change- %', snapshot.changeRealtime).red);
    console.log('Price-- $' + snapshot.lastTradePriceOnly);
    }
  });
});