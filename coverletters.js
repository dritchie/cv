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
		name: 'princeton',
		university: 'Princeton University',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['35 Olden Street', 'Princeton, NJ 08540-5233']
	},
	{
		name: 'ucsb',
		university: 'University of California, Santa Barbara',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['2104 Harold Frank Hall', 'Santa Barbara, CA 93106-5110']
	},
	{
		name: 'georgia_tech',
		university: 'Georgia Institute of Technology',
		department: 'School of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['Klaus Advanced Computing Building', '266 Ferst Drive', 'Atlanta, GA 30332-0765']
	},
	{
		name: 'cornell',
		university: 'Cornell University',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['402 Gates Hall', 'Ithaca, NY 14853-7501']
	},
	{
		name: 'virginia_tech',
		university: 'Virginia Polytechnic Institute and State University',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['114 McBryde Hall', '225 Stanger Street', 'Blacksburg, VA 24061']
	}
].forEach(compile);


