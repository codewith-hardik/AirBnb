
((g) => {
      var h,
        a,
        k,
        p = "The Google Maps JavaScript API",
        c = "google",
        l = "importLibrary",
        q = "__ib__",
        m = document,
        b = window;
      b = b[c] || (b[c] = {});
      var d = b.maps || (b.maps = {}),
        r = new Set(),
        e = new URLSearchParams(),
        u = () =>
          h ||
          (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                g[k]
              );
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => (h = n(Error(p + " could not load.")));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
      d[l]
        ? console.warn(p + " only loads once. Ignoring:", g)
        : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
    })({ key:mapTokenKey, v: "weekly" });



    let map;
    async function initMap() {
      // The location of Uluru
      const position = { lat: coordinates[1], lng:coordinates[0] };
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        "marker"
      );
      // The map, centered at Uluru
      map = new Map(document.getElementById("map"), {
        zoom: 7,
        center: position,
        mapId: "DEMO_MAP_ID",
      });
      // The marker, positioned at Uluru
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
      });
    }
    initMap();





    // // मैप को इनिशियलाइज़ करना
    // const map = L.map('map').setView([23.0225, 72.5714], 13); // अहमदाबाद, गुजरात के लिए Latitude और Longitude

    // // OpenStreetMap से टाइल्स जोड़ना
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(map);

    // // मैप पर एक मार्कर जोड़ना
    // L.marker([23.0225, 72.5714]).addTo(map)
    //   .bindPopup('This is Ahmedabad!')
    //   .openPopup();
