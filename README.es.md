<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Lee el chat de cualquier chat de Twitch en tu idioma y responde en el del canal.<br>
Gratis, sin cuenta, nada que configurar. 43 idiomas, en el chat y en la propia extensión.

**[Descargar la última versión](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge y Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Polski](README.pl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Mensajes de chat en español llegan uno a uno, cada uno con su traducción al inglés debajo; luego se escribe una respuesta en inglés, aparece una vista previa en español sobre la caja de chat y Tab la sustituye" width="360">

</div>

## Cómo funciona

1. Instálala y abre cualquier stream de Twitch. Una barra morada en la parte superior del chat indica que está activa.
2. Cada mensaje recibe su traducción justo debajo según va llegando, en el idioma de tu navegador. Tanto en
   directos, VOD y clips.
3. Escribe una respuesta en tu idioma. Una vista previa sobre la caja de chat la muestra en el idioma del
   canal: pulsa Tab o haz clic en ella, y esa versión sustituye lo que escribiste.

El idioma del canal es el que el streamer ha definido en Twitch, así que no hay nada que configurar. Ambos idiomas se pueden
cambiar en los ajustes, y el idioma de lectura se puede recordar por canal.

Si usas también 7TV o BTTV, ellos usan Tab para terminar un emote. Entonces Tab termina primero el emote e
inserta la traducción solo cuando no había nada que terminar. Ctrl/Cmd+Intro y un clic siempre la insertan.

## Qué incluye

- **43 idiomas**, incluidos los que se escriben de derecha a izquierda (árabe, hebreo, persa), con las
  variantes regionales por separado (portugués de Brasil y de Portugal, chino simplificado y tradicional, cantonés)
- **En todo sitio donde hay chat**: chat en directo, popout, embed, vista de moderador, gestor del stream, repetición
  de VOD y de clips, en www.twitch.tv, m.twitch.tv y dashboard.twitch.tv, con o sin 7TV, BTTV y FFZ
- **La extensión también los habla**: ajustes, ventana emergente y barra del chat en los 43, que se eligen en un menú con banderas
- **Gratis de serie** con Google Translate. Añade tu propia clave gratuita de DeepL para mejorar los idiomas
  europeos; MyMemory y Lingva toman el relevo cuando un motor falla
- **Traducción en el dispositivo** en Chrome y Edge cuando el navegador la ofrece: sin red, sin cuota, y
  el texto nunca sale de tu ordenador
- **Filtros**: omitir bots, silenciar usuarios o canales, ocultar las líneas que contengan una palabra,
  traducir solo los idiomas que elijas
- **Pensada para chats rápidos**: los nombres de emotes de los sets de 7TV, BTTV y FFZ del canal nunca se
  traducen, aunque no uses esas extensiones, los enlaces y las @menciones se apartan antes de enviar nada, un
  glosario para los nombres que los motores destrozan, una caché de traducciones
- **Cuatro estilos de visualización**: debajo del mensaje, en la misma línea, en su lugar, o solo al pasar el ratón
- **Pausa un canal** desde la barra del chat sin detener los demás. Al cambiar de canal o actualizar la
  extensión, las pestañas abiertas siguen traduciendo, sin recargar
- **Atenta a la moderación**: un mensaje eliminado por un moderador, un timeout o un ban pierde también su traducción
- **Con el aspecto de Twitch**: morado, y sigue el tema oscuro o claro del propio chat salvo que elijas uno
- Chrome, Brave, Edge y Firefox

| El chat, traducido mientras avanza | La ventana de la barra de herramientas |
|---|---|
| <img src="screenshots/chat.png" alt="Chat de Twitch donde cada mensaje en español lleva debajo su traducción al inglés, con la barra de estado de la extensión encima de la lista" width="360"> | <img src="screenshots/popup.png" alt="La ventana de la extensión con el idioma de destino, el estilo de visualización, el ajuste de la vista previa de redacción y la cadena de proveedores" width="360"> |

| Lo que escribes, antes de enviarlo | Elige un idioma, o deja que elija |
|---|---|
| <img src="screenshots/compose.png" alt="La caja de chat con un mensaje en inglés y, encima, una vista previa con la versión en español que se enviará" width="360"> | <img src="screenshots/languages.png" alt="Una cuadrícula con buscador de banderas y nombres de idiomas, con el idioma del canal primero" width="360"> |

<sub>Capturas de la versión publicada en una sala de chat que este repositorio se inventa: los nombres y los
mensajes son ficticios y las traducciones se responden en local, así que ningún usuario real aparece aquí.</sub>

## Instalación

Descarga el zip de tu navegador en [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) y descomprímelo.

- Chrome, Brave, Edge (`…-chromium.zip`): abre `chrome://extensions`, activa el Modo de desarrollador, haz clic en Cargar descomprimida y elige la carpeta.
- Firefox 121+ (`…-firefox.zip`): abre `about:debugging#/runtime/this-firefox`, haz clic en Cargar complemento temporal y elige `manifest.json`.
  Firefox olvida un complemento temporal cuando se reinicia.

Una copia instalada así no se actualiza sola: su icono muestra una insignia cuando hay una versión
nueva, y la ventana enlaza a la última release.

## Motores de traducción

Cuatro proveedores encadenados: cuando uno falla, el siguiente toma el relevo. El orden lo decides tú.

| Proveedor | Clave | Nota |
|---|---|---|
| Google | ninguna | el predeterminado, funciona de serie |
| DeepL | gratuita | la mejor en idiomas europeos, [clave gratuita](https://www.deepl.com/pro-api) para 1 millón de caracteres al mes |
| MyMemory | ninguna | respaldo |
| Lingva | ninguna | respaldo, en una instancia pública salvo que apuntes a la tuya |

El traductor integrado de Chromium no necesita red ni cuota. Chrome y Edge 138 y posteriores pueden ofrecerlo,
aunque no todas las copias lo hacen, y cada par de idiomas necesita descargar su modelo una vez, con un clic
desde la barra. Firefox no lo tiene. Donde falta, la cadena en la nube toma el relevo y nada se rompe.

## Ajustes

Haz clic en el engranaje de la barra del chat, o clic derecho en el icono de la extensión y Opciones.

- **Proveedores**: orden de los motores, tu clave de DeepL y el modo: primero en el dispositivo, primero en la
  nube, o solo en el dispositivo
- **Visualización**: idioma de destino, estilo de visualización, texto original e insignia del idioma, tamaño
  del texto, interlineado, tipografía, color de acento, tema del chat, la vista previa de redacción y qué hace
  al hacer clic en ella
- **Filtros**: bots, usuarios, canales, palabras clave, idiomas de origen, y un glosario de reemplazos
- **Avanzado**: tamaño y duración de la caché, peticiones simultáneas, límite por canal, copia de seguridad y restauración
- **Actividad**: mensajes traducidos, aciertos de caché, cada idioma visto en el chat, y por qué cada una de las
  últimas 50 líneas se tradujo o no
- **Teclado**: Alt+Mayús+T activa o desactiva la traducción del chat (Alt+T es el modo cine de Twitch), Alt+W la
  vista previa de redacción. Ambos se pueden reasignar en los atajos de extensiones de tu navegador
- El botón de idioma en la barra de acciones del chat, bajo la caja de mensajes: un clic abre la lista de idiomas
  en los que escribes, escribir la filtra. El de la parte superior del chat fija el idioma en el que lees

## Idiomas

Inglés · Francés · Español · Portugués · Portugués (Brasil) · Alemán · Italiano · Neerlandés · Polaco · Sueco · Checo · Eslovaco · Rumano · Ruso · Ucraniano · Turco · Árabe · Hebreo · Japonés · Coreano · Chino (simplificado) · Chino (tradicional) · Tailandés · Vietnamita · Indonesio · Hindi · Finés · Noruego · Danés · Griego · Húngaro · Búlgaro · Catalán · Esloveno · Estonio · Lituano · Letón · Persa · Bengalí · Tamil · Malayo · Filipino · Cantonés

El chat se traduce a cualquiera de ellos, y la interfaz de la propia extensión está disponible en todos.

## Privacidad

Sin cuenta, sin servidor propio y sin analítica salvo que aceptes un recuento diario anónimo enviado a Google Analytics (motores usados, errores, velocidad, nunca tus mensajes, nombres ni canales). Los mensajes del chat, y tu borrador mientras la vista previa de redacción está activada, van al proveedor de
traducción que elegiste y a ningún otro sitio, y en modo dispositivo ni siquiera ahí. Para saber el idioma del
canal pregunta a Twitch por el idioma de emisión y el id del canal, y para mantener los nombres de emotes fuera de
las traducciones pregunta a 7TV, BetterTTV y FrankerFaceZ por los nombres de emotes del canal, lo que les dice el
id de ese canal y nada más. Una copia instalada desde una tienda no hace ninguna otra petición. Una copia
instalada a mano pregunta a GitHub la última etiqueta de release, como mucho cada seis horas, para saber si
mostrar su insignia de actualización. [Detalles](PRIVACY.md)

## Preguntas frecuentes

**Los mensajes no se traducen.**
Abre la pestaña Actividad en los ajustes y pulsa "Leer decisiones": muestra las últimas 50 líneas y por qué
cada una se tradujo o no. La mayoría de las líneas omitidas se omiten a propósito: el mismo usuario repitiéndose, líneas demasiado cortas,
solo emojis o risas, o ya en tu idioma de lectura. Si la pestaña no muestra nada, la extensión no ve el chat: abre una incidencia.

**La barra morada desapareció.**
Recarga la página. Si vuelve a pasar, abre una [incidencia](https://github.com/kilworks/twitch-chat-translator/issues)
con el canal y lo que hiciste antes.

**¿Cómo consigo mejores traducciones?**
Añade una clave gratuita de DeepL en los ajustes. El plan gratuito cubre un millón de caracteres al mes, y
DeepL solo se gasta en los pares de idiomas donde supera a los motores gratuitos.

**¿Qué estilo de visualización uso?**
Debajo del mensaje. Los otros tres funcionan y todavía se están ajustando.

**¿Puedo usar la extensión en mi idioma?**
Sí. Sigue el idioma de tu navegador, y el menú de la parte superior de los ajustes la cambia a cualquiera de
los 43.

**¿Funciona con 7TV, BTTV y FFZ?**
Sí, con cualquiera de ellos o con ninguno. Los nombres de sus emotes se quedan fuera de las traducciones.

**¿Funciona en VOD y clips?**
Sí, igual que en directo.

**Dejó de funcionar tras una actualización de Twitch.**
Twitch cambia a veces la estructura de su chat. Abre una [incidencia](https://github.com/kilworks/twitch-chat-translator/issues)
y se corrige.

**¿La hace Twitch?**
No. Es un proyecto independiente de código abierto, sin relación con Twitch.

## Novedades

En la 1.0.0, la primera versión para Twitch:

- Lee el chat de Twitch en sus tres formas: la lista propia de Twitch (también con BTTV y FFZ), la lista de 7TV, y la repetición de VOD y clips, en popout, embed, vista de moderador, gestor del stream y móvil
- Escribe las traducciones en la caja de mensajes con los emotes conservados como palabras, y nunca traduce los nombres de emotes de los sets de 7TV, BTTV y FFZ del canal
- El idioma del canal viene de Twitch, un mensaje eliminado pierde su traducción, y el aspecto es morado y sigue el chat oscuro o claro de Twitch
- Alt+Mayús+T activa o desactiva la traducción, Tab inserta la traducción solo cuando 7TV o BTTV no acaban de completar un emote, y el botón de idioma está en la barra de acciones bajo la caja de mensajes

Cada versión, con lo que cambió y la medición detrás:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) y [CHANGELOG.md](CHANGELOG.md).

## Desarrollo

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, tests unitarios, build: el control por el que pasa cada paquete
npm run build:firefox    # build de Firefox, en la misma carpeta dist/
npm run package:all      # los dos zips, en release/
npm run dev              # HMR
```

Los builds son reproducibles: el mismo commit da zips idénticos byte a byte en cualquier máquina,
comprobado construyendo un `git archive` de la etiqueta en una carpeta vacía y comparando los hashes.

Además de los tests unitarios, las pruebas sin red cargan la extensión construida en un navegador real, la
manejan y comprueban lo que hace, con la página y el motor de traducción servidos en local. Necesitan
Playwright, que a propósito no es una dependencia: apunta `UX_KIT` a una carpeta cuyo `node_modules` lo
contenga, o ejecuta `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # todas las pruebas sin red, sin ventana
node test/e2e/store-shots-fixture.mjs --lang=ja         # las capturas de la tienda, en un idioma de ficha
node test/e2e/store-shots-fixture.mjs --gif             # capturas de la tienda en inglés, las imágenes del README y este GIF
```

Los textos de la interfaz están en `src/shared/i18n/` (ventana y opciones, indexados por el texto en inglés) y
`src/content/i18n/` (barra del chat, indexados por id con el texto en inglés como respaldo), un archivo por
idioma; los tests exigen a cada archivo el conjunto completo de claves. Los textos de las tiendas están en
[store/](store/), y una release es una etiqueta de versión: la CI la construye, la comprueba y la publica en
las dos tiendas.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Proyectos relacionados

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), el mismo traductor para el chat de Kick, del mismo autor

## Licencia

MIT. Sin relación con Twitch.
