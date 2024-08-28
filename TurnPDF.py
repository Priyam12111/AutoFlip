import PyPDF2
import streamlit as st
from io import BytesIO

def rotate_non_vertical_pages(file, rotation_angle):
    pdf_reader = PyPDF2.PdfReader(file)
    pdf_writer = PyPDF2.PdfWriter()

    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]

        # Check if the page is not already vertically oriented
        if page.get('/Rotate', 0) % 360 != 0:
            pdf_writer.add_page(page)
            continue  # Skip rotation for already non-vertical pages

        # Rotate the page by the specified angle
        page.rotate(rotation_angle)
        pdf_writer.add_page(page)

    output_file = BytesIO()
    pdf_writer.write(output_file)
    return output_file

st.title("PDF Rotation App")

uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

if uploaded_file is not None:
    rotation_angle = 90
    st.write(f"Selected Rotation Angle: {rotation_angle} degrees")

    st.markdown("### Perform Rotation")
    if st.button("Rotate PDF"):
        rotated_file = rotate_non_vertical_pages(uploaded_file, rotation_angle)
        st.success("PDF rotated successfully!")
        st.download_button("Download Rotated PDF", rotated_file, key="download_rotated_pdf", file_name="rotated.pdf", mime="application/pdf")
