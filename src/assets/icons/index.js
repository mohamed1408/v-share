const file_icons = {
    "ai": "ai.png",
    "avi": "avi.png",
    "css": "css.png",
    "csv": "csv.png",
    "dbf": "dbf.png",
    "doc": "doc.png",
    "dwg": "dwg.png",
    "exe": "exe.png",
    "file": "file.png",
    "html": "html.png",
    "iso": "iso.png",
    "javascript": "javascript.png",
    "jpg": "jpg.png",
    "json": "json-file.png",
    "mp3": "mp3.png",
    "mp4": "mp4.png",
    "pdf": "pdf.png",
    "png": "png.png",
    "ppt": "ppt.png",
    "psd": "psd.png",
    "rtf": "rtf.png",
    "svg": "svg.png",
    "txt": "txt.png",
    "xls": "xls.png",
    "xml": "xml.png",
    "zip": "zip.png"
}

const getIcon = (extension) => {
    return file_icons[extension] ? file_icons[extension] : file_icons['file']
}