# Motivation
Scholars and actors use various techniques to explore Shakespeare’s plays. From word-level analysis to overarching themes and relationships, studying these concepts can lead to a greater understanding of the characters and overall play. Our team focused on analyzing the linguistic properties of the text, while our counterpart, the <a href="https://github.com/janehwu/shakespeare">Visualizing Shakespeare</a> team, focused on analyzing the overarching structure and relationships in the plays. Both teams’ work helps users discover insights about Shakespeare’s plays. 

Shakespeare’s text is rife with linguistic subtleties; when analyzed, these subtleties can provide insights into the play and specific characters. For example, Shakespeare’s verse is usually written in iambic pentameter, which means the text has a special beat or lilt to it. The lines of text are split into iambs, which in poetry is an unstressed syllable followed by a stressed syllable. “Pentameter” indicates there are five iambs to a line, or ten syllables. This is the default way a character speaks in Shakespeare’s plays. If a character deviates from iambic pentameter, even for just a line, it could indicate something special about that line. For example, the character might be lying. Thus, counting syllables in each line and annotating stressed and unstressed syllables (also known as scansion) are the first steps an actor might take when analyzing a scene. An example of scansion can be found in Figure 3 located in the Functionality section.

Other linguistic properties that can be extracted from Shakespeare’s texts include whether a given section is verse or prose, whether the consonant sounds in a passage are hard or soft, or what parts of the mouth are used for the vowels in a passage of text. The work involved in annotating the text by hand to extract linguistic properties is very tedious, so in our web application, we sought to automate the process, making it easier for students, performers, and others to glean insights. In the future, this application may be used by the students in the client’s Shakespeare course, LIT 110 at Harvey Mudd College.

# Overview
Our application is written in <a href="https://angular.io/docs/ts/latest/">Angular 2 with Typescript</a> and runs off an npm server. We built our project starting with <a href="https://angular.io/docs/ts/latest/guide/setup.html">Angular's Quickstart Tutorial</a>. Sometime between the beginning and end of the Fall 2016 semester when this project was first being worked on, Angular changed around their tutorial a bit (the link routes to the <i>new</i> tutorial). It's very similar to what it was previously but a few files have been moved/changed around. On the bright side, quickstart now comes with both unit/integration tests and end-to-end tests free of charge (except maintance)!  We have followed other Angular 2 tutorials to build up our infrastructure on top of quickstart. For example, for loading in JSON files with Angular 2 and Typescript, we used <a href="https://scotch.io/tutorials/angular-2-http-requests-with-observables">this tutorial</a> and for understanding the general features and capabilities, we used the <a href="https://angular.io/docs/ts/latest/tutorial/">Tour of Heroes</a> tutorial.

# Features
We currently allow a user to select between plays, navigate between scenes, view syllable counts, view scansion, and make the vowels or consonants stand out.

# Our Main Resource
It turns out that there aren't any good free resources out there for general purpose syllable-counting and scansion, so for these features, we needed to find a resource in which someone went in and manually annotated the text. This is what we found with <a href="http://www.shakespearescanned.com/shakespeare.html">Shakespeare Scanned</a>, which provides Shakespeare's texts marked up with scansion notation (represented by bold fonts, italics, slashes, and other symbols) in PDF format. What's beautiful about this is that since Shakespeare verse is written such that syllables come in groups of two, alternating accented and non-accented, counting the number of scansion marks per line will give us syllable counts per line.

Now you must be thinking, how are we going to parse a PDF? Well it turns out that if we convert the PDF to Word, Python has a pretty helpful library called <a hrerf="https://python-docx.readthedocs.io/en/latest/">python-docx</a>, which can parse a Word document and can differentiate sections of a Word document with different text styles, which means that it can pick up on the scansion notation of a Shakespeare-Scanned play!

While this is awesome in concept, in practice it turned out to be very difficult to extract the data accurately. First, there is a lot of extra markup throughout the document, and it can be difficult to systematically know what is relevant and what should be discarded. Second, some symbols were lost in the PDF to Word conversion (fortunately, very few). And third, Shakespeare-Scanned uses highly indented margins and word wrap rather than line breaks to display characters' lines in the Word document. This is an issue because the python-docx library doesn't detect word-wrap, so what is reads in are multiple lines at a time rather than just one. To say it another way, the Word document doesn't use newline characters to visually display newlines within a speech, so really an entire speech may be represented by a single line of text with very nicely placed word-wrap (a block of text followed by a newline character).

Currently, in order to show a proof-of-concept that given good data, our website works as expected, we added '$' tokens where each newline character would be. In the parsing process, we split blocks of text at '$'s into separate lines. Since this is a tedious manual process, we only did this for Macbeth Act I, Scenes I, II, and III, so if you want to see an ideal display, check out those scenes!

We suggest to the next team that picks up this project to continue to use Shakespeare-Scanned to get scansion and syllable-count data (so long as there doesn't appear a good way to do these tasks in a general-purpose manner, i.e. count syllables and perform scansion on an arbitrary block of text), but to also use a different resource (e.g. <a href="https://www.ibiblio.org/xml/examples/shakespeare/">IBibilio</a>) for the structure of the text. One solution to outputting a Shakespeare play in an accurate and feature-complete way on this website would be to simultaneously parse Shakespeare-Scanned and IBibilio, resolving any textual differences (we took a quick look at the beginning of <i>Macbeth</i> and there seemed to be very little), and output the resulting data as JSON, in the same way as we're doing now. Read the section with header "Pipeline" to learn more about what the JSON is all about.

# Architectural Pipeline
Here's what happens from PDF to web display! 

First, we convert the PDF to Word simply by opening up the PDF in Word (from our investigation, this seemed to be by far the best and most reliable tool). 

Then, we wrote a python script using the python-docx library to format the text, scansion data, syllables counts, line numbers, and other relevant play data into a hierarchical, nested json format. The script is intended to be general-purpose for any play on Shakespeare-Scanned, but since it was developed by experimenting on Macbeth, it works the best on Macbeth. Hopefully and we believe probably, there would be little modification needed to get a similar quality json output for the rest of the plays of the website, since they're very similarly formatted.

When our website loads, our main Angular Component makes a call to load in the json for the selected play (by default it loads Macbeth). We then iterate through the currently selected act and scene (by default, it's Act I, Scene I) to display the text and associated data.

# Future Work
Some possibilities for future work include:
 * Shakespearean word definitions (See Alexander Schmidt's <a href="http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.03.0079">Shakespeare Lexicon</a>)
 * IPA markup
 * Place of articulation

# How to get the project running
1. Clone this project
2. <a href="https://nodejs.org/en/download/">Install node</a> (if not already installed)
3. In the highest level project directory, run the command "npm install"
 1. If there are errors, we have found that changing around some of the versioning in package.json may resolve issues.
4. Then, check to see if the typings/ folder appeared. If not, run "npm run typings install"
5. Then run "npm start". The website should open in a browser.
 1. All of us at some point encountered very frustrating npm errors. Since Angular 2 is just out of Beta (as of Fall 2016), some are harder to resolve than others. Here are two things that seemed to solve many of the problems we were getting:
   1. In package.json, truncate the value of "start" to "concurrently \"npm run tsc:w\" \"npm run lite\" ".
    2. Change around some of the versioning in package.json
