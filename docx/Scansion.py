import docx

# Key for tags
# <s> = speaker
# <d> = directions
# <u> = unaccented
# <a> = accented
# <t> = act
# <c> = scene
# <b> = space

act = 'Act'
scene = 'Scene'

def pr(x):
    print x

def main():
    sf = open('sh-mac-txt-scansion.txt', 'w+')
    doc = docx.Document('sh-mac-txt.docx')
    
    #myread = open('my-read.txt', 'w+')
    mystr = ""
    for run in doc.paragraphs[1254].runs:
        print (run.text + ": " + str(run.font.name))
        mystr += run.text
    print (mystr)
    #myread.close()
    
    # Find where Act 1 begins
    first_line = 0
    found_first_line = False
    while not found_first_line:
        runs = doc.paragraphs[first_line].runs
        if len(runs) == 0:
            first_line += 1
            continue
        if runs[0].text == 'Act I':
            found_first_line = True
            continue
        first_line += 1
      
    searchColl = True
    
    for i in range(first_line, len(doc.paragraphs)):
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
                sf.write('<s>' + runs[0].text.encode('utf-8') + '</s> ')
                start = 2
            elif len(runs) > 2 and runs[2].text == '\t':
                sf.write('<s>' + runs[0].text.encode('utf-8') +
                         runs[1].text.encode('utf-8') + '</s> ')
                start = 3
            elif len(runs) > 3 and runs[3].text == '\t':
                sf.write('<s>' + runs[0].text.encode('utf-8') +
                         runs[1].text.encode('utf-8') + 
                         runs[2].text.encode('utf-8') + '</s> ')
                start = 4
            # Also skips footnotes, do this after tab just in cases of character
            # names like '1 witch'
            elif runs[0].text.isdigit():
                continue
            # Stage directions case
            elif runs[0].italic and runs[1].italic:
                sf.write('<d>')
                for run in runs:
                    if searchColl and 'Lady' in run.text:
                        print i
                        searchColl = False
                    sf.write(run.text.encode('utf-8'))
                sf.write('</d>\n')
                continue
            # Middle of a speech
            else:
                start = 0
            for run in runs[start:]:
                # Space case
                if run.text.isspace():
                    sf.write('<b></b>')
                elif not (run.text.isdigit()):
                    # Accented syllable case
                    if run.font.name != None:
                        sf.write('<a>' + run.text.encode('utf-8') + '</a> ')
                    # Unaccented syllable case
                    else:
                        sf.write('<u>' + run.text.encode('utf-8') + '</u> ')
        # New act case
        elif act in runs[0].text:
            sf.write('<t>' + runs[0].text + '</t>')
        # New scene case
        elif scene in runs[0].text:
            sf.write('<c>' + runs[0].text + '</c>')
        else:
            continue
        sf.write('\n')
    sf.close()

if __name__ == '__main__':
    main()