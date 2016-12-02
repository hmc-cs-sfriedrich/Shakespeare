import PyPDF2
pdfFileObj = open('sh-mac-txt.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
print(pdfReader.numPages)
pageObj = pdfReader.getPage(36)
print(pageObj.extractText().encode('utf-8'))