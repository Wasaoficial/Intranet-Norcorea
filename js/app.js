document.addEventListener('DOMContentLoaded', function () {
    // Navigation
    var navLinks = document.querySelectorAll('.main-nav a');
    var sections = document.querySelectorAll('.page-section');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = this.getAttribute('data-section');
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            this.classList.add('active');
            sections.forEach(function (s) { s.classList.remove('active'); });
            document.getElementById(target).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (target === 'lealtad') startQuiz();
        });
    });

    // Quotes
    var quotes = [
        '"El internet es innecesario cuando tienes una intranet que tiene todo lo que necesitas saber (y nada más)."',
        '"La mejor VPN es no tener internet."',
        '"Pregunta no qué puede hacer la patria por ti, porque ya lo hizo todo."',
        '"Un firewall no es censura, es protección contra ideas peligrosas como la libertad."',
        '"Si no está en Kwangmyong, no existe. Y eso está bien."',
        '"404: Libertad no encontrada. Pero no la necesitas."',
        '"Ctrl+Alt+Delete es contrarrevolucionario. Solo Ctrl+Obedecer."',
        '"La nube es sospechosa. Nuestros datos están seguros en un búnker."',
        '"¿Por qué necesitas WiFi si ya te conectamos con todo lo que debes saber?"',
        '"El mejor antivirus es no tener contacto con el exterior."'
    ];
    var quoteEl = document.getElementById('quote-of-day');
    if (quoteEl) quoteEl.textContent = quotes[new Date().getHours() % quotes.length];

    // Visitor counter
    var counter = document.getElementById('visitor-count');
    if (counter) setInterval(function () {
        var n = parseInt(counter.textContent.replace(/,/g, ''));
        counter.textContent = (n + Math.floor(Math.random() * 100)).toLocaleString();
    }, 3000);

    // VPN counter
    var vpnEl = document.getElementById('vpn-count');
    if (vpnEl) setInterval(function () {
        vpnEl.textContent = (parseInt(vpnEl.textContent) + 1).toString();
    }, 5000);

    // Clock
    function updateClock() {
        var now = new Date();
        var py = new Date(now.getTime() + (9 * 60 * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));
        var el = document.getElementById('pyongyang-clock');
        if (el) el.textContent = py.toTimeString().split(' ')[0];
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Loyalty meter
    window.loyaltyLevel = 50;
    updateLoyalty();

    // Breaking news
    var breakingNews = [
        'Científicos confirman: Corea del Norte tiene el mejor aire del planeta',
        'Nuevo satélite detecta envidia masiva desde países occidentales',
        'Récord: 47 millones de personas sonrieron simultáneamente',
        'El Won norcoreano ahora se acepta en Marte (que también descubrimos)',
        'Estudio demuestra que la felicidad es 847% mayor aquí que en cualquier otro lugar',
        'Unicornio avistado nuevamente, esta vez montando otro unicornio',
        'Internet declarado oficialmente "aburrido" por comité científico',
        'Ciudadano promedio ahora trabaja 25 horas al día gracias a hora extra patriótica'
    ];
    var breakingEl = document.getElementById('breaking-news-text');
    if (breakingEl) {
        var bIdx = 0;
        breakingEl.textContent = breakingNews[0];
        setInterval(function () {
            bIdx = (bIdx + 1) % breakingNews.length;
            breakingEl.textContent = breakingNews[bIdx];
        }, 6000);
    }

    // Citizen number
    var citizenEl = document.getElementById('citizen-number');
    if (citizenEl) citizenEl.textContent = Math.floor(Math.random() * 47000000);

    // Surveillance eye follows mouse
    document.addEventListener('mousemove', function (e) {
        var eye = document.getElementById('surveillance-eye');
        if (!eye) return;
        var rect = eye.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        var dist = 3;
        eye.querySelector('span').style.transform = 'translate(' + Math.cos(angle) * dist + 'px,' + Math.sin(angle) * dist + 'px)';
    });
});

// Loyalty
function updateLoyalty() {
    var fill = document.getElementById('loyalty-fill');
    var label = document.getElementById('loyalty-label');
    if (!fill || !label) return;
    var lvl = Math.min(window.loyaltyLevel, 100);
    fill.style.width = lvl + '%';
    fill.textContent = lvl + '%';
    var labels = ['TRAIDOR','SOSPECHOSO','TIBIO','ACEPTABLE','BUEN CAMARADA','PATRIOTA EJEMPLAR'];
    var idx = Math.min(Math.floor(lvl / 20), labels.length - 1);
    label.textContent = labels[idx];
    label.style.color = lvl < 40 ? '#cc0000' : lvl < 70 ? '#b8960c' : '#2e7d32';
}

function increaseLoyalty() {
    window.loyaltyLevel = Math.min(window.loyaltyLevel + Math.floor(Math.random() * 5) + 1, 100);
    updateLoyalty();
    if (window.loyaltyLevel >= 100) {
        showAlert('¡Felicidades! Has alcanzado lealtad máxima. Tu devoción ha sido registrada. (Nota: el nivel mínimo aceptable es 100%)');
    }
}

// Reactions
function addReaction(btn, emoji) {
    var span = btn.querySelector('span');
    if (span) {
        var n = parseInt(span.textContent.replace(/,/g, ''));
        span.textContent = (n + 1).toLocaleString();
    }
    btn.style.background = '#ffd700';
    setTimeout(function () { btn.style.background = ''; }, 300);
}

// Store
function buyItem(el, name) {
    showAlert('¡Compra de "' + name + '" registrada! Será entregado cuando el Estado lo considere oportuno. Tiempo estimado: entre 1 día y 47 años.');
    el.style.opacity = '0.5';
}

// Alert modal
function showAlert(message) {
    document.getElementById('alert-text').textContent = message;
    document.getElementById('alert-modal').style.display = 'flex';
}
function closeAlert() {
    document.getElementById('alert-modal').style.display = 'none';
}

// Search
function fakeSearch() {
    var query = document.getElementById('search-input').value.toLowerCase();
    var results = document.getElementById('search-results');
    var responses = {
        'libertad': '🚨 ERROR 주체-404: Concepto no reconocido. Ha sido reportado. Policía en camino.',
        'democracia': '✅ Ya la tenemos. Es la mejor. Búsqueda completada. No busque más.',
        'pizza': '🍕 1 resultado: Pizza Patriótica de Kimchi (única pizza aprobada).',
        'google': '🚨 ALERTA: Sitio hostil detectado. Su búsqueda ha sido reportada al Ministerio.',
        'facebook': '❌ Red social innecesaria. Ya somos todos amigos por decreto estatal.',
        'youtube': '📺 Tenemos 3 canales de TV. Es suficiente. No sea ambicioso.',
        'vpn': '🚨🚨🚨 ALERTA MÁXIMA: Policía cibernética notificada. NO SE MUEVA.',
        'twitter': '🐦 ¿Pájaros? Consulte la sección de fauna nacional.',
        'netflix': '🎬 Tenemos 4 películas. Son las mejores. No necesita más.',
        'tiktok': '💃 Bailes no autorizados. Consulte los 3 bailes aprobados.',
        'escape': '❌ Esa palabra no existe en nuestro diccionario oficial.',
        'kim': '⭐ 47,000,000 resultados. Todos positivos. Como debe ser.',
        'comida': '🍚 Hay suficiente comida. No haga más preguntas. Es una orden.',
        'hambre': '❌ Concepto occidental. Aquí solo existe "ayuno patriótico voluntario".',
        'meme': '🚨 Los memes están prohibidos. El humor no autorizado es subversión.',
        'spotify': '🎵 ¿Necesita más música que el himno nacional? Sospechoso.',
        'whatsapp': '📱 La comunicación privada es innecesaria. El Estado ya sabe lo que quiere decir.',
        'amazon': '🛒 Tenemos la Tienda Estatal. Tiene todo lo que necesita (4 productos).',
        'wikipedia': '📚 Toda la información correcta ya está en nuestros libros de texto.',
        'reddit': '❌ Opiniones no solicitadas = pensamiento peligroso.'
    };
    if (!query) {
        results.innerHTML = '<p style="color:#888;margin-top:10px;font-size:13px;padding:10px;">Escriba algo (todo será monitoreado y archivado).</p>';
        return;
    }
    var found = false;
    for (var key in responses) {
        if (query.indexOf(key) !== -1) {
            results.innerHTML = '<div style="margin-top:10px;padding:12px;background:#fff8e1;border-left:4px solid #ffd700;font-size:13px;">' + responses[key] + '</div>';
            found = true;
            break;
        }
    }
    if (!found) {
        results.innerHTML = '<div style="margin-top:10px;padding:12px;background:#f5f5f5;border-left:4px solid #ccc;font-size:13px;">0 resultados. Todo lo que necesita saber ya lo sabe. Si no lo sabe, no lo necesita. Su búsqueda ha sido archivada.</div>';
    }
}

// Quiz
var quizQuestions = [
    {
        q: '¿Cuál es la mejor nación del mundo?',
        opts: ['Corea del Norte', 'También Corea del Norte', 'Igualmente Corea del Norte', 'Las tres anteriores'],
        correct: 3
    },
    {
        q: '¿Cuántas horas al día debe trabajar un buen ciudadano?',
        opts: ['8 horas', '12 horas', '24 horas', '25 horas (hora extra patriótica)'],
        correct: 3
    },
    {
        q: '¿Qué es "internet"?',
        opts: ['Una herramienta de comunicación global', 'Propaganda capitalista peligrosa', 'Un lugar mítico que no existe', 'B y C son correctas'],
        correct: 3
    },
    {
        q: '¿Cuánto es 2 + 2?',
        opts: ['4', 'Lo que el Partido diga', '5 si es necesario para la producción', 'B y C'],
        correct: 3
    },
    {
        q: '¿Cuál es la temperatura perfecta?',
        opts: ['22°C', '주체°C', 'La que decida el líder', 'B y C'],
        correct: 3
    },
    {
        q: '¿Por qué no necesitamos internet?',
        opts: ['Tenemos Kwangmyong con 28 sitios', 'Todo lo importante ya lo sabemos', 'Internet tiene ideas peligrosas', 'Todas las anteriores'],
        correct: 3
    },
    {
        q: '¿Qué hacer si un vecino no sonríe?',
        opts: ['Nada, es su problema', 'Reportarlo inmediatamente', 'Sonreír por él', 'B, y recibir kimchi extra'],
        correct: 3
    }
];
var quizState = { current: 0, score: 0 };

function startQuiz() {
    quizState = { current: 0, score: 0 };
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    var q = quizQuestions[quizState.current];
    document.getElementById('question-text').textContent = (quizState.current + 1) + '/' + quizQuestions.length + ' — ' + q.q;
    document.getElementById('quiz-progress-bar').style.width = ((quizState.current / quizQuestions.length) * 100) + '%';
    var opts = document.getElementById('quiz-options');
    opts.innerHTML = '';
    q.opts.forEach(function (opt, i) {
        var btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = function () { answerQuiz(i); };
        opts.appendChild(btn);
    });
}

function answerQuiz(idx) {
    var q = quizQuestions[quizState.current];
    var btns = document.querySelectorAll('.quiz-option');
    btns.forEach(function (b, i) {
        b.onclick = null;
        if (i === q.correct) b.classList.add('correct');
        if (i === idx && idx !== q.correct) b.classList.add('wrong');
    });
    if (idx === q.correct) quizState.score++;
    setTimeout(function () {
        quizState.current++;
        if (quizState.current < quizQuestions.length) {
            showQuestion();
        } else {
            showQuizResult();
        }
    }, 1000);
}

function showQuizResult() {
    document.getElementById('quiz-question').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-progress-bar').style.width = '100%';
    var pct = Math.round((quizState.score / quizQuestions.length) * 100);
    if (pct === 100) {
        document.getElementById('result-icon').textContent = '⭐';
        document.getElementById('result-title').textContent = '¡PATRIOTA PERFECTO!';
        document.getElementById('result-text').textContent = 'Puntuación: ' + pct + '%. Su devoción ha sido registrada. Recibirá una ración extra de kimchi. El Partido está orgulloso (y vigilante).';
    } else if (pct >= 70) {
        document.getElementById('result-icon').textContent = '⚠️';
        document.getElementById('result-title').textContent = 'CASI ACEPTABLE';
        document.getElementById('result-text').textContent = 'Puntuación: ' + pct + '%. Necesita más estudio. Se le ha inscrito automáticamente en un curso de reeducación de 6 meses.';
    } else {
        document.getElementById('result-icon').textContent = '🚨';
        document.getElementById('result-title').textContent = 'ALERTA: LEALTAD INSUFICIENTE';
        document.getElementById('result-text').textContent = 'Puntuación: ' + pct + '%. Las autoridades han sido notificadas. Un vehículo está en camino. No intente correr (la palabra "correr" también está prohibida).';
    }
}

// Social posts
function submitPost() {
    var input = document.getElementById('social-post-input');
    var text = input.value.trim();
    if (!text) return;

    var forbidden = ['libertad', 'democracia', 'vpn', 'escape', 'huir', 'internet', 'google', 'ayuda'];
    var isForbidden = forbidden.some(function (w) { return text.toLowerCase().indexOf(w) !== -1; });

    if (isForbidden) {
        showAlert('🚨 CONTENIDO NO APROBADO DETECTADO. Su publicación ha sido eliminada y su perfil marcado para revisión. Un agente se comunicará con usted. No intente publicar de nuevo.');
        input.value = '';
        return;
    }

    var feed = document.getElementById('social-feed-posts');
    var post = document.createElement('div');
    post.className = 'social-post';
    post.style.animation = 'fadeIn 0.5s ease';
    post.innerHTML = '<div class="post-header"><div class="post-avatar" style="background:#cc0000;">☆</div><div class="post-user-info"><span class="post-username">Tú (Ciudadano Monitoreado)</span><span class="post-time">Ahora mismo</span></div></div><div class="post-content"><p>' + text.replace(/</g, '&lt;') + '</p><p style="color:#888;font-size:11px;margin-top:5px;">✅ Aprobado por el Ministerio de Publicaciones</p></div><div class="post-actions"><button onclick="addReaction(this,\'👏\')">👏 <span>1</span></button><button onclick="addReaction(this,\'❤️\')">❤️ <span>47,000,000</span></button></div>';
    feed.insertBefore(post, feed.firstChild.nextSibling);
    input.value = '';
    showAlert('Su publicación ha sido aprobada (después de revisión instantánea por 847 censores). ¡Gracias por compartir pensamientos pre-aprobados!');
}

// Report neighbor
function reportNeighbor() {
    var name = document.getElementById('report-name').value.trim();
    var reason = document.getElementById('report-reason').value;
    if (!name) {
        showAlert('Debe ingresar un nombre. (Si no tiene sospechosos, invente uno. Es su deber patriótico.)');
        return;
    }
    showAlert('🚨 Reporte recibido: "' + name + '" ha sido reportado por "' + reason + '". Un equipo de inspección está en camino. Usted recibirá 1 ración extra de kimchi como recompensa. ¡Gracias por su vigilancia, camarada!');
    document.getElementById('report-name').value = '';
}
