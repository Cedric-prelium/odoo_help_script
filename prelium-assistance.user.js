// ==UserScript==
// @name         Prelium - Assistance Odoo
// @namespace    https://www.prelium.fr
// @version      1.0.0
// @description  Présélectionne le contrat client sur le formulaire d'assistance odoo.com
// @author       Prelium
// @match        https://www.odoo.com/help-form*
// @match        https://www.odoo.com/*/help-form*
// @updateURL    https://raw.githubusercontent.com/Cedric-prelium/odoo_help_script/main/prelium-assistance.user.js
// @downloadURL  https://raw.githubusercontent.com/Cedric-prelium/odoo_help_script/main/prelium-assistance.user.js
// @grant        none
// ==/UserScript==
(() => {
  const code = new URLSearchParams(location.hash.slice(1)).get('contract_number');
  if (!code) return;

  const fire = (el, type) => el.dispatchEvent(new Event(type, { bubbles: true }));
  let tries = 0;

  const t = setInterval(() => {
    if (++tries > 50) return clearInterval(t); // abandon après ~15 s

    const radio = document.querySelector('input[name="edition"][value="enterprise"]');
    if (radio && !radio.checked) { radio.click(); fire(radio, 'change'); }

    const select = document.querySelector('select[name="contract_number"]');
    if (!select) return;
    clearInterval(t);

    if ([...select.options].some(o => o.value === code)) {
      select.value = code;
      fire(select, 'change');
    } else {
      alert(`Contrat ${code} absent de la liste partenaire`);
    }
  }, 300);
})();
