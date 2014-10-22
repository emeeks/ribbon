// Craig's functions ///////////////////////////////////////////////////////////////////

//////////////////////////////
//
// getJrpid -- return the JRP ID# for the work which should be displayed.
//

var cgiinit = -1;
function getJrpid() {
	var CgiParameters;
	cgiinit++;
	CgiParameters = getCgiParameters();
   if (cgiinit > 0) {
		return localStorage.RIBBONjrpid;
   }

	if (localStorage.RIBBONjrpid === "undefined") {
		localStorage.removeItem("RIBBONjrpid");
	}

	if (typeof CgiParameters['id'] !== "undefined") {
		localStorage.RIBBONjrpid = CgiParameters['id'];
	} else {
		if (typeof localStorage.RIBBONjrpid === 'undefined') {
			localStorage.RIBBONjrpid = "Jos2721";
		}
		if (localStorage.RIBBONjrpid === "undefined") {
			localStorage.RIBBONjrpid = "Jos2721";
		}
	}
	return localStorage.RIBBONjrpid;
}



//////////////////////////////
//
// keydown Event listener
//

window.addEventListener('keydown', function(event) {

	switch (event.keyCode) {

		case LeftArrowKey:
			if (event.shiftKey) {
				if (event.ctrlKey) {
					displayPreviousRepertoryRibbon();
				} else {
					displayPreviousWorkRibbon();
				}
			}
			break;

		case RightArrowKey:
			if (event.shiftKey) {
				if (event.ctrlKey) {
					displayNextRepertoryRibbon();
				} else {
					displayNextWorkRibbon();
				}
			}
			break;
	}

}, false);



//////////////////////////////
//
// displayPreviousRepertoryRibbon --
//

function displayPreviousRepertoryRibbon() {
	var i;
	SECTIONS = [];
	if ((localStorage.RIBBONjrpid == null) || (localStorage.RIBBONjrpid == "")) {
		localStorage.RIBBONjrpid = "Jos2721";
	}
	initializeWorklist();
	var pieces = localStorage.RIBBONjrpid.match(/^([A-Z][a-z][a-z])/);
	if (pieces == null) {
		return;
	}
	var repertory = pieces[1];
	
	for (i=0; i<WORKLIST.length; i++) {
		if (repertory.match(WORKLIST[i].repid)) {
			if (i == 0) {
				localStorage.RIBBONjrpid = WORKLIST[WORKLIST.length-1].works[0].id;
			} else {
				localStorage.RIBBONjrpid = WORKLIST[i-1].works[0].id;
			}
			ribbonTest1(1, 1, 'standardDeviation', 'vizcontainer');
			return false;
		}
	}
}



//////////////////////////////
//
// displayNextRepertoryRibbon --
//

function displayNextRepertoryRibbon() {
	var i;
	initializeWorklist();
	SECTIONS = [];
	var pieces = localStorage.RIBBONjrpid.match(/^([A-Z][a-z][a-z])/);
	var repertory = pieces[1];
	
	for (i=0; i<WORKLIST.length; i++) {
		if (repertory.match(WORKLIST[i].repid)) {
			if (i == WORKLIST.length - 1) {
				localStorage.RIBBONjrpid = WORKLIST[0].works[0].id;
			} else {
				localStorage.RIBBONjrpid = WORKLIST[i+1].works[0].id;
			}
			ribbonTest1(1, 1, 'standardDeviation', 'vizcontainer');
			return;
		}
	}
}



//////////////////////////////
//
// displayNextWorkRibbon --
//

function displayNextWorkRibbon() {
	initializeWorklistFlat();
   SECTIONS = [];
	var entry;
	var nextone = 0;
	var first;
   var base = localStorage.RIBBONjrpid.match(/^([A-Z][a-z][a-z][\d.]+)/)[1];

	for (entry in WORKLISTjrpid) {
		if (!WORKLISTjrpid.hasOwnProperty(entry)) {
			continue;
		}
		if (typeof first === 'undefined') {
			first = entry;
		}
		if (nextone > 0) {
			localStorage.RIBBONjrpid = entry;
			ribbonTest1(1, 1, 'standardDeviation', 'vizcontainer');
			return false;
		}
		if (entry.match(localStorage.RIBBONjrpid)) {
			nextone = 1;
		} else if (entry.match(base)) {
			nextone = 1;
		}
	}

	if (typeof first !== 'undefined') {
		localStorage.RIBBONjrpid = first;
		ribbonTest1(1, 1, 'standardDeviation', 'vizcontainer');
		return false;
	}
}



//////////////////////////////
//
// displayPreviousWorkRibbon --
//

function displayPreviousWorkRibbon() {
	initializeWorklistFlat();
   SECTIONS = [];
	var entry;
	var lastentry;
   var base = localStorage.RIBBONjrpid.match(/^([A-Z][a-z][a-z][\d.]+)/)[1];

	for (entry in WORKLISTjrpid) {
		if (!WORKLISTjrpid.hasOwnProperty(entry)) {
			continue;
		}
		if (entry.match(localStorage.RIBBONjrpid) || entry.match(base)) {
 			if (typeof lastentry !== 'undefined') {
				localStorage.RIBBONjrpid = lastentry;
			} else {
				localStorage.RIBBONjrpid = WORKLIST[WORKLIST.length-1]
					.works[WORKLIST[WORKLIST.length-1].works.length-1].id;
			}
			ribbonTest1(1, 1, 'standardDeviation', 'vizcontainer');
			return false;
		}
		lastentry = entry;
	}
}



//////////////////////////////
//
// displayWorkInfo --
//

function displayWorkInfo(tagid, jrpid) {
	var infoelement = document.getElementById(tagid);
   infoelement.style.marginTop = "-8px";
	if (!infoelement) { return; }
   initializeWorklistFlat();
	var entry = WORKLISTjrpid[jrpid];
	if (!entry) { return; }
	var composer = entry.comshort;
	var title = entry.title;
	var stitle = entry.stitle;
   var info = composer + ", " + title;
   if (stitle) {
		info += " " + stitle;
	}
	info += " (" + jrpid + ")";
	infoelement.innerHTML = info;
}


<!-- vim: set ts=3: -->
