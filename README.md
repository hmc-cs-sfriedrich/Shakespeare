# Overview
Welcome to the Shakespeare Text Analysis repository. The purpose of this web application is to make the lives of Shakespeare enthusiasts, performers, scholars, etc. a bit easier by automating tasks that relate to "zoomed-in" textual and linguistic features. Our sister website is <a href="https://github.com/janehwu/shakespeare">Visualizing Shakespeare</a> which focuses on the higher level details such as character heat maps and various timelines that span entire plays.

Our application is written in Angular 2 with Typescript and runs off an npm server. We built our project starting with <a href="https://angular.io/docs/ts/latest/guide/setup.html">Angular's Quickstart Tutorial</a> (Unfortunately, between the beginning and end of the Fall 2016 semester when this project was first being worked on, Angular changed around their tutorial a bit. It's very similar to what it was previously but has a few files moved/changed around. On the bright side, quickstart now comes with both unit/integration tests and end-to-end tests!).  We have followed other Angular 2 tutorials to build up our infrastructure on top of quickstart.

# Features
We currently allow a user to select between plays, navigate scenes, view syllable counts, view scansion, and make the vowels or consonants stand out.

# A Necessary Resource
It turns out that there aren't any good free resources out there for general purpose syllable-counting and scansion, so for these features, we needed to find a resource in which someone went in and manually annotated the text. This is what we found with <a href="http://www.shakespearescanned.com/shakespeare.html">Shakespeare Scanned</a>, which provides Shakespeare's texts marked up with scansion notation (represented by bold fonts, italics, slashes, and other symbols) in PDF format. What's beautiful about this is that since Shakespeare verse is written such that syllables come in groups of two, alternating accented and non-accented, counting the number of "scansion marks", so to speak, per line will give us syllable counts per line.

Now you must be thinking, how are we going to parse a PDF? Well it turns out that if we use Word to convert the PDF to word, Python has a pretty helpful library called <a hrerf="https://python-docx.readthedocs.io/en/latest/">python-docx</a>, which can parse a word document and can differentiate sections of a word document with different text styles, which means that it can pick up on the scansion notation of a Shakespeare-Scanned play!

While this is awesome in concept, in practice it turned out to be very difficult to extract the data accurately. First, there is a lot of extra markup throughout the document, so in parsing, one must be extremely careful to disregard these. Second, some symbols were lost in the PDF to Word conversion (fortunately, very few). And third, Shakespeare-Scanned uses highly indented margins and word wrap rather than line breaks to display characters' lines in the Word document. This is an issue because the python-docx library doesn't detect word-wrap, so it looks like there are very long lines in the play, whereas these are really just multiple lines being concatenated together. To say it another way, the Word document doesn't use newline characters to visually display newlines within a speech, so really an entire speech may be represented by a single line of text (a block of text followed by a newline character).

We suggest to the next team that picks up this project to continue to use Shakespeare-Scanned to get scansion and syllable-count data (so long as there doesn't appear a good way to do these tasks in a general-purpose manner, i.e. count syllables and perform scansion on an arbitrary block of text), but to also use a different resource (e.g. <a href="https://www.ibiblio.org/xml/examples/shakespeare/">IBibilio</a>) for the structure of the text. One solution to outputting a Shakespeare play in an accurate and feature-complete way on this website would be to simultaneously parse Shakespeare-Scanned and IBibilio, resolving any textual differences (we took a quick look at the beginning of <i>Macbeth</i> and there seemed to be very little), and output the resulting data as JSON, in the same way as we're doing now. Read the section with header "Pipeline" to learn more about what the JSON is all about.

# Pipeline
Here's what happens from PDF to web display! 

First, we convert the PDF to Word simply by opening up the PDF in Word (from our investigation, this seemed to be by far the best and most reliable tool). 

Then, we wrote a python script using the python-docx library to format the text, scansion data, syllables counts, line numbers, and other relevant play data into a hierarchical, nested json format. The script is intended to be general-purpose for any play on Shakespeare-Scanned, but since it was developed by experimenting on Macbeth, it works the best on Macbeth. Hopefully and we believe probably, there would be little modification needed to get a similar quality json output for the rest of the plays of the website, since they're very similarly formatted.

When our website loads, our main Angular Component makes a call to load in the json for the selected play (by default it loads Macbeth). We then iterate through the currently selected act and scene (by default, it's Act I, Scene I) to display the text and associated data.

# How to get the project running
1. Clone this project
2. Install node (if not already installed)
3. In the highest level project directory, run the command "npm install"
    I. If there are errors, we have found that changing around some of the versioning in package.json may resolve issues.
4. Then, check to see if the typings/ folder appeared. If not, run "npm run typings install"
5. Then run "npm start". The website should open in a browser.
	I. All of us at some point encountered very frustrating npm errors. Since Angular 2 is just out of Beta (as of Fall 2016), some are harder to resolve than others. Here are two things that seemed to solve many of the problems we were getting:
        i. In package.json, truncate the value of "start" to "concurrently \"npm run tsc:w\" \"npm run lite\" ".
		ii. Change around some of the versioning in package.json
