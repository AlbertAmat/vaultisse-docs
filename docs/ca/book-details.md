# Detalls del llibre i estoc

![La pàgina de detalls d'un llibre, amb la seva informació i la taula d'estoc](/screenshots/book-details.png)

Cada llibre té la seva pròpia pàgina amb dues parts: la **informació** del llibre i la llista dels seus **exemplars** físics (anomenats "estoc"). La pàgina s'obre en mode de només lectura — fes clic a **Editar**, a la cantonada superior dreta, per canviar-hi res.

## Informació del llibre

En mode de visualització veus el **nom**, l'**ISBN**, la **categoria**, l'**idioma**, el **format**, el **nombre de pàgines**, l'**editorial**, la **data de publicació**, els **autors** i la **descripció** del llibre, amb un guionet on no s'hagi omplert res.

Fes clic a **Editar** per convertir tot això en un formulari editable:

![La pàgina de detalls del llibre en mode d'edició](/screenshots/book-edit-mode.png)

- La **Categoria** i l'**Idioma** es trien de les llistes que gestiones a [Categories](./categories-and-authors).
- **Autors** — comença a escriure un nom per cercar autors existents, o afegeix-ne un de nou sobre la marxa.
- **Imatge de portada** — mostrada a la dreta; passa-hi el ratolí per sobre per canviar-la.

Mentre edites, els botons de dalt a la dreta es converteixen en **Cancel·la** (descarta els canvis) i **Desar** (que només s'activa un cop has canviat realment alguna cosa). La **icona de paperera** del costat elimina el llibre completament, en qualsevol dels dos modes — se't demanarà confirmació prèviament.

## Entendre l'estoc

Un títol de llibre pot existir al teu catàleg amb **zero, un o diversos exemplars físics**. Cada exemplar és una fila diferent a la taula d'**Estoc**, amb el seu propi:

- **Codi** — l'identificador únic imprès a l'etiqueta de codi de barres d'aquest exemplar.
- **Ubicació** — on es troba aquest exemplar en concret (consulta [Ubicacions](./locations)).
- **Estat**:
  - 🔵 **Reservat** — actualment en préstec a un client. Només es pot triar si els [Préstecs](./settings#funcionalitats) estan activats al teu compte.
  - 🟢 **Disponible** — al prestatge, a punt per ser agafat en préstec.
  - ⚪ **No disponible** — temporalment fora de circulació.
  - 🟠 **Malmès** — danyat i no es pot deixar en préstec.
- **Reservat per** — el client que té actualment aquest exemplar, mostrat només quan els Préstecs estan activats.

## Afegir un exemplar

Fes clic a **Afegir**, a sobre de la taula d'Estoc, tria un **estat** i una **ubicació**, i (si els Préstecs estan activats i el marques com a Reservat) selecciona quin **client** el té.

![El diàleg Afegir exemplar](/screenshots/add-stock-dialog.png)

Pots:

- **Afegir** — només crear l'exemplar, o
- **Afegir i imprimir** — crear-lo i posar la seva etiqueta de codi de barres a la cua d'impressió immediatament (consulta [Imprimir etiquetes](./printing-labels)).

## Editar o eliminar un exemplar

Fes servir les accions de fila a la dreta de cada entrada d'estoc:

- 🖨️ Afegeix l'etiqueta d'aquest exemplar a la **cua d'impressió**.
- ✏️ **Edita** el seu estat, ubicació o client assignat.
- 🗑️ **Elimina** l'exemplar (amb confirmació).

> **Consell:** Per deixar un exemplar en préstec a algú, marca'n l'estat com a **Reservat** i tria un client aquí, o bé fes servir el flux de préstec des de la fila d'un client — consulta [Préstecs i devolucions](./lending-and-returns).

## Fitxers digitals

Posa el **Format** d'un llibre a **Electrònic** per mostrar una targeta d'**Fitxers digitals** al costat de la imatge de portada, on pots fer còpia de seguretat dels fitxers reals — útil si els has baixat i transferit a un lector electrònic, ja que aleshores el lector es converteix en l'únic lloc on viuen.

![La targeta de Fitxers digitals, amb una zona per arrossegar i deixar anar](/screenshots/ebook-files.png)

- Fes clic a **Afegir**, o arrossega i deixa anar, per pujar un fitxer **epub, pdf, mobi o azw3**.
- A diferència de la resta del llibre, cada tipus de fitxer es conserva de manera independent — pots tenir un epub *i* un pdf en còpia de seguretat alhora per al mateix llibre; pujar un fitxer nou d'un tipus que ja tens substitueix només aquell.
- Cada fitxer pujat té la seva pròpia fila amb una icona, el nom del fitxer, la mida i la data de pujada, més les accions de **vista prèvia** (icona d'ull, obre un diàleg — els PDF i EPUB es passen de pàgina allà mateix, amb un botó de pantalla completa), **descàrrega** i **eliminació**.
- La mida màxima de fitxer depèn de com estigui configurat el teu servidor de Vaultisse — pregunta a qui el gestioni si una pujada es rebutja per ser massa gran.

Això està pensat purament com a còpia de seguretat personal de fitxers dels quals ja tens els drets — no com un lloc per obtenir llibres d'altres fonts.
