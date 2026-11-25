{
  "name": "Ricettario 2.0 — Archivio di Famiglia",
  "short_name": "Ricettario 2.0",
  "description": "Il ricettario di famiglia con wizard, importazione PDF e foto con IA e backup.",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#FFF8F6",
  "theme_color": "#FFF8F6",
  "icons": [
    {
      "src": "./icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "./icon.svg",
      "sizes": "512x512",
      "type": "image/svg+xml",
      "purpose": "maskable"
    }
  ],
  "share_target": {
    "action": "./index.html?share-target=1",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "shared_files",
          "accept": [
            "application/pdf",
            ".pdf",
            "image/*"
          ]
        }
      ]
    }
  }
}