import docx
import os
import string

act = 'Act'
scene = 'Scene'
number = 'number'
tab = ' ' * 4
lineBreak = '\n'
quote = '"'
colon = ': '
comma = ','
openBracket = '{'
closeBracket = '}'

def writeLine(output, numTabs, text):
    if closeBracket in text:
        numTabs -= 1
    output.write(numTabs * tab + text + lineBreak)
    if openBracket in text:
        numTabs += 1
    return numTabs

def writeMultiLineField(output, numTabs, field):
    text = quote + field + quote + colon + openBracket
    numTabs = writeLine(output, numTabs, text)
    return numTabs

def writeSingleLineField(output, numTabs, field, value, isLast):
    text = quote + field + quote + colon + quote + value + quote
    if not isLast:
        text += comma
    numTabs = writeLine(output, numTabs, text)
    return numTabs

def writeCloseField(output, numTabs):
    # The offset needs to be dependent on numTabs!
    '''
    output.seek(-3, os.SEEK_END)
    c = output.read(1)
    if c == ',':
        print c
        output.truncate()
        output.write(lineBreak)
    else: 
        output.seek(0, os.SEEK_END)
    '''
    
    text = closeBracket + comma
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
    numActs = 1
    # Current Scene #
    numScenes = 1
    # Current Speech #
    numSpeeches = 1
    # Current Line #
    numLines = 1
      
    # Start writing beginning of file
    numTabs = writeLine(output, numTabs, openBracket)
    
    #Start play
    numTabs = writeMultiLineField(output, numTabs, 'play')
    
    title = doc.paragraphs[1].runs[0].text
    numTabs = writeSingleLineField(output, numTabs, 'title', title, False)

    stageDirectionOccurred = False
    for lineIterator in range(firstLine, len(doc.paragraphs)):
        runs = doc.paragraphs[lineIterator].runs
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
            newSpeech = False
            for i in [1,2,3]:
                if len(runs) > i and runs[i].text == '\t':
                    if numSpeeches > 1 and not stageDirectionOccurred:
                        numTabs = writeCloseField(output, numTabs)
                    numTabs = writeMultiLineField(output, numTabs, 'speech')
                    numTabs = writeSingleLineField(output, numTabs, number, str(numSpeeches), False)
                    
                    text = ''
                    for j in range(i):
                        text += runs[j].text.encode('utf-8')
                    numTabs = writeSingleLineField(output, numTabs, 'character', text, False)
                    
                    start = i + 1
                    newSpeech = True
                    numSpeeches += 1
            if newSpeech:
                # Do nothing
                pass
            # Also skips footnotes, do this after tab just in cases of character
            # names like '1 witch'
            elif runs[0].text.isdigit():
                continue
            # Stage directions case
            elif runs[0].italic and runs[1].italic:
                if numSpeeches > 1 and not stageDirectionOccurred:
                        numTabs = writeCloseField(output, numTabs)
                text = ''
                for run in runs:
                    text += run.text.encode('utf-8')
                # Start stageDirections
                numTabs = writeMultiLineField(output, numTabs, 'stageDirections')
                numTabs = writeSingleLineField(output, numTabs, number, str(numLines), False)
                numTabs = writeSingleLineField(output, numTabs, 'text', text, True)
                numTabs = writeCloseField(output, numTabs)\
                # End stageDirections                
                stageDirectionOccurred = True
                continue
            # Middle of a speech
            else:
                start = 0
            # Set up for writing a Line
            stageDirectionOccurred = False
            fullText = ''
            numRuns = 1
            numTabs = writeMultiLineField(output, numTabs, 'line')
            # Write in fields of Line
            numTabs = writeSingleLineField(output, numTabs, number, str(numLines), False)
            # Write in runs
            for run in runs[start:]:
                # Space/punctuation case
                if run.text.isspace() or run.text in string.punctuation:
                    fullText += run.text.encode('utf-8')
                elif not (run.text.isdigit()):
                    fullText += run.text.encode('utf-8')
                    numTabs = writeMultiLineField(output, numTabs, 'run')
                    numTabs = writeSingleLineField(output, numTabs, number, str(numRuns), False) 
                    # Accented syllable case
                    if run.font.name != None:
                        numTabs = writeSingleLineField(output, numTabs, 'accented', 'true', False)
                    # Unaccented syllable case
                    else:
                        numTabs = writeSingleLineField(output, numTabs, 'accented', 'false', False)
                    numTabs = writeSingleLineField(output, numTabs, 'text', run.text.encode('utf-8').strip(), True)
                    numTabs = writeCloseField(output, numTabs)
                    numRuns += 1
            numTabs = writeSingleLineField(output, numTabs, 'lineText', fullText, False)
            numTabs = writeSingleLineField(output, numTabs, 'syllables', str(numRuns), True)
            numTabs = writeCloseField(output, numTabs)
            numLines += 1
        # New act case
        elif act in runs[0].text:
            if numActs > 1:
                if not stageDirectionOccurred:
                    numCloses = 3
                else:
                    numCloses = 2
                # End Speech, Scene, and Act
                for i in range(numCloses):
                    numTabs = writeCloseField(output, numTabs)
            # Start Act
            numTabs = writeMultiLineField(output, numTabs, 'act')
            numTabs = writeSingleLineField(output, numTabs, number, str(numActs), False)
            numActs += 1
            numScenes = 0
              
        # New scene case
        elif scene in runs[0].text:
            if numScenes > 1:
                if not stageDirectionOccurred:
                    # End last speech
                    numTabs = writeCloseField(output,numTabs)
                # End Scene
                numTabs = writeCloseField(output, numTabs)
            stageDirectionOccurred = False
            # Start Scene
            numTabs = writeMultiLineField(output, numTabs, 'scene')
            numTabs = writeSingleLineField(output, numTabs, number, str(numScenes), False)
            numScenes += 1
            numSpeeches = 1
            numLines = 1
        else:
            continue
    
    output.close()

if __name__ == '__main__':
    main()