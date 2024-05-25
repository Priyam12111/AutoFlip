# PDF Rotation Automation Tool
This repository contains a tool that automatically rotates PDF pages to a normal orientation. Whether the pages are upside-down or rotated sideways, this tool ensures they are corrected with minimal effort.

## Features
- Automatic Rotation: Detects and rotates pages to the correct orientation.
- Batch Processing: Process multiple PDF files at once.
- Command Line Interface: Easy-to-use commands for quick operations.
- Custom Rotation Angles: Supports rotation by 90, 180, and 270 degrees.
- 
## Installation
- To use this tool, you need to have Python and the PyPDF2 library installed. You can install PyPDF2 using pip:

```bash
Copy code
pip install PyPDF2
Usage
Command Line
You can rotate a PDF file by running the following command:
```
```bash
python rotate_pdf.py input.pdf output.pdf --angle 90
input.pdf: The path to the input PDF file.
output.pdf: The path to the output (rotated) PDF file.
--angle: The rotation angle (90, 180, 270 degrees).
```
Python Script
Here is an example script to rotate a PDF file:

```python
import PyPDF2

def rotate_pdf(input_pdf, output_pdf, rotation):
    pdf_reader = PyPDF2.PdfFileReader(input_pdf)
    pdf_writer = PyPDF2.PdfFileWriter()

    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        page.rotateClockwise(rotation)
        pdf_writer.addPage(page)

    with open(output_pdf, 'wb') as out:
        pdf_writer.write(out)
```
## Example usage
rotate_pdf('input.pdf', 'rotated_output.pdf', 90)

## Contribution
- Feel free to fork this repository and submit pull requests. Any improvements or bug fixes are welcome!

## License
- This project is licensed under the MIT License.

