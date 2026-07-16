/* =============================================================================
   LEAD FORM — CONFIGURAÇÃO DA PLATAFORMA DE E-MAIL
   -----------------------------------------------------------------------------
   Defina "provider" como 'mailchimp', 'activecampaign' ou 'klaviyo' e
   preencha só o bloco daquela plataforma abaixo. O passo a passo completo
   de onde pegar cada valor está no README.md.
============================================================================= */
const LEAD_CONFIG = {
  provider: 'klaviyo', // 'mailchimp' | 'activecampaign' | 'klaviyo'

  mailchimp: {
    // Audience "Signup form" > "Embedded form" gives you this action URL.
    action: 'https://REPLACE_ME.usREPLACE.list-manage.com/subscribe/post?u=REPLACE_ME&id=REPLACE_ME&f_id=REPLACE_ME',
    // Anti-bot hidden field name Mailchimp generates, format "b_<u>_<id>"
    botFieldName: 'b_REPLACE_ME_REPLACE_ME'
  },

  activecampaign: {
    // Forms > your form > Integrate > Raw HTML gives you this action URL
    // and the hidden field values below (u, f, s, c, m, act, v).
    action: 'https://REPLACE_ME.activehosted.com/proc.php',
    hidden: {
      u: 'REPLACE_ME',
      f: 'REPLACE_ME',
      s: '',
      c: '0',
      m: '0',
      act: 'sub',
      v: '2'
    }
  },

  klaviyo: {
    // Account > Settings > API Keys > Public API Key ("company_id")
    publicApiKey: 'Vy4TkF',
    // The List ID you want to subscribe people to (Lists & Segments > your list > Settings)
    listId: 'VbDKJi'
  }
};
