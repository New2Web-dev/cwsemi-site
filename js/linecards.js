document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('manufacturersContainer');
  if (!container) return;

  const manufacturers = [
    { name: "Abracon", url: "https://abracon.com", logo: "abracon.png" },
    { name: "Actel", url: "https://www.microsemi.com", logo: "actel.png" },
    { name: "Advanced Micro Devices", url: "https://www.amd.com", logo: "advancedmicrodevices.png" },
    { name: "Agere Systems", url: "https://www.lsi.com", logo: "ageresystems.png" },
    { name: "Allegro MicroSystems", url: "https://www.allegromicro.com", logo: "allegromicrosystems.png" },
    { name: "Altera", url: "https://www.intel.com/content/www/us/en/products/programmable.html", logo: "altera.png" },
    { name: "AMI Semiconductor", url: "https://www.onsemi.com", logo: "amisemiconductor.png" },
    { name: "Ampleon", url: "https://www.ampleon.com", logo: "ampleon.png" },
    { name: "ams OSRAM", url: "https://ams-osram.com", logo: "amsosram.png" },
    { name: "Anadigics", url: "https://www.skyworksinc.com", logo: "anadigics.png" },
    { name: "Analog Devices", url: "https://www.analog.com", logo: "analogdevices.png" },
    { name: "Aptina", url: "https://www.onsemi.com", logo: "aptina.png" },
    { name: "Atmel", url: "https://www.microchip.com", logo: "atmel.png" },
    { name: "Avago", url: "https://www.broadcom.com", logo: "avago.png" },
    { name: "Benchmarq", url: "https://www.ti.com", logo: "benchmarq.png" },
    { name: "Broadcom", url: "https://www.broadcom.com", logo: "broadcom.png" },
    { name: "Burr Brown", url: "https://www.ti.com", logo: "burrbrown.png" },
    { name: "California Micro Devices", url: "https://www.semtech.com", logo: "californiamicrodevices.png" },
    { name: "Catalyst", url: "https://www.onsemi.com", logo: "catalyst.png" },
    { name: "Cherry", url: "https://www.cherry.de", logo: "cherry.png" },
    { name: "Chipcon", url: "https://www.ti.com", logo: "chipcon.png" },
    { name: "Cirrus Logic", url: "https://www.cirrus.com", logo: "cirruslogic.png" },
    { name: "Conexant", url: "https://www.synaptics.com", logo: "conexant.png" },
    { name: "Cypress", url: "https://www.infineon.com", logo: "cypress.png" },
    { name: "Dallas Semiconductor", url: "https://www.maximintegrated.com", logo: "dallassemiconductor.png" },
    { name: "Elantec", url: "https://www.intersil.com", logo: "elantec.png" },
    { name: "Exar", url: "https://www.maxlinear.com", logo: "exar.png" },
    { name: "Fairchild", url: "https://www.onsemi.com", logo: "fairchild.png" },
    { name: "Freescale", url: "https://www.nxp.com", logo: "freescale.png" },
    { name: "General Semiconductor", url: "https://www.vishay.com", logo: "generalsemiconductor.png" },
    { name: "Gennum", url: "https://www.semtech.com", logo: "gennum.png" },
    { name: "Harris", url: "https://www.l3harris.com", logo: "harris.png" },
    { name: "Hittite", url: "https://www.analog.com", logo: "hittite.png" },
    { name: "IBM", url: "https://www.ibm.com", logo: "ibm.png" },
    { name: "Infineon", url: "https://www.infineon.com", logo: "infineon.png" },
    { name: "Integrated Device Technology", url: "https://www.renesas.com", logo: "integrateddevicetechnology.png" },
    { name: "Integrated Silicon Solution", url: "https://www.issi.com", logo: "integratedsiliconsolution.png" },
    { name: "Intel", url: "https://www.intel.com", logo: "intel.png" },
    { name: "Intelligent Memory", url: "https://www.intelligentmemory.com", logo: "intelligentmemory.png" },
    { name: "International Rectifier", url: "https://www.infineon.com", logo: "internationalrectifier.png" },
    { name: "Intersil", url: "https://www.renesas.com", logo: "intersil.png" },
    { name: "Kyoto Semiconductor", url: "https://www.ksc.co.jp", logo: "kyotosemiconductor.png" },
    { name: "Lantiq", url: "https://www.intel.com", logo: "lantiq.png" },
    { name: "Lattice", url: "https://www.latticesemi.com", logo: "lattice.png" },
    { name: "Linear Technology", url: "https://www.analog.com", logo: "lineartechnology.png" },
    { name: "Lucent", url: "https://www.nokia.com", logo: "lucent.png" },
    { name: "Luminary Micro", url: "https://www.ti.com", logo: "luminarymicro.png" },
    { name: "Max Linear", url: "https://www.maxlinear.com", logo: "maxlinear.png" },
    { name: "Maxim", url: "https://www.maximintegrated.com", logo: "maxim.png" },
    { name: "Micrel", url: "https://www.microchip.com", logo: "micrel.png" },
    { name: "Microchip", url: "https://www.microchip.com", logo: "microchip.png" },
    { name: "Micron", url: "https://www.micron.com", logo: "micron.png" },
    { name: "Monolithic Memories", url: "https://www.amd.com", logo: "monolithicmemories.png" },
    { name: "Motorola", url: "https://www.nxp.com", logo: "motorola.png" },
    { name: "National Semiconductor", url: "https://www.ti.com", logo: "nationalsemiconductor.png" },
    { name: "NEC Corporation", url: "https://www.nec.com", logo: "neccorporation.png" },
    { name: "Nexperia", url: "https://www.nexperia.com", logo: "nexperia.png" },
    { name: "Nisshinbo Micro Devices Inc", url: "https://www.nisshinbo-microdevices.co.jp", logo: "nisshinbomicrodevicesinc.png" },
    { name: "Numonyx", url: "https://www.micron.com", logo: "numonyx.png" },
    { name: "NXP Semiconductors", url: "https://www.nxp.com", logo: "nxpsemiconductors.png" },
    { name: "onsemi", url: "https://www.onsemi.com", logo: "onsemi.png" },
    { name: "Pericom", url: "https://www.microchip.com", logo: "pericom.png" },
    { name: "Philips", url: "https://www.nxp.com", logo: "philips.png" },
    { name: "PMC-Sierra", url: "https://www.microsemi.com", logo: "pmcsierra.png" },
    { name: "Power Trends", url: "https://www.ti.com", logo: "powertrends.png" },
    { name: "QuickLogic", url: "https://www.quicklogic.com", logo: "quicklogic.png" },
    { name: "Ramtron", url: "https://www.cypress.com", logo: "ramtron.png" },
    { name: "RCA", url: "https://www.rca.com", logo: "rca.png" },
    { name: "Renesas", url: "https://www.renesas.com", logo: "renesas.png" },
    { name: "Ricoh", url: "https://www.ricoh.com", logo: "ricoh.png" },
    { name: "Rochester Electronics", url: "https://www.rocelec.com", logo: "rochesterelectronics.png" },
    { name: "Sanyo", url: "https://panasonic.net", logo: "sanyo.png" },
    { name: "Semtech International AG", url: "https://www.semtech.com", logo: "semtechinternationalag.png" },
    { name: "Siemens", url: "https://www.siemens.com", logo: "siemens.png" },
    { name: "Sigmatel", url: "https://www.cirrus.com", logo: "sigmatel.png" },
    { name: "Silicon Blue", url: "https://www.latticesemi.com", logo: "siliconblue.png" },
    { name: "Siliconix", url: "https://www.vishay.com", logo: "siliconix.png" },
    { name: "Simtek", url: "https://www.cypress.com", logo: "simtek.png" },
    { name: "Sipex", url: "https://www.exar.com", logo: "sipex.png" },
    { name: "SiTime", url: "https://www.sitime.com", logo: "sitime.png" },
    { name: "Skyworks", url: "https://www.skyworksinc.com", logo: "skyworks.png" },
    { name: "Spansion", url: "https://www.cypress.com", logo: "spansion.png" },
    { name: "STMicroelectronics", url: "https://www.st.com", logo: "stmicroelectronics.png" },
    { name: "Texas Instruments", url: "https://www.ti.com", logo: "texasinstruments.png" },
    { name: "Toshiba", url: "https://toshiba.semicon-storage.com", logo: "toshiba.png" },
    { name: "u-blox", url: "https://www.u-blox.com", logo: "ublox.png" },
    { name: "WeEn", url: "https://www.ween-semi.com", logo: "ween.png" },
    { name: "Xilinx", url: "https://www.xilinx.com", logo: "xilinx.png" },
    { name: "Zilog", url: "https://www.zilog.com", logo: "zilog.png" }
  ];

  function renderManufacturers(filterLetter) {
    container.innerHTML = '';

    let list = manufacturers;
    if (filterLetter && filterLetter !== 'all') {
      list = manufacturers.filter(m => m.name.charAt(0).toUpperCase() === filterLetter);
    }

    if (list.length === 0) {
      container.innerHTML = '<div class="no-results">No manufacturers found starting with this letter</div>';
      return;
    }

    list.forEach(function (m) {
      const card = document.createElement('a');
      card.href = m.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.className = 'manufacturer-card';

      const logoBox = document.createElement('div');
      logoBox.className = 'manufacturer-logo';

      const img = document.createElement('img');
      img.src = '/manufacturer-logos/' + m.logo;
      img.alt = m.name + ' Logo';
      img.className = 'manufacturer-logo-img';

      logoBox.appendChild(img);

      const nameEl = document.createElement('div');
      nameEl.className = 'manufacturer-name';
      nameEl.textContent = m.name;

      card.appendChild(logoBox);
      card.appendChild(nameEl);
      container.appendChild(card);
    });
  }

  renderManufacturers('all');

  const buttons = document.querySelectorAll('.alphabet-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      const letter = this.getAttribute('data-letter');
      renderManufacturers(letter);
    });
  });
});