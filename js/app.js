document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.page-section');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-section');

            navLinks.forEach(function (l) { l.classList.remove('active'); });
            this.classList.add('active');

            sections.forEach(function (s) { s.classList.remove('active'); });
            document.getElementById(target).classList.add('active');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    var quotes = [
        '"El internet es innecesario cuando tienes una intranet que tiene todo lo que necesitas saber (y nada más)."',
        '"La mejor VPN es no tener internet."',
        '"Pregunta no qué puede hacer la patria por ti, porque ya lo hizo todo y deberías estar agradecido."',
        '"Un firewall no es censura, es protección contra ideas peligrosas como la libertad."',
        '"Si no está en Kwangmyong, no existe. Y eso está bien."',
        '"404: Libertad no encontrada. Pero no la necesitas."',
        '"Ctrl+Alt+Delete es contrarrevolucionario. Solo Ctrl+Obedecer."',
        '"La nube es sospechosa. Nuestros datos están seguros en un búnker."'
    ];

    var quoteEl = document.getElementById('quote-of-day');
    if (quoteEl) {
        var idx = new Date().getHours() % quotes.length;
        quoteEl.textContent = quotes[idx];
    }

    var counter = document.getElementById('visitor-count');
    if (counter) {
        setInterval(function () {
            var current = parseInt(counter.textContent.replace(/,/g, ''));
            counter.textContent = (current + Math.floor(Math.random() * 100)).toLocaleString();
        }, 3000);
    }
});

function showAlert(message) {
    document.getElementById('alert-text').textContent = message;
    document.getElementById('alert-modal').style.display = 'flex';
}

function closeAlert() {
    document.getElementById('alert-modal').style.display = 'none';
}

function fakeSearch() {
    var query = document.getElementById('search-input').value.toLowerCase();
    var results = document.getElementById('search-results');

    var responses = {
        'libertad': 'ERROR 주체-404: Concepto no reconocido. Ha sido reportado.',
        'democracia': 'Ya la tenemos. Es la mejor. Búsqueda completada.',
        'pizza': '1 resultado: Pizza Patriótica de Kimchi (única pizza aprobada).',
        'google': 'ALERTA: Sitio hostil detectado. Su búsqueda ha sido reportada.',
        'facebook': 'Red social innecesaria. Ya somos todos amigos por decreto.',
        'youtube': 'Tenemos 3 canales de TV. Es suficiente.',
        'vpn': 'ALERTA MÁXIMA: Policía cibernética notificada. Quédese donde está.',
        'twitter': 'Pájaros? Consulte la sección de fauna nacional.',
        'netflix': 'Tenemos 4 películas. Son las mejores. No necesita más.',
        'tiktok': 'Bailes no autorizados detectados. Consulte los 3 bailes aprobados.',
        'escape': 'Error: Esa palabra no existe en nuestro diccionario.',
        'kim': '47,000,000 resultados. Todos positivos. Como debe ser.',
        'comida': 'Hay suficiente comida. No haga más preguntas.',
        'hambre': 'Concepto occidental. Aquí solo existe "ayuno patriótico voluntario".',
    };

    if (!query) {
        results.innerHTML = '<p style="color:#888;margin-top:10px;font-size:13px;">Escriba algo para buscar (todo será monitoreado).</p>';
        return;
    }

    var found = false;
    for (var key in responses) {
        if (query.indexOf(key) !== -1) {
            results.innerHTML = '<p style="color:var(--red-primary);margin-top:10px;font-size:13px;padding:10px;background:#fff8e1;border-left:3px solid var(--gold);">' + responses[key] + '</p>';
            found = true;
            break;
        }
    }

    if (!found) {
        results.innerHTML = '<p style="color:#888;margin-top:10px;font-size:13px;">0 resultados. Todo lo que necesita saber ya lo sabe. Si no lo sabe, no lo necesita.</p>';
    }
}
