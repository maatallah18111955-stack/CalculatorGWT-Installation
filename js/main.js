/* =========================================================
   CalculatorGWT — Scripts principaux
   ========================================================= */
(function () {
    'use strict';

    // --- Détection automatique de l'OS pour mise en évidence ---
    function detectOS() {
        const ua = navigator.userAgent;
        if (/Win/i.test(ua)) return 'windows';
        if (/Mac/i.test(ua)) return 'mac';
        if (/Linux/i.test(ua) && !/Android/i.test(ua)) return 'linux';
        return 'unknown';
    }

    function highlightDownloadCard() {
        const os = detectOS();
        const card = document.querySelector('.download-card[data-os="' + os + '"]');
        if (card) {
            card.style.borderColor = '#2563eb';
            card.style.borderWidth = '2px';
            const badge = document.createElement('div');
            badge.textContent = 'Recommandé pour votre système';
            badge.style.cssText =
                'background:#2563eb;color:#fff;padding:4px 10px;border-radius:20px;' +
                'font-size:0.75rem;margin-bottom:10px;display:inline-block;';
            card.insertBefore(badge, card.firstChild);
        }
    }

    // --- Suivi basique des téléchargements ---
    function trackDownload() {
        document.querySelectorAll('.btn-download').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                const file = btn.getAttribute('href');
                // Événement analytics (voir analytics.js)
                if (window.CalcAnalytics) {
                    window.CalcAnalytics.trackEvent('download', {
                        file: file,
                        os: detectOS()
                    });
                }
                // Si le fichier n'existe pas réellement, on prévient l'utilisateur
                // (utile en phase de test)
                // e.preventDefault(); // décommenter pour test
            });
        });
    }

    // --- Vérification de disponibilité de l'app web ---
    function checkWebApp() {
        const links = document.querySelectorAll('a[href*="web-app/war/"]');
        links.forEach(function (link) {
            fetch(link.getAttribute('href'), { method: 'HEAD' })
                .then(function (r) {
                    if (!r.ok) {
                        link.addEventListener('click', function (e) {
                            e.preventDefault();
                            alert("L'application web n'est pas encore déployée.\n" +
                                  'Vérifiez que le dossier war/ contient bien CalculatorGWT.html.');
                        });
                    }
                })
                .catch(function () { /* silencieux */ });
        });
    }

    // --- Initialisation ---
    document.addEventListener('DOMContentLoaded', function () {
        highlightDownloadCard();
        trackDownload();
        checkWebApp();
    });
})();