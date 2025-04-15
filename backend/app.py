from flask import Flask, request, jsonify, send_from_directory
from utils import download_and_convert
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Për të mundësuar CORS dhe ndihmuar me frontend-in

# Ruajtja e skedarëve
DOWNLOAD_FOLDER = os.path.join("static", "downloads")
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")  # Merr URL-në nga kërkesa

    try:
        # Funksioni për shkarkimin dhe konvertimin e videos
        output_path = download_and_convert(url, DOWNLOAD_FOLDER)
        filename = os.path.basename(output_path)
        return jsonify({"success": True, "download_url": f"/file/{filename}"})
    except Exception as e:
        # Nëse ndodhi një gabim, kthe gabimin
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/file/<filename>")
def serve_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    # Përdorim portin që Render e cakton automatikisht
    port = int(os.environ.get("PORT", 5000))  # Default në 5000 për zhvillim lokal
    app.run(host="0.0.0.0", port=port, debug=False)
