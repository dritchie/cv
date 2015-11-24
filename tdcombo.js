// Combine teaching and diversity statements into one PDF

var util = require('util');

// Supposedly, this is available on all modern OSX installations.
var script = '\"/System/Library/Automator/Combine PDF Pages.action/Contents/Resources/join.py\"';
var outfile = 'teaching_diversity.pdf';
var teachfile = 'teaching.pdf';
var divfile = 'diversity.pdf';
require('child_process').execSync(util.format('%s -o %s %s %s',
	script, outfile, teachfile, divfile
));