from yt_dlp import YoutubeDL
import os
import subprocess

def download_and_convert(url, output_dir):
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio/best',
        'outtmpl': os.path.join(output_dir, '%(title)s.%(ext)s'),
        'merge_output_format': 'mp4'
    }

    with YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        filename = ydl.prepare_filename(info)
        ydl.download([url])

    result = subprocess.run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=codec_name",
        "-of", "default=noprint_wrappers=1:nokey=1", filename
    ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    codec = result.stdout.decode().strip()
    if codec != "h264":
        new_file = filename.replace(".mp4", "_h264.mp4")
        subprocess.run([
            "ffmpeg", "-i", filename, "-c:v", "libx264", "-c:a", "copy", new_file, "-y"
        ])
        os.remove(filename)
        return new_file
    return filename