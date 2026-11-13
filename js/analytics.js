/* =========================================================
   CalculatorGWT — Analytics léger (sans dépendance externe)
   Envoie les événements vers un endpoint configurable.
   ========================================================= */
(function () {
    'use strict';

    const ENDPOINT = '/api/analytics'; // à adapter côté serveur

    const CalcAnalytics = {
        trackEvent: function (name, data) {
            const payload = {
                event: name,
                data: data || {},
                ts: Date.now(),
                page: location.pathname,
                referrer: document.referrer || null
            };

            // Envoi non bloquant via sendBeacon si disponible
            if (navigator.sendBeacon) {
                try {
                    navigator.sendBeacon(
                        ENDPOINT,
                        new Blob([JSON.stringify(payload)], { type: 'application/json' })
                    );
                    return;
                } catch (e) { /* fallback */ }
            }

            // Fallback fetch fire-and-forget
            try {
                fetch(ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    keepalive: true
                }).catch(function () {});
            } catch (e) {
                // silencieux
            }
        }
    };

    window.CalcAnalytics = CalcAnalytics;

    // Événement automatique de visite
    document.addEventListener('DOMContentLoaded', function () {
        CalcAnalytics.trackEvent('page_view');
    });
})();