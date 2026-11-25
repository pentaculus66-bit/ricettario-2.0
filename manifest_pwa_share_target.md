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
      "src": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='112' fill='%239C4234'/%3E%3Ccircle cx='236' cy='268' r='118' fill='%23FFDAD4'/%3E%3Ccircle cx='236' cy='268' r='84' fill='%239C4234'/%3E%3Crect x='342' y='250' width='106' height='36' rx='18' fill='%23FFDAD4'/%3E%3Cpath d='M196 132c0-18 16-24 16-42M236 124c0-18 16-24 16-42M276 132c0-18 16-24 16-42' stroke='%23FFDAD4' stroke-width='18' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
      "sizes": "192x192 512x512",
      "type": "image/svg+xml",
      "purpose": "any maskable"
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