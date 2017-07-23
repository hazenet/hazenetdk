function getRandomNumber() {
    return  Math.round(Math.random() * (10000000000 - 1000000000) + 1000000000);
}

var sponsor_1_random = getRandomNumber();
var sponsor_1_link = document.getElementById("sponsor_1_link");
var sponsor_1_image = document.getElementById("sponsor_1_image");


sponsor_1_link.setAttribute("HREF","https://ad.doubleclick.net/ddm/jump/N410401.2601504HAZENET.DK/B10464038.144424976;sz=300x250;ord="+sponsor_1_random+"?");
sponsor_1_image.setAttribute("SRC","https://ad.doubleclick.net/ddm/ad/N410401.2601504HAZENET.DK/B10464038.144424976;sz=300x250;ord="+sponsor_1_random+";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?");

/*
var sponsor_2_random = getRandomNumber();
var sponsor_2_link = document.getElementById("sponsor_2_link");
var sponsor_2_image = document.getElementById("sponsor_2_image");

sponsor_2_link.setAttribute("HREF","https://ad.doubleclick.net/ddm/jump/N410401.2601504HAZENET.DK/B10464038.144424976;sz=300x250;ord="+sponsor_2_random+"?");
sponsor_2_image.setAttribute("SRC","https://ad.doubleclick.net/ddm/ad/N410401.2601504HAZENET.DK/B10464038.144424976;sz=300x250;ord="+sponsor_2_random+";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?");
*/