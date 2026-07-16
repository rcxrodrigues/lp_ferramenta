/* =============================================================================
   CÓDIGOS PARA O <head>
   -----------------------------------------------------------------------------
   Use este arquivo para colar códigos que a plataforma pede pra colocar
   dentro do <head> — por exemplo:
     - Google Tag Manager (o script principal, não o <noscript>)
     - Google Analytics / GA4 (gtag.js)
     - Meta Pixel (Facebook/Instagram Ads)
     - Script de "onsite tracking" do Klaviyo
     - Tags de verificação de domínio (Google Search Console, Pinterest, etc.)

   COMO USAR
   -----------------------------------------------------------------------------
   Cole o código completo — igual a plataforma te deu, com a tag <script>
   e tudo — dentro do template literal abaixo (entre os acentos graves `` ` ``).
   Não precisa editar mais nada neste arquivo nem no index.html.

   Exemplo (Meta Pixel), cole assim dentro do document.write:

     document.write(`
       <script>
         !function(f,b,e,v,n,t,s){...}(window, document,'script',
         'https://connect.facebook.net/en_US/fbevents.js');
         fbq('init', 'SEU_PIXEL_ID');
         fbq('track', 'PageView');
       </script>
       <noscript><img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=SEU_PIXEL_ID&ev=PageView&noscript=1"
       /></noscript>
     `);

   Pode colar mais de um código, um em seguida do outro, dentro do mesmo
   template literal.
============================================================================= */
document.write(`
<script async type='text/javascript' src='https://static.klaviyo.com/onsite/js/Vy4TkF/klaviyo.js?company_id=Vy4TkF'></script>
<script type="text/javascript">
//Initialize Klaviyo object on page load
!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();
</script>
`);
