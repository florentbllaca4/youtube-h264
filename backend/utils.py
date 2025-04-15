import yt_dlp
import ffmpeg
import os

def download_and_convert(url, download_folder):
    # Parametrat për yt-dlp për shkarkimin e videos
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),
    }

    # Përdorimi i yt-dlp për shkarkimin
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        result = ydl.download([url])
    
    # Pas shkarkimit, ndihmohet në konvertimin e videos në formatin h264
    filename = result[0]['filename']  # Merr emrin e skedarit të shkarkuar
    output_filename = filename.split('.')[0] + '_converted.mp4'
    
    # Përdorim ffmpeg për konvertimin në h264 (MP4)
    ffmpeg.input(filename).output(output_filename, vcodec='libx264').run()

    # Kthe emrin e skedarit të konvertuar
    return output_filename
