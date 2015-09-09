var fs = require('fs');
var cp = require('child_process');


var templateFilename = 'coverletter.tex';
var TEMPLATE = fs.readFileSync(templateFilename).toString();
var resultsDir = 'coverletter_pdfs';
var tmpFileBasename = 'coverletter_TMP';
var tmpFilename = tmpFileBasename + '.tex';
var outputBasename = 'coverletter';

function compile(inst) {
	ensureResultsDir();
	fs.writeFileSync(tmpFilename, preamble(inst) + TEMPLATE);
	try {
		cp.execSync('pdflatex ' + tmpFilename, {stdio: null});
	} catch (e) {
		console.log('Encountered error compiling PDF for institution ' + inst.name + ':');
		console.log(e.message);
		process.exit(1);
	}
	cp.execSync('mv ' + filename(__dirname, tmpFileBasename, '.pdf') + ' ' +
						filename(resultsDir, outputBasename+'_'+inst.name, '.pdf'));
	cp.execSync('rm -f ' + tmpFileBasename+'.*');
}

function filename(directory, basename, extension) {
	return directory + '/' + basename + extension;
}

function ensureResultsDir() {
	if (!fs.existsSync(resultsDir))
		fs.mkdirSync(resultsDir);
}

function preamble(inst) {
	var str = 
		newcommand('University', inst.university) + newline() +
		newcommand('Department', inst.department) + newline() +
		newcommand('Recipient', inst.recipient) + newline() + 
		newcommand('Address', inst.address.join('\\\\')) + newline();
	return str;
}

function newline() { return '\n'; }

function newcommand(name, stringvalue) {
	return '\\newcommand{\\' + name + '}{' + stringvalue + '}';
}

// -------------------------------------------------------------------

[
	{
		name: 'test1',
		university: 'University',
		department: 'Department',
		recipient: 'Faculty Search Committee',
		address: ['123 Pleasant Lane', 'City, State 12345']
	},
	{
		name: 'test2',
		university: 'Institute',
		department: 'School',
		recipient: 'CS Faculty Search Committee',
		address: ['456 Exquisite Drive', 'City, State 67890']
	}
].forEach(compile);