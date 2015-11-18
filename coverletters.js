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
		department: 'School of Interactive Computing',
		recipient: 'Faculty Search Committee',
		address: ['Tech Square Research Building', '85 Fifth Street NW', 'Atlanta, GA 30308']
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
	},
	{
		name: 'ucla',
		university: 'University of California, Los Angeles',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['4732 Boelter Hall', 'Box 951596', 'Los Angeles, CA 90095-1596']
	},
	{
		name: 'ucsc',
		university: 'University of California, Santa Cruz',
		department: 'Computational Media Department',
		recipient: 'Faculty Search Committee',
		address: []
	},
	{
		name: 'uiuc',
		university: 'University of Illinois at Urbana-Champaign',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['201 North Goodwin Avenue', 'Urbana, IL 61801-2302']
	},
	{
		name: 'yale',
		university: 'Yale University',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['51 Prospect Street', 'New Haven, CT 06511-8937']
	},
	{
		name: 'berkeley',
		university: 'University of California, Berkeley',
		department: 'Department of Electrical Engineering and Computer Sciences\\\\Computer Science Division',
		recipient: 'Faculty Search Committee',
		address: ['387 Soda Hall', 'Berkeley, CA 94720-1776']
	},
	{
		name: 'irvine',
		university: 'University of California, Irvine',
		department: 'Donald Bren School of Information and Computer Sciences',
		recipient: 'Faculty Search Committee',
		address: ['6210 Donald Bren Hall', 'Irvine, CA 92697-3425']
	},
	{
		name: 'cmu',
		university: 'Carnegie Mellon University',
		department: 'School of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['5000 Forbes Avenue', 'Pittsburgh, PA 15213']
	},
	{
		name: 'tamu',
		university: 'Texas A\\&M University',
		department: 'Department of Computer Science and Engineering',
		recipient: 'Faculty Search Committee',
		address: ['301 Harvey R Bright Building', 'College Station, TX 77843-3112']
	},
	{
		name: 'brown',
		university: 'Brown University',
		department: 'Computer Science Department',
		recipient: 'Faculty Search Committee',
		address: ['115 Waterman Street, 4th floor', 'Providence, RI 02912-1910']
	},
	{
		name: 'maryland',
		university: 'University of Maryland',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['A.V. Williams Building', 'College Park, MD 20742']
	},
	{
		name: 'harvard',
		university: 'Harvard University',
		department: 'School of Engineering and Applied Sciences',
		recipient: 'Computer Science Faculty Search Committee',
		address: ['29 Oxford Street', 'Cambridge, MA 02138']
	},
	{
		name: 'toronto',
		university: 'University of Toronto',
		department: 'Department of Computer Science',
		recipient: 'Faculty Search Committee',
		address: ['Sandford Fleming Building', '10 King’s College Road, Room 3302', 'Toronto, Ontario M5S 3G4']
	},
	{
		name: 'ucsd',
		university: 'University of California, San Diego',
		department: 'Department of Computer Science and Engineering',
		recipient: 'Faculty Search Committee',
		address: ['9500 Gilman Drive', 'La Jolla, CA 92093-0404']
	}
].forEach(compile);


