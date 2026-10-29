/* Hojas de proyecto con capítulos (Tuchati, Je'nim): misma base que Camelia, pero guiada por datos.
   Uso: CAP.render(p, { t, E, pn }) devuelve el HTML; después se llama a CAMELIA.init() (índice, vídeos y créditos). */
(function(){
  const LB = { es: { cover: "Portada", coverH: "Imagen principal de la hoja, en horizontal (escritorio) y en vertical (móvil)", pend: "Imagen pendiente", chapters: "Capítulos", proto: "Ver prototipo en Figma" },
               en: { cover: "Cover", coverH: "Main image of the page, horizontal (desktop) and vertical (mobile)", pend: "Image pending", chapters: "Chapters", proto: "View prototype in Figma" } };
  // Qué lleva cada capítulo (1–6). Panel: slot (hueco), video, img. "side": una sola imagen a la derecha del texto.
  const MAP = {
    tuchati: {
      cover: [["img/tuchati/portada-movil-v.webp", { es: "Mockup de móvil con la página de inicio de Tuchati", en: "Phone mockup showing the Tuchati home page" }], ["img/tuchati/portada-logo-v.webp", { es: "Logotipo de Tuchati", en: "Tuchati logo" }]],
      4: { items: [["teclas", "arq"]] },
      5: { rows: [[["video", "asistente"], ["asist", "chat"]], [["img", "paleta"]], [["img", "hifi"]]] },
    },
    jenim: {
      cover: [["img/jenim/portada-1-v.webp", { es: "Móvil sobre un trípode con la web de Je'nim: «El mercadillo digital que solo abre los domingos»", en: "Phone on a tripod showing the Je'nim website: “The digital flea market that only opens on Sundays”" }], ["img/jenim/portada-2-v.webp", { es: "Mano sujetando un móvil con la web de Je'nim: «Tu acceso empieza con un código»", en: "Hand holding a phone showing the Je'nim website: “Your access starts with a code”" }], ["img/jenim/portada-3-v.webp", { es: "Persona acercando a cámara un móvil con la web de Je'nim: «Vende sin complicaciones»", en: "Person holding a phone up to the camera showing the Je'nim website: “Sell without complications”" }]],
      1: { side: true, items: [["carpeta", "ref"]] },
      4: { items: [["mapa", "arq"]] },
      5: { rows: [[["img", "paleta"]], [["video", "f1"], ["video", "f2"], ["video", "f3"]]], proto: true, protoAt: 1 },
      6: { items: [["safari", "web"]] },
    },
    "del-reves": {
      coverImg: { src: "img/del-reves/portada.webp?v=2", ratio: "1920/1269", alt: { es: "Portada de Del Revés: mosaico de pantallas de la app en perspectiva (Bienvenida, Home, Respiración, Reflexión, Login y la carátula con la cara y la planta)", en: "Del Revés cover: app screens in perspective (Welcome, Home, Breathing, Reflection, Login and the splash with the face and the plant)" } },
      2: { rows: [[["img", "mood"]]] },
      3: { rows: [[["img", "crazyf"], ["img", "story"]]] },
      4: { rows: [[["img", "logo"], ["img", "ds"]], [["img", "arq"]], [["img", "hifi"]]] },
    },
    brvma: {
      coverVideo: { v: "img/brvma/portada-v.mp4?v=2", poster: "img/brvma/portada-poster.webp?v=2", alt: { es: "Vídeo de un móvil con la app de Brvma: aparece el antifaz que guiña el ojo, después el logotipo y por último la pantalla de bienvenida «Bienvenida a tu viaje»", en: "Video of a phone showing the Brvma app: the winking mask appears, then the logo and finally the welcome screen “Welcome to your trip”" } },
      1: { side: true, items: [["img", "bench"]] },
      4: { wide: true, items: [["img", "crazy"]] },
      5: { rows: [[["img", "marca"], ["img", "ds"]], { wide: true, items: [["img", "wire"]] }, { right: true, items: [["img", "hifi"]] }] },
      6: { rows: [[["img", "test"], ["img", "mvp"]]] },
    },
  };
  const SL = {
    es: {
      tuchati: {
        ref: ["Referencias analizadas", "Capturas de gestorías, servicios de relocation, comunidades de expats y herramientas de IA"],
        arq: ["Arquitectura y flujo", "Mapa del sitio con Ask Tuchati y el flujo principal: de una duda a una persona"],
        paleta: ["Paleta cromática · Tipografía · Grid", "Hoja con el verde azulado, los neutros, Manrope y la rejilla"],
        hifi: ["Alta fidelidad · desktop", "Vídeo con las pantallas de la web: Home, Services, How it works, Pricing, Help Centre y Contact"],
        uso: ["Validación con el uso real", "Capturas o datos de uso: solicitudes, preguntas más repetidas, conversión"],
      },
      jenim: {
        ref: ["Plataformas analizadas", "Capturas de Vinted, Micolet, Percentil, Wallapop y Privalia/Veepee"],
        arq: ["Arquitectura de la información", "Mapa del sitio: mercadillo, buscador, favoritos, mensajes, vender y cuenta"],
        fases: ["Una web, tres momentos", "Las tres portadas: mercadillo cerrado, pre-apertura y apertura general"],
        paleta: ["Paleta cromática · Tipografía · Grid", "Hoja con el azul, el crema, el amarillo, Montserrat, Roboto y la rejilla"],
        aula: ["Del aula a la realidad", "Comparativa entre el proyecto de clase y la web real en jenim.es"],
      },
      brvma: {
      },
      "del-reves": {
      },
    },
    en: {
      tuchati: {
        ref: ["Analysed references", "Screenshots of gestorías, relocation services, expat communities and AI tools"],
        arq: ["Architecture and flow", "Sitemap with Ask Tuchati and the main flow: from a question to a person"],
        paleta: ["Colour palette · Typography · Grid", "Sheet with the teal, the neutrals, Manrope and the grid"],
        hifi: ["High fidelity · desktop", "Video of the website screens: Home, Services, How it works, Pricing, Help Centre and Contact"],
        uso: ["Validation through real use", "Screenshots or usage data: requests, most repeated questions, conversion"],
      },
      jenim: {
        ref: ["Analysed platforms", "Screenshots of Vinted, Micolet, Percentil, Wallapop and Privalia/Veepee"],
        arq: ["Information architecture", "Sitemap: market, search, favourites, messages, sell and account"],
        fases: ["One website, three moments", "The three covers: closed market, pre-opening and general opening"],
        paleta: ["Colour palette · Typography · Grid", "Sheet with the blue, the cream, the yellow, Montserrat, Roboto and the grid"],
        aula: ["From classroom to reality", "Comparison between the class project and the real website at jenim.es"],
      },
      brvma: {
      },
      "del-reves": {
      },
    },
  };
  // teclas pulsables del menú principal (capítulo de arquitectura): posición en % del panel 4:5
  const TEC = { label: { es: "Arquitectura", en: "Architecture" }, hint: { es: "Pulsa las teclas", en: "Press the keys" }, keys: [["Home", "img/tuchati/teclas/tecla-1.webp", "left:8.167%;top:30.567%;width:22.208%"], ["Services", "img/tuchati/teclas/tecla-2.webp", "left:32.729%;top:30.567%;width:22.208%"], ["How it works", "img/tuchati/teclas/tecla-3.webp", "left:57.292%;top:30.567%;width:22.208%"], ["Help Centre", "img/tuchati/teclas/tecla-4.webp", "left:20.448%;top:50.217%;width:22.208%"], ["Pricing", "img/tuchati/teclas/tecla-5.webp", "left:45.010%;top:50.217%;width:22.208%"], ["Contact", "img/tuchati/teclas/tecla-6.webp", "left:69.573%;top:50.217%;width:22.208%"]] };
  const IMG = {
    "del-reves": { hifi: { src: "img/del-reves/alta-fidelidad.webp?v=1", ratio: "1125/2000", mul: true, protoBtn: true, label: { es: "Alta fidelidad", en: "High fidelity" }, alt: { es: "Seis móviles con las pantallas de la app de Del Revés: Home con Objetivos, Dormir, Respirar, Meditación, Moverse y Reflexión; Respiración con «¡Completado!»; Reflexión con sus preguntas ilustradas; Progreso con «¡Felicidades por tu avance!»; Calendario de noviembre con las caras de estado de ánimo; y «Tu planta refleja tu día a día»", en: "Six phones with the Del Revés app screens: Home with Goals, Sleep, Breathe, Meditation, Move and Reflection; Breathing with “Completed!”; Reflection with its illustrated questions; Progress with “Congratulations on your progress!”; the November calendar with mood faces; and “Your plant reflects your day-to-day”" } },
      arq: { src: "img/del-reves/arquitectura.webp?v=1", ratio: "1524/2000", mul: true, label: { es: "Arquitectura de la información", en: "Information architecture" }, alt: { es: "Mapa de la arquitectura de Del Revés: onboarding, login y registro; desde el login, Home, Chat box, Calendario y Perfil; desde Home, Respiración, Meditación, Dormir, Reflexión, Objetivos y Movimiento; desde Perfil, Progreso; con la leyenda de nivel 1, 2 y 3", en: "Del Revés architecture map: onboarding, login and registration; from login, Home, Chat box, Calendar and Profile; from Home, Breathing, Meditation, Sleep, Reflection, Goals and Movement; from Profile, Progress; with the level 1, 2 and 3 key" } },
      logo: { src: "img/del-reves/logo-colores-tipografia.webp?v=1", ratio: "1162/2000", mul: true, label: { es: "Logotipo, colores y tipografía", en: "Logo, colours and typography" }, alt: { es: "Logotipo de Del Revés, la cara de una persona de la que brota una planta; las tres familias de color con su significado —morado (tranquilidad, calidez, equilibrio, sensibilidad y empatía), verde (vida, crecimiento, sanación, esperanza, optimismo, equilibrio y calma) y neutros marrones (color terciario)— con sus escalas de nueve tonos en Primary, Secondary y Terciary, y la tipografía Poppins en regular y negrita con Headline 1, Title 24, Subtitle 18 y Body 16", en: "The Del Revés logo, the face of a person from whom a plant grows; the three colour families with their meaning —purple (calm, warmth, balance, sensitivity and empathy), green (life, growth, healing, hope, optimism, balance and calm) and brown neutrals (tertiary colour)— with their nine-tone scales in Primary, Secondary and Tertiary, and the Poppins typeface in regular and bold with Headline 1, Title 24, Subtitle 18 and Body 16" } },
      ds: { src: "img/del-reves/design-system.webp?v=1", ratio: "1162/2000", mul: true, label: { es: "Design system", en: "Design system" }, alt: { es: "Componentes del design system de Del Revés: botones morados, lilas, contorneados, rojos y grises en distintos estados; tarjetas de actividad en verde y con título y subtítulo; los círculos de respiración; y burbujas de conversación del chat en verde con avatares", en: "Components of the Del Revés design system: purple, lilac, outlined, red and grey buttons in different states; activity cards in green and with title and subtitle; the breathing circles; and green chat bubbles with avatars" } },
      story: { src: "img/del-reves/storyboard.webp?v=1", ratio: "1317/2000", mul: true, contain: true, label: { es: "Storyboard", en: "Storyboard" }, alt: { es: "Storyboard en ocho viñetas: una mujer agobiada en un atasco; no tiene tiempo ni de parar a comer y está en una sesión online; se siente muy cargada de emociones; sus compañeras le recomendaron una app y decide bajar «Del revés»; piensa probarla por la noche; en la cama, con pensamientos de ansiedad; y, a la mañana siguiente, un «¡Aaahhh!» de alivio con los ojos cerrados", en: "Storyboard in eight panels: a woman overwhelmed in a traffic jam; she has no time even to stop and eat and is in an online session; she feels very loaded with emotions; her colleagues recommended an app and she decides to download “Del Revés”; she plans to try it at night; in bed, with anxious thoughts; and, the next morning, an “Aaahhh!” of relief with her eyes closed" } },
      crazyf: { src: "img/del-reves/crazy-8.webp?v=2", ratio: "1317/2000", mul: true, label: { es: "Crazy 8 finales", en: "Final Crazy 8s" }, alt: { es: "Ocho bocetos a mano de las pantallas de la app, cada uno con su nombre: Splash, Home, Respiración, Login, Chat, Cuestiones («¿Cómo te sientes ahora?» con cinco caras), Calendario y Feedback con el mensaje sobre el progreso del último mes", en: "Eight hand-drawn sketches of the app screens, each with its name: Splash, Home, Breathing, Login, Chat, Questions (“How do you feel now?” with five faces), Calendar and Feedback with the message about the last month's progress" } },
      mood: { src: "img/del-reves/moodboard.webp?v=1", ratio: "2000/2861", mul: true, label: { es: "Moodboard y Lightning Demos", en: "Moodboard and Lightning Demos" }, alt: { es: "Referencias visuales de Del Revés: capturas de aplicaciones de diario emocional, estado de ánimo y respiración; un moodboard con texturas de arena y masilla en verdes y beige, lavanda, una ilustración de un cerebro meditando y el mensaje «Respira, no eres tu ansiedad»; y dos grupos de rombos con las paletas de colores", en: "Visual references for Del Revés: screenshots of emotional diary, mood and breathing apps; a moodboard with sand and putty textures in greens and beige, lavender, an illustration of a meditating brain and the message “Breathe, you are not your anxiety”; and two groups of diamonds with colour palettes" } } },
    brvma: { hifi: { src: "img/brvma/alta-fidelidad.webp?v=1", ratio: "1600/2000", mul: true, protoBtn: true, label: { es: "Alta fidelidad", en: "High fidelity" }, alt: { es: "Dos móviles en perspectiva con la app de Brvma: a la izquierda, el inicio de Brvma Sesiones con «Escápate sin irte lejos» y las sesiones «A toda máquina» y «Modo fluyendo»; a la derecha, Mis viajes con «Desconectar para reconectar» en camino y la experiencia completada «Más alto»", en: "Two phones in perspective showing the Brvma app: on the left, the Brvma Sessions home with “Escape without going far” and the sessions “Full throttle” and “Flowing mode”; on the right, My trips with “Disconnect to reconnect” on its way and the completed experience “Higher”" } },
      test: { src: "img/brvma/testeo.webp?v=3", ratio: "1023/1537", label: { es: "Testeo", en: "Testing" }, alt: { es: "Un hombre visto de espalda y de perfil, que sostiene un móvil con la pantalla de inicio de la app de Brvma; junto a él, dos burbujas con lo que dijo en la prueba: «No entendí la parte de Comunidad...» y «Brvma Match, ¿eso qué es...?»", en: "A man seen from behind and in profile, holding a phone showing the Brvma app's home screen; next to him, two speech bubbles with what he said during the test: “I didn't understand the Community part...” and “Brvma Match, what is that...?”" } },
      ds: { src: "img/brvma/design-system.webp?v=1", ratio: "1125/2000", mul: true, label: { es: "Design system", en: "Design system" }, alt: { es: "Design system de Brvma en Figma: la tabla de variables con 411 tokens, como el botón primario con su color por defecto y en hover; el texto «Controlado por variables»; el selector «Width» con las opciones «No eyes» y «Eyes» sobre el antifaz del logotipo; y la biblioteca de componentes: barra de progreso, barra inferior, barras de navegación, tarjetas, botones en distintos estados y colores, barra de estado, barra superior con el logotipo, tarjetas de pago y de viaje y selectores", en: "Brvma's design system in Figma: the variables table with 411 tokens, such as the primary button with its default and hover colours; the text “Controlled by variables”; the “Width” selector with the “No eyes” and “Eyes” options over the logo's mask; and the component library: progress bar, bottom bar, navigation bars, cards, buttons in different states and colours, status bar, top bar with the logo, payment and trip cards and selectors" } },
      mvp: { src: "img/brvma/mvp-futuribles.webp?v=2", ratio: "1023/1537", mul: true, contain: true, label: { es: "MVP y futuribles", en: "MVP and future options" }, alt: { es: "A la izquierda, la pantalla de bienvenida de la app, «¡Bienvenidx a tu viaje!»; a la derecha, el MVP —experiencias sorpresa, storytelling y acompañamiento emocional durante todo el proceso, comunidad básica y personalización ligera— y los futuribles —crear un sistema de pistas y juegos para cada revelación, aumentar el número de experiencias ofertadas y un mayor sistema de narrativa y de personalización—", en: "On the left, the app's welcome screen, “Welcome to your trip!”; on the right, the MVP —surprise experiences, storytelling and emotional support throughout the process, basic community and light personalisation— and the future options —creating a system of clues and games for each reveal, increasing the number of experiences offered and a larger narrative and personalisation system—" } },
      marca: { src: "img/brvma/identidad-visual.webp?v=2", ratio: "1125/2000", mul: true, label: { es: "Identidad visual", en: "Visual identity" }, alt: { es: "Identidad visual de Brvma: las tipografías Red Hat Display y Satoshi, tres paletas de nueve tonos (verde azulado, azul índigo y coral) con su contraste AA o AAA y un color principal en cada una (#0FB9A0, #4C5DF9 y #FF7A59), la pantalla de inicio de la app y dos versiones del logotipo, un antifaz con un guiño, junto al nombre brvma", en: "Brvma's visual identity: the Red Hat Display and Satoshi typefaces, three nine-tone palettes (teal, indigo blue and coral) with their AA or AAA contrast and a main colour in each (#0FB9A0, #4C5DF9 and #FF7A59), the app's home screen and two versions of the logo, a winking mask, next to the name brvma" } },
      wire: { src: "img/brvma/wireframes.webp?v=3", ratio: "3558/1440", mul: true, label: { es: "Wireframes", en: "Wireframes" }, alt: { es: "Siete wireframes de pantallas de la app en grises, en una sola fila, con barra superior e inferior: pantallas con selector de dos modos, tarjetas y listas, un perfil con foto, formularios con botón y una pantalla con cuadrícula de cuatro bloques", en: "Seven greyscale wireframes of app screens, in a single row, with top and bottom bars: screens with a two-mode selector, cards and lists, a profile with a photo, forms with a button and a screen with a four-block grid" } },
      crazy: { src: "img/brvma/crazy-8s.webp?v=4", ratio: "1538/1072", mul: true, label: { es: "Crazy 8's", en: "Crazy 8's" }, alt: { es: "Ocho bocetos a mano de pantallas de la app: bienvenida con «¿Cómo funciona?» y «Crear perfil», inicio con «La experiencia» y «Pequeños retos», elección entre «Experiencias» y «Sorpresas», ficha de la experiencia con precio, fechas, duración, pistas y test de afinidad, comunidad con chat, cuenta atrás con pistas disponibles y perfil con preferencias, cuenta, notificaciones y configuración", en: "Eight hand-drawn sketches of app screens: welcome with “How it works” and “Create profile”, home with “The experience” and “Small challenges”, a choice between “Experiences” and “Surprises”, experience page with price, dates, duration, clues and affinity test, community with chat, countdown with available clues, and profile with preferences, account, notifications and settings" } },
      bench: { src: "img/brvma/benchmark.webp?v=3", ratio: "1250/1562", mul: true, label: { es: "Benchmark", en: "Benchmark" }, alt: { es: "Cinco fichas en 3D sobre una base azul de colores con los logotipos de Airbnb (rojo), Fever (negro), ClassPass (azul) y Drumwit.com (verde lima) y una ficha rosa con un signo de interrogación", en: "Five 3D tiles on a blue base in different colours with the Airbnb (red), Fever (black), ClassPass (blue) and Drumwit.com (lime green) logos and a pink tile with a question mark" } } },
    jenim: { paleta: { src: "img/jenim/paleta.webp?v=6", ratio: "1600/2000", mul: true, label: { es: "Paleta cromática · Grid · Instagram", en: "Colour palette · Grid · Instagram" }, alt: { es: "Portátil con la rejilla de 12 columnas de la web (Desktop, 1512 px, márgenes de 22 y gutter de 20), delante la tipografía Montserrat y Roboto y la paleta (azul #0044E1, crema #F6F4F0, negro #000000 y dorado #B88100) con una fila de fotografías de referencia, y a la derecha el perfil de Instagram @soyjenim", en: "Laptop showing the website's 12-column grid (Desktop, 1512 px, 22 margin, 20 gutter), in front of it the Montserrat and Roboto typography and the palette (blue #0044E1, cream #F6F4F0, black #000000 and gold #B88100) with a row of reference photographs, and on the right the @soyjenim Instagram profile"} } },
    tuchati: { paleta: { src: "img/tuchati/paleta-tipografia.webp", label: { es: "Paleta cromática · Tipografía", en: "Colour palette · Typography" }, alt: { es: "Tipografía Manrope y paleta cromática de Tuchati: #2D7D76, #1F2933, #5B6672, #FAF9F7, #F3F5F4, #FDFDFD y #DCE4E2", en: "Manrope typeface and Tuchati colour palette: #2D7D76, #1F2933, #5B6672, #FAF9F7, #F3F5F4, #FDFDFD and #DCE4E2" } },
      hifi: { src: "img/tuchati/alta-fidelidad.webp", label: { es: "Alta fidelidad", en: "High fidelity" }, alt: { es: "Varios móviles en perspectiva con las pantallas de la web de Tuchati: servicios, inicio, precios, por qué confiar, cómo funciona y el centro de ayuda", en: "Several phones in perspective showing the Tuchati website screens: services, home, pricing, why trust Tuchati, how it works and the help centre" } } },
  };
  // mapa del sitio pulsable (monitor con pantalla activa): puntos de la pantalla en el sistema w×h de la foto
  const MAPA = {
    jenim: { arq: { img: "img/jenim/arquitectura-portatil.webp", big: "img/jenim/arquitectura-mapa.webp", w: 736, h: 920, pts: [[302, 178], [663, 317], [577, 603], [232, 439]],
      label: { es: "Arquitectura de la información", en: "Information architecture" }, title: { es: "Mapa del sitio de Je'nim", en: "Je'nim sitemap" },
      alt: { es: "Persona con un portátil sobre las rodillas que muestra el mapa del sitio de Je'nim", en: "Person with a laptop on their knees showing the Je'nim sitemap" },
      open: { es: "Ampliar el mapa del sitio", en: "Enlarge the sitemap" }, hint: { es: "Pulsa para ampliar", en: "Click to enlarge" },
      zoom: { es: ["Acercar", "Alejar"], en: ["Zoom in", "Zoom out"] }, close: { es: "Cerrar", en: "Close" },
      bigAlt: { es: "Mapa del sitio de Je'nim: Home, Log in y Register, con las secciones de mercadillo virtual, categorías, destacados, buscador, favoritos, mensajes, notificaciones, vender, cuenta, sobre Je'nim y centro de asistencia", en: "Je'nim sitemap: Home, Log in and Register, with the sections virtual flea market, categories, featured, search, favourites, messages, notifications, sell, account, about Je'nim and help centre" } } },
  };
  // carpeta animada (Je'nim, plataformas analizadas): de la carpeta salen los logos de las cinco plataformas
  const CARPETA = { jenim: { ref: { logos: [2, 4, 1, 5, 3].map(n => "img/jenim/logos/logo-" + n + ".webp"), // posiciones de izquierda a derecha; el del centro (Vinted) es el que queda arriba con todos dentro y sale primero, luego Wallapop, Privalia, Micolet y Percentil
    label: { es: "Plataformas analizadas", en: "Platforms analysed" },
    alt: { es: "Animación: de una carpeta azul salen los logos de las cinco plataformas analizadas: Vinted, Wallapop, Privalia/Veepee, Micolet y Percentil", en: "Animation: the logos of the five platforms analysed come out of a blue folder: Vinted, Wallapop, Privalia/Veepee, Micolet and Percentil" } } } };
  const VID = {
    jenim: {
      f1: { v: "img/jenim/fase-1-v.mp4?v=5", poster: "img/jenim/fase-1-poster.webp?v=5", label: { es: "Fase 1 · Mercadillo cerrado", en: "Phase 1 · Closed flea market" }, alt: { es: "Vídeo de un monitor con la web de Je'nim con el mercadillo cerrado: sobre la portada «Estamos preparando nuestro próximo mercadillo» se pulsa «Registro | Inicio sesión» en la barra de navegación, se elige continuar con el e-mail, se rellena el formulario de registro y aparece el aviso de correo de verificación enviado", en: "Video of a monitor showing the Je'nim website while the flea market is closed: on the cover “We are preparing our next flea market” the “Sign up | Log in” button in the navigation bar is pressed, continuing with e-mail is chosen, the registration form is filled in and the verification email notice appears" } },
      f2: { v: "img/jenim/fase-2-v.mp4?v=5", poster: "img/jenim/fase-2-poster.webp?v=5", label: { es: "Fase 2 · Preapertura", en: "Phase 2 · Pre-opening" }, alt: { es: "Vídeo de un portátil sobre una silla azul con la web de Je'nim en la preapertura: se pulsa para solicitar el código de invitación, se rellena el formulario (con un error y corregido), se pulsa para entrar, se inicia sesión, se llega a la portada de bienvenida y se pulsa para entrar al mercadillo con sus puestos", en: "Video of a laptop on a blue chair showing the Je'nim website during the pre-opening: the invitation code request is pressed, the form is filled in (with an error, then corrected), the button to enter is pressed, the user signs in, reaches the welcome cover and presses to enter the flea market with its stalls" } },
      f3: { v: "img/jenim/fase-3-v.mp4?v=5", poster: "img/jenim/fase-3-poster.webp?v=5", label: { es: "Fase 3 · Apertura", en: "Phase 3 · Opening" }, alt: { es: "Vídeo de un monitor con la web de Je'nim con el mercadillo abierto: desde la portada «Es hoy, es hoy» se pulsa para entrar al mercadillo, se elige un puesto, un artículo y «Comprar», se confirma en el aviso, se pulsa «Pagar» en el carrito y aparece «Tu pago ha sido completado»", en: "Video of a monitor showing the Je'nim website with the flea market open: from the cover “It's today, it's today” the user presses to enter the flea market, chooses a stall, an item and “Buy”, confirms in the notice, presses “Pay” in the cart and “Your payment has been completed” appears" } },
    },
    tuchati: { asistente: { v: "img/tuchati/asistente-v.mp4", poster: "img/tuchati/asistente-poster.webp", label: { es: "Ask Tuchati", en: "Ask Tuchati" }, alt: { es: "Vídeo interactivo del asistente de Tuchati: se elige una situación, se explica el caso y se pide ayuda humana", en: "Interactive video of the Tuchati assistant: a situation is chosen, the case is explained and human help is requested" } } },
  };
  // navegador interactivo del capítulo «Testear» de Je'nim: capturas de la web real (app Next.js de jenim.es) por fase y página
  const SAFARI = { jenim: { web: {
    url: "jenim.es", label: { es: "Del aula a la realidad", en: "From classroom to reality" },
    alt: { es: "Navegador interactivo con la web real de Je'nim: se elige la fase (cerrado, pre-apertura o apertura general) y la página, y se desplaza la página", en: "Interactive browser with the real Je'nim website: choose the phase (closed, pre-opening or general opening) and the page, and scroll the page" },
    nav: { es: "Fase de la web", en: "Website phase" }, pages: { es: "Página", en: "Page" }, view: { es: "Página de la web de Je'nim, desplazable", en: "Je'nim website page, scrollable" },
    phases: [
      { n: { es: ["Fase I", "Cerrado"], en: ["Phase I", "Closed"] }, p: [["f1-inicio", "Inicio", "Home", "Fase I, inicio con la cuenta atrás", "Phase I, home with the countdown"], ["f1-vender", "Vender", "Sell", "Fase I, vender", "Phase I, sell"], ["f1-como", "Cómo funciona", "How it works", "Fase I, cómo funciona", "Phase I, how it works"]] },
      { n: { es: ["Fase II", "Pre-apertura"], en: ["Phase II", "Pre-opening"] }, p: [["f2-invitacion", "Invitación", "Invitation", "Fase II, inicio con acceso por invitación", "Phase II, home with invitation access"], ["f2-codigo", "Con código", "With code", "Fase II, inicio con el código de invitación", "Phase II, home with the invitation code"], ["f2-puesto", "Puesto", "Stall", "Fase II, un puesto", "Phase II, a stall"], ["f2-pieza", "Pieza", "Item", "Fase II, una pieza", "Phase II, an item"]] },
      { n: { es: ["Fase III", "Apertura general"], en: ["Phase III", "General opening"] }, p: [["f3-inicio", "Inicio", "Home", "Fase III, inicio con el mercadillo abierto", "Phase III, home with the flea market open"], ["f3-paseo", "Paseo", "Walk", "Fase III, paseo por el mercadillo", "Phase III, walk through the flea market"], ["f3-destacados", "Destacados", "Featured", "Fase III, destacados", "Phase III, featured"], ["f3-puesto", "Puesto", "Stall", "Fase III, un puesto", "Phase III, a stall"], ["f3-pieza", "Pieza", "Item", "Fase III, una pieza", "Phase III, an item"], ["f3-accesorios", "Accesorios", "Accessories", "Fase III, puesto de accesorios", "Phase III, accessories stall"], ["f3-carrito", "Carrito", "Cart", "Fase III, carrito", "Phase III, cart"]] },
    ] } } };
  const cap = (a, b = "") => `<span class="cap">${a}</span>${b ? `<span class="cap r">${b}</span>` : ""}`;

  function render(p, o){
    const { t, E, pn } = o, lang = PORT.lang === "en" ? "en" : "es", L = LB[lang], F = p.procesoFases, cfg = MAP[p.slug] || {}, sl = (SL[lang][p.slug] || {});
    const slot = k => `<div class="pn1 slot ar-4-5">${cap(L.pend)}<div class="in"><b>${E(sl[k][0])}</b><span>${E(sl[k][1])}</span></div></div>`;
    const video = k => { const v = VID[p.slug][k]; return `<div class="pn1 fp ar-4-5">${cap(E(v.label[lang]))}<video class="fill" muted loop playsinline preload="none" poster="${v.poster}" data-src="${lang === "en" && v.ven ? v.ven : v.v}" aria-label="${E(v.alt[lang])}"></video></div>`; };
    const img = k => { const v = IMG[p.slug][k]; return `<div class="pn1 fp ${v.ratio ? "" : "ar-4-5"}"${v.ratio ? ` style="aspect-ratio:${v.ratio}"` : ""}>${cap(E(v.label[lang]))}<img class="fill${v.mul ? " mul" : ""}${v.contain ? " contain" : ""}" src="${v.src}" alt="${E(v.alt[lang])}" loading="lazy">${v.protoBtn && p.prototipo ? `<a class="pill cbtn" href="${p.prototipo}" target="_blank" rel="noopener">${E(p.protoLabel || L.proto)} ↗</a>` : ""}</div>`; };
    const mapa = k => { const v = MAPA[p.slug][k], pt = v.pts.map(q => [q[0] / v.w * 100, q[1] / v.h * 100]), cx = pt.reduce((a, q) => a + q[0], 0) / 4, cy = pt.reduce((a, q) => a + q[1], 0) / 4;
      return `<div class="pn1 fp ar-4-5 map">${cap(E(v.label[lang]))}<img class="fill" src="${v.img}" alt="${E(v.alt[lang])}" loading="lazy"><button class="hot" type="button" aria-label="${E(v.open[lang])}" style="clip-path:polygon(${pt.map(q => q[0].toFixed(2) + "% " + q[1].toFixed(2) + "%").join(",")})"></button><span class="pill hint" style="left:${cx.toFixed(2)}%;top:${cy.toFixed(2)}%">${E(v.hint[lang])}<i aria-hidden="true">↗</i></span></div>`; };
    const mapaDlg = () => { const m = MAPA[p.slug] && MAPA[p.slug].arq; return m ? `<dialog class="mdlg" id="mdlg" aria-label="${E(m.title[lang])}"><div class="mbar"><b>${E(m.title[lang])}</b><div><button class="pill" type="button" id="mzoom" data-z="${E(m.zoom[lang][0])}|${E(m.zoom[lang][1])}">${E(m.zoom[lang][0])}</button><button class="pill" type="button" id="mclose">${E(m.close[lang])}</button></div></div><div class="mview" id="mview"><img id="mbig" src="${m.big}" alt="${E(m.bigAlt[lang])}"></div></dialog>` : ""; };
    const carpeta = k => { const v = CARPETA[p.slug][k]; return `<div class="pn1 fp ar-1 fold" role="img" aria-label="${E(v.alt[lang])}" data-logos="${v.logos.join(",")}">${cap(E(v.label[lang]))}<div class="fs" aria-hidden="true"><div class="f-sh"></div><svg class="f-back" viewBox="0 0 560 420"><defs><linearGradient id="fbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B52F0"/><stop offset="1" stop-color="#012B8F"/></linearGradient></defs><path d="M 60 0 L 230 0 Q 258 0 274 22 L 290 44 Q 300 56 320 56 L 500 56 Q 560 56 560 116 L 560 360 Q 560 420 500 420 L 60 420 Q 0 420 0 360 L 0 60 Q 0 0 60 0 Z" fill="url(#fbg)"/></svg><div class="f-under"></div><div class="f-tiles"></div><div class="f-front"></div><div class="f-edge"></div><div class="f-gloss"></div></div></div>`; };
    const teclas = () => `<div class="pn1 ar-4-5 tec">${cap(E(TEC.label[lang]))}<span class="tec-hint">${E(TEC.hint[lang])}</span><div class="stage">${TEC.keys.map(k => `<button class="key" type="button" aria-label="${E(k[0])}" style="${k[2]}"><img alt="" draggable="false" src="${k[1]}" loading="lazy"></button>`).join("")}</div></div>`;
    const safari = k => { const v = SAFARI[p.slug][k], ph = v.phases;
      return `<div class="pn1 ar-4-5 saf" data-k="${k}" data-slug="${p.slug}">${cap(E(v.label[lang]))}<div class="sw"><div class="sb" aria-hidden="true"><i></i><i></i><i></i><span class="su"><svg viewBox="0 0 12 14" width="9" height="11"><rect x="1" y="6" width="10" height="7.5" rx="1.6" fill="currentColor"/><path d="M3.5 6V4.2a2.5 2.5 0 0 1 5 0V6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>${E(v.url)}</span></div><div class="sc" role="group" aria-label="${E(v.pages[lang])}"></div><div class="sv" id="sv-${k}" role="tabpanel" tabindex="0" aria-label="${E(v.view[lang])}"><img alt="" decoding="async"></div><div class="sp" role="tablist" aria-label="${E(v.nav[lang])}">${ph.map((q, i) => `<button class="spb" type="button" role="tab" aria-controls="sv-${k}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}"><b>${E(q.n[lang][0])}</b><span>${E(q.n[lang][1])}</span></button>`).join("")}</div></div></div>`; };
    const AL = { es: "Tuchati Assistant · interactivo", en: "Tuchati Assistant · interactive" };
    const asist = () => `<div class="pn1 fp asp ar-4-5">${cap(AL[lang])}${window.ASIST ? ASIST.markup(lang) : ""}</div>`;
    const panel = it => it[0] === "slot" ? slot(it[1]) : it[0] === "teclas" ? teclas() : it[0] === "carpeta" ? carpeta(it[1]) : it[0] === "mapa" ? mapa(it[1]) : it[0] === "img" ? img(it[1]) : it[0] === "asist" ? asist() : it[0] === "safari" ? safari(it[1]) : video(it[1]);
    const pair = items => items.wide ? panel(items.items[0]) : items.right ? `<div class="pair"><span aria-hidden="true"></span>${panel(items.items[0])}</div>` : `<div class="pair${items.length === 3 ? " tri" : ""}">${items.map(panel).join("")}</div>`;
    const proto = p.prototipo ? `<div class="pair prow"><span></span><p class="protob"><a class="pill" href="${p.prototipo}" target="_blank" rel="noopener">${E(p.protoLabel || L.proto)} ↗</a></p></div>` : "";
    const paras = x => E(x).split("\n\n").map(q => `<p class="tx">${q}</p>`).join("");
    const chapter = (n, k) => {
      const c = cfg[n] || {}; let extra = "";
      if(c.rows) extra = `<div class="ed">${c.rows.map((r, i) => pair(r) + (c.proto && i === (c.protoAt ?? c.rows.length - 1) ? proto : "")).join("")}</div>`;
      else if(c.items) extra = `<div class="ed">${c.side || c.wide ? panel(c.items[0]) : pair(c.items)}</div>`;
      return `<section class="chap ${c.side ? "side" : ""}" id="c${n}"><div class="ct"><small>${String(n).padStart(2, "0")} · ${E(F[k][0])}</small>${E(F[k][1]).split("\n\n").map(q => `<p>${q}</p>`).join("")}</div>${extra}</section>`;
    };
    const dec = `<ul class="lst">${p.decisiones.map(x => `<li>${E(x)}</li>`).join("")}</ul>`;
    return `<div class="f2">
      ${cfg.coverImg ? `<div class="pn1 fp hero3w" style="aspect-ratio:${cfg.coverImg.ratio}"><img class="fill" src="${cfg.coverImg.src}" alt="${E(cfg.coverImg.alt[lang])}"></div>` : cfg.coverVideo ? `<div class="pair hero3 one"><div class="pn1 ar-2-3"><video class="fill mul" muted loop playsinline preload="none" poster="${cfg.coverVideo.poster}" data-src="${cfg.coverVideo.v}" aria-label="${E(cfg.coverVideo.alt[lang])}"></video></div><span class="sp" aria-hidden="true"></span></div>` : cfg.cover ? `<div class="pair hero3 ${cfg.cover.length === 3 ? "three" : "two"}">${cfg.cover.length === 3 ? "" : `<span class="sp" aria-hidden="true"></span>`}${cfg.cover.map(c => `<div class="pn1 ar-2-3"><img class="fill" src="${c[0]}" alt="${E(c[1][lang])}"></div>`).join("")}</div>` : `<div class="hero hc slot cover"><div class="in"><b>${E(L.cover)}</b><span>${E(L.coverH)}</span></div>${cap(L.pend)}</div>`}
      <section class="sec"><h2>${t("reto")}</h2><div class="c">${paras(p.reto)}</div></section>
      <section class="sec"><h2>${t("solucion")}</h2><div class="c">${paras(p.solucion)}</div></section>
      <section class="sec"><h2>${t("proceso")}</h2><div class="c"><p class="tx">${E(p.procesoIntro)}</p></div></section>
      <div class="chs"><nav class="cnav" aria-label="${E(L.chapters)}">${F.map((f, k) => `<a href="#c${k + 1}"><i>${String(k + 1).padStart(2, "0")}</i>${E(f[0])}</a>`).join("")}</nav>
        <div>${F.map((f, k) => chapter(k + 1, k)).join("")}</div></div>
      <section class="sec"><h2>${t("decisiones")}</h2><div class="c">${dec}</div></section>
      <section class="sec"><h2>${t("resultado")}</h2><div class="c">${[p.resultado, p.resultadoFin, p.aprendi].map(x => paras(x)).join("")}</div></section>
      <div class="fin">${pn}</div></div>${mapaDlg()}`;
  }
  // teclas: se hunden al pulsar (ratón, táctil, Enter o Espacio) y suenan con un clic breve
  let ac;
  const clic = up => { try{ ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = "square"; o.frequency.setValueAtTime(up ? 1500 : 900, t); o.frequency.exponentialRampToValueAtTime(up ? 700 : 300, t + .03);
    g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.001, t + .04); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .05); }catch(e){} };
  function init(){
    document.querySelectorAll(".tec").forEach(tec => {
      // pista: la primera vez que se ve, las teclas se hunden en cadena (sin sonido); al pulsar una de verdad, la pista se retira
      let used = false; const ks = [...tec.querySelectorAll(".key")];
      tec.addEventListener("pointerdown", () => { used = true; tec.classList.add("used"); }, { once: true });
      tec.addEventListener("keydown", () => { used = true; tec.classList.add("used"); }, { once: true });
      if(!PORT.reduced && "IntersectionObserver" in window){
        const io = new IntersectionObserver(es => { if(!es[0].isIntersecting) return; io.disconnect();
          ks.forEach((k, i) => { setTimeout(() => { if(used) return; k.classList.add("down"); setTimeout(() => k.classList.remove("down"), 190); }, 500 + i * 160); }); }, { threshold: .6 });
        io.observe(tec);
      }
    });
    document.querySelectorAll(".tec .key").forEach(k => {
      const dn = () => { if(k.classList.contains("down")) return; k.classList.add("down"); clic(0); };
      const up = () => { if(!k.classList.contains("down")) return; k.classList.remove("down"); clic(1); };
      k.addEventListener("pointerdown", dn); ["pointerup", "pointerleave", "pointercancel", "blur"].forEach(e => k.addEventListener(e, up));
      k.addEventListener("keydown", e => { if(e.key === " " || e.key === "Enter"){ e.preventDefault(); dn(); } });
      k.addEventListener("keyup", e => { if(e.key === " " || e.key === "Enter") up(); });
    });
  }
  function initMapa(){
    const dlg = document.getElementById("mdlg"); if(!dlg) return;
    const view = document.getElementById("mview"), zb = document.getElementById("mzoom"), z = zb.dataset.z.split("|");
    const setZoom = on => { view.classList.toggle("zoom", on); zb.textContent = on ? z[1] : z[0]; };
    document.querySelectorAll(".map .hot").forEach(h => h.addEventListener("click", () => dlg.showModal()));
    zb.addEventListener("click", () => setZoom(!view.classList.contains("zoom")));
    document.getElementById("mbig").addEventListener("click", () => setZoom(!view.classList.contains("zoom")));
    document.getElementById("mclose").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", e => { if(e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => setZoom(false));
  }
  // carpeta animada: bucle de 7 s; se escala al ancho del panel (diseño base 1080 px), se pausa fuera de pantalla y, con «reducir movimiento», se queda en un fotograma fijo
  function initCarpeta(){
    const N = 5, T = 7, HID = 670, cfg = [{ x: -320, top: 395, r: -10 }, { x: -160, top: 335, r: -5 }, { x: 0, top: 295, r: 0 }, { x: 160, top: 335, r: 5 }, { x: 320, top: 395, r: 10 }], order = [2, 1, 3, 0, 4];
    const clamp = t => Math.min(Math.max(t, 0), 1), out3 = t => 1 - Math.pow(1 - clamp(t), 3), over = t => { t = clamp(t); const c1 = 1.45, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
    document.querySelectorAll(".fold").forEach(box => {
      const fs = box.querySelector(".fs"), host = box.querySelector(".f-tiles"), tiles = [];
      box.dataset.logos.split(",").slice(0, N).forEach((u, i) => { const d = document.createElement("div"); d.className = "f-tile"; d.innerHTML = `<img alt="" src="${u}">`; host.appendChild(d); tiles.push(d); });
      const fit = () => { fs.style.transform = `scale(${box.clientWidth / 1080})`; };
      fit(); if("ResizeObserver" in window) new ResizeObserver(fit).observe(box); else addEventListener("resize", fit);
      const render = time => {
        const t = ((time % T) + T) % T;
        tiles.forEach((el, i) => {
          const k = order.indexOf(i), up = over((t - (0.55 + k * 0.26)) / 1.0), dn = out3((t - (5.5 + (4 - k) * 0.13)) / 0.75), p = Math.max(0, up) * (1 - dn), bob = Math.sin(t * 2.1 + i * 1.4) * 7 * clamp(p) * (1 - dn), cf = cfg[i], y = HID + (cf.top - HID) * p + bob;
          el.style.transform = `translate(${cf.x * clamp(p)}px,${y}px) rotate(${cf.r * clamp(p)}deg) scale(${0.86 + 0.14 * clamp(p)})`; el.style.zIndex = 1 + (4 - Math.abs(i - 2));
        });
      };
      if(PORT.reduced || !("IntersectionObserver" in window)){ render(4.2); return; }
      let raf = 0, t0 = 0; const loop = n => { if(!t0) t0 = n; render((n - t0) / 1000); raf = requestAnimationFrame(loop); };
      render(0); new IntersectionObserver(es => { if(es[0].isIntersecting){ if(!raf){ t0 = 0; raf = requestAnimationFrame(loop); } } else { cancelAnimationFrame(raf); raf = 0; } }, { threshold: .1 }).observe(box);
    });
  }
  // navegador interactivo: tres fases (pestañas) y las páginas de cada una (botones); la página se desplaza dentro de la ventana
  function initSafari(){
    const lang = PORT.lang === "en" ? "en" : "es";
    document.querySelectorAll(".saf").forEach(box => {
      const slug = box.dataset.slug, cfg = SAFARI[slug] && SAFARI[slug][box.dataset.k]; if(!cfg) return;
      const sv = box.querySelector(".sv"), img = sv.querySelector("img"), sc = box.querySelector(".sc"), tabs = [...box.querySelectorAll(".spb")], base = "img/" + slug + "/web/";
      let ph = 0, pg = 0, tk = 0;
      const pre = n => { const i = new Image(); i.src = base + n + ".webp?v=3"; };
      const show = (instant) => {
        const q = cfg.phases[ph].p[pg], ix = lang === "en" ? 2 : 1, al = lang === "en" ? 4 : 3, ticket = ++tk;
        const swap = () => { if(ticket !== tk) return; img.src = base + q[0] + ".webp?v=3"; img.alt = q[al]; sv.scrollTop = 0; sv.style.setProperty("--o", 1); };
        if(instant || PORT.reduced){ swap(); return; }
        sv.style.setProperty("--o", 0); setTimeout(swap, 140);
      };
      const chips = () => { sc.innerHTML = cfg.phases[ph].p.map((q, i) => `<button type="button" class="spc" data-i="${i}" aria-pressed="${i === pg}">${q[lang === "en" ? 2 : 1]}</button>`).join(""); };
      const pick = (i, focus) => { ph = i; pg = 0; tabs.forEach((t, k) => { t.setAttribute("aria-selected", k === i); t.tabIndex = k === i ? 0 : -1; }); chips(); show(); cfg.phases[i].p.slice(1, 3).forEach(q => pre(q[0])); if(focus) tabs[i].focus(); };
      tabs.forEach((t, i) => {
        t.addEventListener("click", () => pick(i));
        t.addEventListener("pointerenter", () => pre(cfg.phases[i].p[0][0]));
        t.addEventListener("keydown", e => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if(d){ e.preventDefault(); pick((i + d + tabs.length) % tabs.length, true); } });
      });
      sc.addEventListener("click", e => { const b = e.target.closest(".spc"); if(!b) return; pg = +b.dataset.i; sc.querySelectorAll(".spc").forEach((c, k) => c.setAttribute("aria-pressed", k === pg)); show(); });
      chips(); show(true); pre(cfg.phases[1].p[0][0]); pre(cfg.phases[2].p[0][0]);
    });
  }
  window.CAP = { render, init: () => { init(); initMapa(); initCarpeta(); initSafari(); } };
})();
