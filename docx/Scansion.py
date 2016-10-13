import docx

# Key for tags
# <s> = speaker
# <d> = directions
# <u> = unaccented
# <a> = accented
# <t> = act
# <c> = scene
# <b> = space

Act = 'Act'
Scene = 'Scene'
act = 'act'
scene = 'scene'
number = 'number'
tab = ' ' * 4
lineBreak = '\n'
quote = '"'
colon = ': '
comma = ','
openBracket = '{'
closeBracket = '}'

def pr(x):
    print x

def writeLine(output, numTabs, text):
    if openBracket in text:
        numTabs += 1
    if closeBracket in text:
        numTabs -= 1
    output.write(numTabs * tab + text + lineBreak)
    return numTabs

def writeMultiLineField(output, numTabs, field):
    text = quote + field + quote + colon + openBracket
    numTabs = writeLine(output, numTabs, text)
    return numTabs

def writeSingleLineField(output, numTabs, field, value, isLast):
    text = quote + field + quote + colon + quote + value + quote
    if isLast:
        text += comma
    numTabs = writeLine(output, numTabs, text)
    return numTabs

def main():
    output = open('sh-mac-txt-scansion.txt', 'w+')
    doc = docx.Document('sh-mac-txt.docx')
    
    mystr = ""
    for run in doc.paragraphs[1].runs:
        print (run.text + ": " + str(run.font.name))
        mystr += run.text
    print (mystr)
    
    # Find where Act 1 begins
    firstLine = 0
    foundFirstLine = False
    while not foundFirstLine:
        runs = doc.paragraphs[firstLine].runs
        if len(runs) == 0:
            firstLine += 1
            continue
        if runs[0].text == 'Act I':
            foundFirstLine = True
            continue
        firstLine += 1
        
    # Number of times to indent for each line of output
    numTabs = 0
    # Current act #
    numAct = 1
    # Current Scene #
    numScene = 1
      
    # Start writing beginning of file
    numTabs = writeLine(output, numTabs, openBracket)
    
    text = quote + 'play' + quote + colon + openBracket
    numTabs = writeLine(output, numTabs, text)
    
    title = doc.paragraphs[1].runs[0].text
    text = quote + 'title' + quote + colon + quote + title + quote + comma
    numTabs = writeLine(output, numTabs, text)

      
    searchColl = True
    
    for i in range(firstLine, len(doc.paragraphs)):
        runs = doc.paragraphs[i].runs
        if len(runs) == 0:
            continue
        if len(runs) > 1:
            # skip page headers
            if runs[1].font == 'Bernard MT Condensed':
                continue
            # skip footnotes
            if runs[0].font == 'None' and runs[1].font == 'None':
                continue
            # First line of new speech case
            # if the second, third, or fourth run in a line is a tab, that means
            # a new character is speaking. Thus, the first run must be the
            # character's name.
            if runs[1].text == '\t':
                output.write('<s>' + runs[0].text.encode('utf-8') + '</s> ')
                start = 2
            elif len(runs) > 2 and runs[2].text == '\t':
                output.write('<s>' + runs[0].text.encode('utf-8') +
                         runs[1].text.encode('utf-8') + '</s> ')
                start = 3
            elif len(runs) > 3 and runs[3].text == '\t':
                output.write('<s>' + runs[0].text.encode('utf-8') +
                         runs[1].text.encode('utf-8') + 
                         runs[2].text.encode('utf-8') + '</s> ')
                start = 4
            # Also skips footnotes, do this after tab just in cases of character
            # names like '1 witch'
            elif runs[0].text.isdigit():
                continue
            # Stage directions case
            elif runs[0].italic and runs[1].italic:
                output.write('<d>')
                for run in runs:
                    if searchColl and 'Lady' in run.text:
                        print i
                        searchColl = False
                    output.write(run.text.encode('utf-8'))
                output.write('</d>\n')
                continue
            # Middle of a speech
            else:
                start = 0
            for run in runs[start:]:
                # Space case
                if run.text.isspace():
                    output.write('<b></b>')
                elif not (run.text.isdigit()):
                    # Accented syllable case
                    if run.font.name != None:
                        output.write('<a>' + run.text.encode('utf-8') + '</a> ')
                    # Unaccented syllable case
                    else:
                        output.write('<u>' + run.text.encode('utf-8') + '</u> ')
        # New act case
        elif Act in runs[0].text:
            text = quote + act + colon + openBracket
            numTabs = writeLine(output, numTabs, text)
            text = quote + number  
        # New scene case
        elif scene in runs[0].text:
            output.write('<c>' + runs[0].text + '</c>')
        else:
            continue
        output.write('\n')
    output.close()

if __name__ == '__main__':
    main()