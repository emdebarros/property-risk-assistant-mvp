const form = document.getElementById('verifyForm');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const address = document.getElementById('address').value.trim();
  const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(e => e.value);
  const errorMessage = document.getElementById('error-message');

  if (selectedCategories.length === 0) {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  let output = `
    <div class="address-banner">
      📍 Adresse de la propriété à vérifier
      <button id="copy-address-button" onclick="copyAddress()" style="background: none; border: none; font-weight: bold; font-size: 16px; cursor: pointer; color: #007BFF;">
        ${address}
      </button>
      <div id="copy-confirmation" style="display: none; font-size: 0.9em; color: green; margin-top: 5px;">
        Adresse copiée!
      </div>
      <small style="font-weight: normal;">Cliquer/taper sur l’adresse ci-dessus pour la copier, puis la coller manuellement dans la barre de recherche de chaque outil ci-dessous.</small>
    </div>
  `;

  selectedCategories.forEach(category => {
    if (category === 'flood') {
      output += `
        <div class="category">
          <h3>🌊 Risque d'inondation</h3>

          <p><strong>1. Carte Géo-inondations (Gouvernement du Québec)</strong></p>
          <p><a href="https://geoinondations.gouv.qc.ca/" target="_blank">Consultez la carte Géo-inondations</a></p>
          <small>Carte interactive officielle. Couvre tout le Québec. Recommandée pour les zones à l'extérieur du Grand Montréal.</small>

          <br>

          <p><strong>2. Carte interactive des zones inondables – CEHQ (Esri)</strong></p>
          <p><a href="https://www.cehq.gouv.qc.ca/zones-inond/carte-esri/index.html" target="_blank">Consultez la carte interactive CEHQ</a></p>
          <small>Carte SIG couvrant de nombreuses régions du Québec. Basée sur des couches géographiques à explorer manuellement.</small>

          <br>

          <p><strong>3. Carte ZIS – CEHQ (2019)</strong></p>
          <p><a href="https://www.cehq.gouv.qc.ca/zones-inond/ZIS-20191230/index.html" target="_blank">Consultez la carte ZIS (Zone d’intervention spéciale)</a></p>
          <small>Carte statique publiée après les inondations de 2019. Peut servir de référence complémentaire pour plusieurs régions du Québec.</small>

          <br>

          <p><strong>4. Carte des zones inondables – CMM (Grand Montréal)</strong></p>
          <p><a href="https://evouala.cmm.qc.ca/application/run/1373/embedded" target="_blank">Consultez la carte de la CMM</a></p>
          <small>Couvre les 82 municipalités de la Communauté métropolitaine de Montréal. Informative seulement, sans valeur légale.</small>

        </div>
      `;
    }
    if (category === 'contamination') {
      output += `
        <div class="category">
          <h3>🧪 Contamination du sol</h3>

          <p><strong>1. Carte des terrains contaminés – Québec</strong></p>
          <p><a href="https://www.pes1.enviroweb.gouv.qc.ca/AtlasPublic/CartesPubliques/cartesmddelcc.html?cfg=TerrainsContamines.json" target="_blank">Consultez la carte provinciale des terrains contaminés</a></p>
          <small>Carte officielle du ministère de l’Environnement du Québec. Couvre les sites contaminés déclarés sur l’ensemble du territoire québécois.</small>

          <br>

          <p><strong>2. Registre des sites contaminés – Gouvernement du Canada</strong></p>
          <p><a href="https://map-carte.tbs-sct.gc.ca/map-carte/fcsi-rscf/map-carte.aspx?Language=FR&qid=544002" target="_blank">Consultez la carte des sites contaminés fédéraux</a></p>
          <small>Montre les terrains contaminés sous juridiction fédérale : ports, chemins de fer, anciennes installations militaires, etc.</small>
        </div>
      `;
    }
    if (category === 'landslide') {
      output += `
        <div class="category">
          <h3>🪨 Glissement de terrain</h3>

          <p><strong>1. Atlas des zones de contraintes – Gouvernement du Québec</strong></p>
          <p><a href="https://www.cehq.gouv.qc.ca/zones-inond/contraintes/index.html" target="_blank">Consultez l’atlas des zones à risque de mouvements de terrain</a></p>
          <small>Carte interactive du ministère de l’Environnement. Permet d’identifier les zones sujettes aux glissements de terrain. Couvre plusieurs régions du Québec.</small>
        </div>
      `;
    }
    if (category === 'lead') {
      output += `
        <div class="category">
          <h3>🚰 Présence de plomb dans l'eau</h3>

          <p><strong>1. Vérification des entrées d'eau – Ville de Montréal</strong></p>
          <p><a href="https://services.montreal.ca/presence-plomb/" target="_blank">Consultez l'outil d’adresse de la Ville de Montréal</a></p>
          <small>Permet de vérifier, par adresse, la présence potentielle de tuyaux en plomb pour les propriétés situées sur l'île de Montréal.</small>

          <br>

          <p><strong>2. Présence de plomb dans les écoles – Ministère de l'Éducation</strong></p>
          <p><a href="https://experience.arcgis.com/experience/e65739b2c27d4d9391774b83fa2d0bcd" target="_blank">Consultez la carte des écoles testées pour le plomb</a></p>
          <small>Carte interactive montrant les résultats de tests de plomb dans l’eau potable des établissements scolaires à travers le Québec.</small>
        </div>
      `;
    }
    if (category === 'radon') {
      output += `
        <div class="category">
          <h3>🏠 Risque de radon</h3>

          <p><strong>1. Poumon Québec – Guide d'information sur le radon</strong></p>
          <p><a href="https://poumonquebec.ca/sante-pulmonaire/environnement/radon/" target="_blank">En savoir plus sur le radon et les moyens de prévention</a></p>
          <small>Ressource éducative pour comprendre les risques liés au radon, comment le mesurer chez soi, et comment le corriger si nécessaire. Il n'existe pas encore de carte interactive par adresse au Québec.</small>
        </div>
      `;
    }
    if (category === 'landfill') {
      output += `
        <div class="category">
          <h3>🗑️ Site d’enfouissement</h3>

          <p><strong>1. Répertoire des lieux d’élimination – MELCC</strong></p>
          <p><a href="https://www.repertoiredeslieux.ca/" target="_blank">Consultez le répertoire des sites d’enfouissement</a></p>
          <small>Carte interactive officielle des lieux d’enfouissement et de traitement des matières résiduelles au Québec. Peut aider à repérer la proximité de sites actifs ou fermés.</small>
        </div>
      `;
    }
    if (category === 'pipelines') {
      output += `
        <div class="category">
          <h3>🛢️ Pipelines</h3>

          <p><strong>1. Carte des pipelines – Régie de l’énergie du Canada</strong></p>
          <p><a href="https://neb-gis.maps.arcgis.com/apps/webappviewer/index.html?id=adbba27734c04a0ebcd66bc62aaa5957&locale=fr" target="_blank">Consultez la carte interactive des pipelines</a></p>
          <small>Carte interactive officielle couvrant les pipelines sous juridiction fédérale (ex. TransCanada, Enbridge). Utile pour les propriétés situées à proximité d’infrastructures énergétiques majeures.</small>
        </div>
      `;
    }
    if (category === 'urbanism') {
      output += `
        <div class="category">
          <h3>🏘️ Règlements d'urbanisme</h3>

          <p>Grand Montréal</p>

          <br>

          <p><strong>1. Carte SIGMA – Communauté métropolitaine de Montréal (CMM)</strong></p>
          <p><a href="https://sigma.cmm.qc.ca/application/run/448/embedded" target="_blank">Consultez la carte SIGMA</a></p>
          <small>Couvre les 82 municipalités de la CMM. Permet de visualiser les zones d’usage, retraits, densités, hauteurs, usages permis et autres règles municipales.</small>

          <br>

          <p><strong>2. Carte Spectrum – Montréal</strong></p>
          <p><a href="https://spectrum.montreal.ca/connect/analyst/mobile/#/main?mapcfg=-%20Le%20Plateau%E2%80%93Mont-Royal" target="_blank">Consultez la carte réglementaire de Montréal</a></p>
          <small>Montre les règles de zonage, hauteurs permises, usages autorisés, etc. pour la région de Montréal</small>

          <br>

          <p>Ville de Laval</p>

          <br>

          <p><strong>1. Carte interactive de zonage – Ville de Laval</strong></p>
          <p><a href="https://vl.maps.arcgis.com/apps/webappviewer/index.html?id=417e0ce0a0f74749815a4c30328c368c" target="_blank">Accédez à la carte interactive de zonage de Laval</a></p>
          <small>Permet de visualiser le zonage de chaque lot sur le territoire lavallois. Outil visuel complémentaire à la recherche textuelle.</small>

          <br>

          <p><strong>2. Recherche des règlements – Ville de Laval</strong></p>
          <p><a href="https://info-reglements.laval.ca/recherche/" target="_blank">Utilisez l’outil de recherche réglementaire de Laval</a></p>
          <small>Recherche par adresse pour obtenir les règlements et documents officiels applicables à une propriété à Laval.</small>

          <br>

          <p>Couronne Nord</p>

          <br>

          <p><strong>1. Carte interactive – Ville de Saint-Eustache</strong></p>
          <p><a href="https://experience.arcgis.com/experience/ad8d0bdb868b45398044c3e639d07dba/page/Page-initiale" target="_blank">Consultez la carte réglementaire de Saint-Eustache</a></p>
          <small>Permet de visualiser les zones d’usage, les bâtiments et autres éléments réglementaires de la municipalité.</small>

          <br>

          <p><strong>1. Carte interactive – Ville de Saint-Jérôme</strong></p>
          <p><a href="https://www.vsj.ca/carte-interactive/" target="_blank">Accédez à la carte interactive de Saint-Jérôme</a></p>
          <small>Carte municipale contenant plusieurs couches d’informations incluant le zonage.</small>

          <br>

          <p>Autre (développement et densité)</p>

          <p><strong>1. Carte de densité résidentielle – SCHL (optionnel)</strong></p>
          <p><a href="https://cmhc.maps.arcgis.com/apps/instant/lookup/index.html?appid=00f41dd48926475587c1e3faeea84b74&locale=fr&langCode=fre" target="_blank">Consultez la carte de densité résidentielle (SCHL)</a></p>
          <small>Montre les zones à fort potentiel de densification résidentielle au Canada. Utile pour projets de développement ou d’investissement.</small>
        </div>
      `;
    }  
    
  });

  resultsDiv.innerHTML = output;
});

function copyAddress() {
  const addressText = document.getElementById('copy-address-button').innerText.replace('📋', '').trim();
  navigator.clipboard.writeText(addressText)
    .then(() => {
      const confirmation = document.getElementById('copy-confirmation');
      confirmation.style.display = 'block';
      setTimeout(() => {
        confirmation.style.display = 'none';
      }, 2000);
    })
    .catch(err => {
      console.error('Erreur de copie : ', err);
    });
}
