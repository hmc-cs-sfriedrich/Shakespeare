import docx
import json
import os
import string

runNumber = 'runNumber'
lineNumber = 'lineNumber'
speechNumber = 'speechNumber'
sceneNumber = 'sceneNumber'
actNumber = 'actNumber'

def isOneCapLetter(string):
    return len(string) == 1 and string[0].isupper()

def main():
    doc = docx.Document('sh-mac-txt.docx')
    
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
    
    # Output dictionary
    output = {}
    # acts list
    acts = []
        
    # Current act #
    numActs = 1
    # Current Scene #
    numScenes = 1
    # Current Speech #
    numSpeeches = 1
    # Current Line #
    numLines = 1
    
    
    title = doc.paragraphs[1].runs[0].text
    output['title'] = title
    output ['acts'] = acts
    
    for lineIterator in range(firstLine, len(doc.paragraphs)):
        docRuns = doc.paragraphs[lineIterator].runs
        if len(docRuns) == 0:
            continue
        # New act case
        elif 'Act' in docRuns[0].text:
            act = {actNumber: numActs}
            print act
            acts.append(act)
            
            scenes = []
            act['scenes'] = scenes
            
            numActs += 1
            numScenes = 1
            
        # New scene case
        elif 'Scene' in docRuns[0].text:
            
            # Start Scene
            scene = {sceneNumber: numScenes}
            scenes.append(scene)
            
            speeches = []
            scene['speeches'] = speeches
            
            numScenes += 1
            numSpeeches = 1
            numLines = 1
            
        elif len(docRuns) > 1:
            # skip page headers
            if docRuns[1].font.name == 'Bernard MT Condensed':
                continue
            # skip footnotes
            if docRuns[0].font == 'None' and docRuns[1].font == 'None':
                continue
            # First line of new speech case
            # if the second, third, or fourth run in a line is a tab, that means
            # a new character is speaking. Thus, the first run must be the
            # character's name.
            newSpeech = False
            for i in [1,2,3]:
                if len(docRuns) > i and docRuns[i].text == '\t':
                    speech = {'speechNumber': numSpeeches}
                    speeches.append(speech)
                    
                    character = ''
                    for j in range(i):
                        character += docRuns[j].text.encode('utf-8')
                    speech['character'] = character.strip()
                    
                    
                    newSpeech = True
                    numSpeeches += 1
            if newSpeech:
                lines = []
                speech['lines'] = lines             
                start = i + 1
            # Also skips footnotes, do this after tab just in cases of character
            # names like '1 witch'
            elif docRuns[0].text.isdigit():
                continue
            # Stage directions case
            elif docRuns[0].italic and (docRuns[1].italic or isOneCapLetter(docRuns[1].text)):
                continue
            # Middle of a speech
            else:
                start = 0
            # Set up for writing a Line
            line = {lineNumber: numLines}
            lines.append(line)
            
            runs = []
            line['runs'] = runs
            numRuns = 1
            
            fullText = ''
            # Write in runs
            for docRun in docRuns[start:]:
                # Space/punctuation case
                if docRun.text.isspace() or docRun.text in string.punctuation:
                    fullText += docRun.text.encode('utf-8')
                elif not (docRun.text.isdigit()):
                    fullText += docRun.text.encode('utf-8')
                    run = {runNumber: numRuns}
                    runs.append(run)
                    # Accented syllable case
                    if docRun.font.name != None:
                        run['accented'] = 'true'
                    # Unaccented syllable case
                    else:
                        run['accented'] = 'false'
                    run['text'] = docRun.text.encode('utf-8').strip()
                    numRuns += 1
            line['lineText'] = fullText
            line['syllables'] = numRuns
            numLines += 1
        else:
            continue
    
    with open('sh-mac-txt-scansion.txt', 'w+') as outfile:
        json.dump(output, outfile, sort_keys=True, indent=4, separators=(',',': '))


if __name__ == '__main__':
    main()