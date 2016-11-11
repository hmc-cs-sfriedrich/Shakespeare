import docx
import json
import os
import string
import re

runNumber = 'runNumber'
lineNumber = 'lineNumber'
speechNumber = 'speechNumber'
sceneNumber = 'sceneNumber'
actNumber = 'actNumber'

def isOneCapLetter(string):
    return len(string) == 1 and string[0].isupper()
    
def naiiveSyllableCount(word):
    return len(''.join(" x"[c in "aeiouy"] for c in word.rstrip('e')).split())
    
def stripUnicode(docRunTextUnstripped):
    docRunTextUnstripped = docRunTextUnstripped.decode('utf-8').replace(u'\u2019', "'")
    docRunTextUnstripped = docRunTextUnstripped.replace(u'\u2014','')
    docRunTextUnstripped = docRunTextUnstripped.replace(u'\u201c','"')
    docRunTextUnstripped = docRunTextUnstripped.replace(u'\u201d','"')
    docRunTextUnstripped = docRunTextUnstripped.encode('utf-8')
    return docRunTextUnstripped


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
            start = 0
            # skip page headers
            if docRuns[1].font.name == 'Bernard MT Condensed':
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
                    tabIndex = i
                    break
            # skip footnotes
            if docRuns[start].font.bold != True and docRuns[start].font.italic != True and docRuns[start+1].font.bold != True and docRuns[start+1].font.italic != True:
                continue
            if newSpeech:
                lines = []
                speech['lines'] = lines             
                start = tabIndex + 1
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
                # Other new speech option
                if docRuns[start].italic and not docRuns[start].bold:
                    speech = {'speechNumber': numSpeeches}
                    speeches.append(speech)
                    numSpeeches += 1
                    speech['character'] = docRuns[start].text
                    start += 1
                    lines = []
                    speech['lines'] = lines
                    
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
                docRunTextUnstripped = docRun.text.encode('utf-8')
                docRunText = docRunTextUnstripped.strip()
                if docRunText.isspace() or docRunText in string.punctuation:
                    fullText += docRunTextUnstripped
                elif not docRunText.isdigit() and not(docRun.italic and not docRun.bold): 
                    fullText += docRunTextUnstripped
                    run = {runNumber: numRuns}
                    # Bolded syllable case
                    if docRun.font.bold != None:
                        run['bold'] = 'true'
                    # Unbolded syllable case
                    else:
                        run['bold'] = 'false'
                    # Italicized syllable case
                    if docRun.font.italic != None:
                        run['italic'] = 'true'
                    # Unitalicized syllable case
                    else:
                        run['italic'] = 'false'
                    # Write out the run's text tot he json
                    run['text'] = docRunText
                    if len(runs) > 1 and run['bold'] == runs[-1]['bold'] and run['italic'] == runs[-1]['italic']:
                        runs[-1]['text'] += docRunText
                    else: 
                        numRuns += 1
                        runs.append(run)
            line['lineText'] = fullText
            
            if 'will mingle' in fullText:
                print lineIterator
                return
            
            words = fullText.split()
            words = [stripUnicode(word) for word in words]
            
            if 'colloquial' in words:
                print lineIterator
            
            # If the naiive count isn't close enough to the number of runs
            # it means that it was prose, which is indicated as having
            # syllable count of -1
            naiiveCount = sum([naiiveSyllableCount(word) for word in words])
            if abs(naiiveCount - numRuns) > 3:
                numRuns = -1
            line['syllables'] = numRuns
            numLines += 1
        else:
            continue
    
    with open('sh-mac-txt-scansion.json', 'w+') as outfile:
        json.dump(output, outfile, sort_keys=True, indent=4, separators=(',',': '))


if __name__ == '__main__':
    main()