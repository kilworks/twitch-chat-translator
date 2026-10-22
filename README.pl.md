<div align="center">

<img src="public/icons/icon128.png" alt="" width="80" height="80">

# Twitch Chat Translator

Czytaj czat każdego streama na Twitchu w swoim języku, a odpowiadaj w języku kanału.<br>
Za darmo, bez konta, bez konfiguracji. 43 języki, w czacie i w samym rozszerzeniu.

**[Pobierz najnowsze wydanie](https://github.com/kilworks/twitch-chat-translator/releases/latest)** &nbsp;·&nbsp; Chrome, Brave, Edge i Firefox

[![CI](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/kilworks/twitch-chat-translator/actions/workflows/ci.yml)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[English](README.md) · [Français](README.fr.md) · [Español](README.es.md) · [Português (Portugal)](README.pt-PT.md) · [Português (Brasil)](README.pt-BR.md) · [Deutsch](README.de.md) · [Italiano](README.it.md) · [Nederlands](README.nl.md) · [Svenska](README.sv.md) · [Čeština](README.cs.md) · [Slovenčina](README.sk.md) · [Română](README.ro.md) · [Русский](README.ru.md) · [Українська](README.uk.md) · [Türkçe](README.tr.md) · [العربية](README.ar.md) · [עברית](README.he.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [ไทย](README.th.md) · [Tiếng Việt](README.vi.md) · [Bahasa Indonesia](README.id.md) · [हिन्दी](README.hi.md) · [Suomi](README.fi.md) · [Norsk](README.no.md) · [Dansk](README.da.md) · [Ελληνικά](README.el.md) · [Magyar](README.hu.md) · [Български](README.bg.md) · [Català](README.ca.md) · [Slovenščina](README.sl.md) · [Eesti](README.et.md) · [Lietuvių](README.lt.md) · [Latviešu](README.lv.md) · [فارسی](README.fa.md) · [বাংলা](README.bn.md) · [தமிழ்](README.ta.md) · [Bahasa Melayu](README.ms.md) · [Filipino](README.tl.md) · [粵語](README.yue.md)

<img src="screenshots/demo.gif" alt="Hiszpańskie wiadomości z czatu wpadają jedna po drugiej, każda z angielskim tłumaczeniem pod spodem; potem ktoś pisze odpowiedź po angielsku, nad polem czatu pojawia się hiszpański podgląd, a Tab go wstawia" width="360">

</div>

## Jak to działa

1. Zainstaluj rozszerzenie i otwórz dowolny stream na Twitchu. Fioletowy pasek na górze czatu pokazuje, że działa.
2. Każda wiadomość dostaje tłumaczenie tuż pod sobą, gdy tylko się pojawi, w języku Twojej przeglądarki.
   Tak samo na streamach na żywo, w VOD-ach i w klipach.
3. Napisz odpowiedź w swoim języku. Podgląd nad polem czatu pokaże ją w języku kanału: naciśnij Tab albo
   kliknij podgląd, a ta wersja zastąpi to, co wpisałeś.

Język kanału to ten, który streamer ustawił na Twitchu, więc nic nie trzeba ustawiać. Oba języki można zmienić
w ustawieniach, a język czytania można zapamiętać osobno dla każdego kanału.

Jeśli używasz też 7TV lub BTTV, one również używają Tab do dokończenia emotki. Wtedy Tab najpierw dokańcza emotkę, a tłumaczenie wstawia tylko wtedy, gdy nie było nic do dokończenia. Ctrl/Cmd+Enter i kliknięcie zawsze je wstawiają.

## Co dostajesz

- **43 języki**, także pisane od prawej do lewej (arabski, hebrajski, perski), z osobnymi wariantami
  regionalnymi (portugalski brazylijski i europejski, chiński uproszczony i tradycyjny, kantoński)
- **Wszędzie tam, gdzie jest czat**: czat na żywo, popout, osadzony czat, widok moderatora, stream manager, powtórki VOD i klipów, na
  www.twitch.tv, m.twitch.tv i dashboard.twitch.tv, z 7TV, BTTV i FFZ albo bez nich
- **Rozszerzenie mówi nimi też samo**: ustawienia, popup i pasek czatu we wszystkich 43, do wyboru z menu
  z flagami
- **Za darmo od razu** dzięki Google Translate. Dodaj własny darmowy klucz DeepL, żeby lepiej tłumaczyć
  języki europejskie; gdy któryś silnik padnie, przejmują MyMemory i Lingva
- **Tłumaczenie na urządzeniu** w Chrome i Edge, jeśli przeglądarka je oferuje: bez sieci, bez limitu,
  a tekst nigdy nie opuszcza Twojego komputera
- **Filtry**: pomijanie botów, wyciszanie użytkowników lub kanałów, ukrywanie linii zawierających dane
  słowo, tłumaczenie tylko wybranych języków
- **Stworzone pod szybkie czaty**: nazw emotek z zestawów 7TV, BTTV i FFZ kanału nigdy się nie tłumaczy, nawet jeśli
  nie używasz tych rozszerzeń, linki i @wzmianki są odkładane na bok, zanim cokolwiek zostanie wysłane, jest słownik
  na nicki i nazwy, które silniki przekręcają, i pamięć podręczna tłumaczeń
- **Cztery style wyświetlania**: pod wiadomością, w tej samej linii, zamiast niej albo tylko po najechaniu
- **Wstrzymaj jeden kanał** z paska czatu, nie zatrzymując pozostałych. Zmiana kanału lub aktualizacja
  rozszerzenia nie przerywa tłumaczenia w otwartych kartach, bez przeładowania
- **Z uwzględnieniem moderacji**: wiadomość usunięta przez moderatora, timeout lub ban odbierają jej też tłumaczenie
- **Wygląda jak Twitch**: fiolet, a motyw czatu, jasny albo ciemny, podąża za samym czatem, chyba że wybierzesz własny
- Chrome, Brave, Edge i Firefox

| Czat tłumaczony w trakcie przewijania | Popup na pasku narzędzi |
|---|---|
| <img src="screenshots/chat.png" alt="Czat na Twitchu, w którym każda hiszpańska wiadomość ma pod sobą angielskie tłumaczenie, z paskiem stanu rozszerzenia nad listą" width="360"> | <img src="screenshots/popup.png" alt="Popup rozszerzenia z językiem docelowym, stylem wyświetlania, ustawieniem podglądu przy pisaniu i łańcuchem dostawców" width="360"> |

| To, co piszesz, zanim to wyślesz | Wybierz język albo pozwól, żeby wybrał się sam |
|---|---|
| <img src="screenshots/compose.png" alt="Pole pisania z angielską wiadomością i podglądem nad nim, pokazującym hiszpańską wersję, która zostanie wysłana" width="360"> | <img src="screenshots/languages.png" alt="Siatka flag i nazw języków z wyszukiwarką, z językiem kanału na pierwszym miejscu" width="360"> |

<sub>Zrobione na wydanej wersji, w pokoju czatu, który to repozytorium samo sobie tworzy: nazwy użytkowników
i wiadomości są zmyślone, a tłumaczenia odpowiadane lokalnie, więc na tej stronie nie ma nicku żadnego
prawdziwego człowieka.</sub>

## Instalacja

Pobierz zip dla swojej przeglądarki z [Releases](https://github.com/kilworks/twitch-chat-translator/releases/latest) i rozpakuj go.

- Chrome, Brave, Edge (`…-chromium.zip`): otwórz `chrome://extensions`, włącz tryb dewelopera, kliknij Załaduj rozpakowane, wybierz folder.
- Firefox 121+ (`…-firefox.zip`): otwórz `about:debugging#/runtime/this-firefox`, kliknij Załaduj tymczasowy dodatek, wybierz `manifest.json`.
  Firefox zapomina tymczasowy dodatek po ponownym uruchomieniu.

Kopia zainstalowana w ten sposób nie aktualizuje się sama: gdy jest nowsza wersja, na jej
ikonie pojawia się plakietka, a popup prowadzi do najnowszego wydania.

## Silniki tłumaczeń

Czterech dostawców w łańcuchu: gdy jeden zawodzi, przejmuje następny. Kolejność ustawiasz sam.

| Dostawca | Klucz | Uwaga |
|---|---|---|
| Google | brak | domyślny, działa od razu |
| DeepL | darmowy | najlepszy dla języków europejskich, [darmowy klucz](https://www.deepl.com/pro-api) na 1 milion znaków miesięcznie |
| MyMemory | brak | zapasowy |
| Lingva | brak | zapasowy, na publicznej instancji, chyba że wskażesz własną |

Wbudowany tłumacz Chromium nie potrzebuje sieci ani limitu. Mogą go oferować Chrome i Edge od wersji 138, ale nie
każda kopia go ma, a każda para języków wymaga jednorazowego pobrania modelu, jednym kliknięciem z paska. Firefox go
nie ma. Wszędzie tam, gdzie go brakuje, przejmuje łańcuch w chmurze i nic się nie psuje.

## Ustawienia

Kliknij zębatkę na pasku czatu albo kliknij ikonę rozszerzenia prawym przyciskiem i wybierz Opcje.

- **Dostawcy**: kolejność silników, Twój klucz DeepL i tryb: najpierw na urządzeniu, najpierw chmura albo tylko na urządzeniu
- **Wyświetlanie**: język docelowy, styl wyświetlania, tekst oryginalny i plakietka języka, rozmiar tekstu, odstęp między wierszami,
  czcionka, kolor wiodący, motyw czatu, podgląd przy pisaniu i to, co robi kliknięcie w niego
- **Filtry**: boty, użytkownicy, kanały, słowa kluczowe, języki źródłowe i słownik zamienników
- **Zaawansowane**: rozmiar i czas życia pamięci podręcznej, równoległe zapytania, limit zapytań na kanał, kopia zapasowa i przywracanie
- **Aktywność**: przetłumaczone wiadomości, trafienia w pamięci podręcznej, każdy język widziany na czacie i powód,
  dla którego każda z ostatnich 50 linii została przetłumaczona albo pominięta
- **Klawiatura**: Alt+Shift+T włącza i wyłącza tłumaczenie czatu (Alt+T to tryb kinowy Twitcha), Alt+W podgląd przy
  pisaniu. Oba skróty można zmienić w skrótach rozszerzeń Twojej przeglądarki
- Przycisk języka na pasku akcji czatu, pod polem wiadomości: jedno kliknięcie otwiera listę języków, w których
  piszesz, wpisywanie ją filtruje. Ten na górze czatu ustawia język, w którym czytasz

## Obsługiwane języki

angielski · francuski · hiszpański · portugalski · portugalski (Brazylia) · niemiecki · włoski · niderlandzki · polski · szwedzki · czeski · słowacki · rumuński · rosyjski · ukraiński · turecki · arabski · hebrajski · japoński · koreański · chiński (uproszczony) · chiński (tradycyjny) · tajski · wietnamski · indonezyjski · hindi · fiński · norweski · duński · grecki · węgierski · bułgarski · kataloński · słoweński · estoński · litewski · łotewski · perski · bengalski · tamilski · malajski · filipiński · kantoński

Czat tłumaczy się na każdy z nich, a interfejs samego rozszerzenia jest dostępny w każdym z nich.

## Prywatność

Żadnego konta, żadnego serwera i żadnych analiz, chyba że zgodzisz się na codzienne anonimowe zliczanie wysyłane do Google Analytics (wykorzystane silniki, błędy, prędkość, nigdy Twoje wiadomości, nazwy i kanały). Wiadomości z czatu, a przy włączonym podglądzie przy pisaniu także Twój szkic, trafiają do wybranego dostawcy tłumaczeń
i nigdzie indziej, a w trybie na urządzeniu nawet tam nie. Żeby poznać język kanału, pyta Twitcha o język nadawania i id kanału, a żeby nazwy emotek nie trafiały do tłumaczeń, pyta 7TV, BetterTTV i FrankerFaceZ o nazwy emotek kanału, co mówi im id tego kanału i nic więcej. Kopia zainstalowana ze sklepu nie wysyła żadnych
innych zapytań. Kopia zainstalowana ręcznie pyta GitHub o tag najnowszego wydania, najwyżej co sześć godzin,
żeby wiedzieć, czy pokazać plakietkę aktualizacji. [Szczegóły](PRIVACY.md)

## FAQ

**Wiadomości się nie tłumaczą.**
Otwórz kartę Aktywność w ustawieniach i naciśnij "Odczytaj decyzje": zobaczysz ostatnie 50 linii i powód, dla
którego każda została przetłumaczona albo pominięta. Większość pominiętych linii jest pomijana celowo: ten sam użytkownik
powtarzający się, linie zbyt krótkie, same emoji albo śmiech, albo już w Twoim języku czytania. Jeśli karta nie
pokazuje nic, rozszerzenie nie widzi czatu: otwórz zgłoszenie.

**Fioletowy pasek zniknął.**
Odśwież stronę. Jeśli to się powtórzy, otwórz [zgłoszenie](https://github.com/kilworks/twitch-chat-translator/issues)
z nazwą kanału i opisem tego, co robiłeś wcześniej.

**Jak uzyskać lepsze tłumaczenia?**
Dodaj w ustawieniach darmowy klucz DeepL. Darmowy limit to milion znaków miesięcznie, a DeepL jest używany
tylko dla par języków, w których pokonuje darmowe silniki.

**Jakiego stylu wyświetlania użyć?**
Pod wiadomością. Pozostałe trzy działają, ale są jeszcze dopracowywane.

**Czy mogę używać rozszerzenia w swoim języku?**
Tak. Rozszerzenie podąża za językiem przeglądarki, a menu na górze ustawień przełącza je na dowolny
z 43.

**Czy działa z 7TV, BTTV i FFZ?**
Tak, z każdym z nich albo bez żadnego. Nazwy ich emotek nie trafiają do tłumaczeń.

**Czy działa w VOD-ach i klipach?**
Tak, tak samo jak na streamach na żywo.

**Przestało działać po aktualizacji Twitcha.**
Twitch czasem zmienia budowę swojego czatu. Otwórz [zgłoszenie](https://github.com/kilworks/twitch-chat-translator/issues)
i zostanie to poprawione.

**Czy to robi Twitch?**
Nie. To niezależny projekt open source, niezwiązany z Twitchem.

## Co nowego

W wersji 1.0.0, pierwszym wydaniu dla Twitcha:

- Czyta czat Twitcha w jego trzech postaciach: własna lista Twitcha (także z BTTV i FFZ), lista 7TV oraz powtórki VOD i klipów, w popoucie, osadzonym czacie, widoku moderatora, stream managerze i na telefonie
- Wpisuje tłumaczenia w pole wiadomości z emotkami zostawionymi jako słowa i nigdy nie tłumaczy nazw emotek z zestawów 7TV, BTTV i FFZ kanału
- Język kanału pochodzi z Twitcha, usunięta wiadomość traci tłumaczenie, a wygląd jest fioletowy i podąża za jasnym lub ciemnym czatem Twitcha
- Alt+Shift+T włącza i wyłącza tłumaczenie, Tab wstawia tłumaczenie tylko wtedy, gdy 7TV lub BTTV nie dokończyły przed chwilą emotki, a przycisk języka jest na pasku akcji pod polem wiadomości

Każde wydanie, z tym, co się zmieniło, i pomiarem, który za tym stoi:
[Releases](https://github.com/kilworks/twitch-chat-translator/releases) i [CHANGELOG.md](CHANGELOG.md).

## Rozwój

```bash
git clone https://github.com/kilworks/twitch-chat-translator.git
cd twitch-chat-translator
npm ci
npm run release:check    # typecheck, lint, unit tests, build: the gate every package goes through
npm run build:firefox    # Firefox build, same dist/ folder
npm run package:all      # both zips, in release/
npm run dev              # HMR
```

Buildy są powtarzalne: ten sam commit daje identyczne bajt w bajt archiwa zip na każdej maszynie, co
sprawdza się, budując `git archive` tagu w pustym folderze i porównując hashe.

Poza testami jednostkowymi bramki offline ładują zbudowane rozszerzenie do prawdziwej przeglądarki,
sterują nim i sprawdzają, co robi, przy stronie serwowanej lokalnie i silniku tłumaczeń odpowiadającym lokalnie.
Potrzebują Playwrighta, który celowo nie jest zależnością: wskaż w `UX_KIT` folder, którego `node_modules`
go zawiera, albo uruchom `npm i -D playwright`.

```bash
node test/e2e/run-gates.mjs --headless                  # all the offline gates, no window
node test/e2e/store-shots-fixture.mjs --lang=ja         # the store screenshots, in one listing language
node test/e2e/store-shots-fixture.mjs --gif             # English store screenshots, the README images and this GIF
```

Teksty interfejsu leżą w `src/shared/i18n/` (popup i opcje, kluczowane angielskim tekstem) oraz
`src/content/i18n/` (pasek czatu, kluczowany id z angielskim tekstem jako zapasowym), po jednym pliku na język;
testy wymagają od każdego pliku pełnego zestawu kluczy. Teksty do sklepów
leżą w [store/](store/), a wydanie to tag wersji: CI buduje, sprawdza i publikuje je w obu sklepach.

Stack: Manifest V3, Vite, TypeScript, Preact, Tailwind.

## Powiązane projekty

- [Kick Chat Translator](https://chromewebstore.google.com/detail/kick-chat-translator/nkkjmbkmacbdkboijmnhjnblcaiclhni) ([Firefox](https://addons.mozilla.org/firefox/addon/kick-chat-translator/)), ten sam tłumacz dla czatu Kicka, od tego samego autora

## Licencja

MIT. Niezwiązane z Twitchem.
