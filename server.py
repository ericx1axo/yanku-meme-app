import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8888

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    print("==========================================================================")
    print("Yanku.com Automated Meme Platform & Ad Server Running!")
    print("==========================================================================")
    print(f"Local Access URL:   http://127.0.0.1:{PORT}")
    print(f"Custom Domain URL:  http://yanku.com:{PORT} (Requires hosts file mapping)")
    print("--------------------------------------------------------------------------")
    print("To open via http://yanku.com in your browser locally:")
    print("   Add this line to C:\\Windows\\System32\\drivers\\etc\\hosts")
    print("   127.0.0.1   yanku.com")
    print("==========================================================================")

    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
