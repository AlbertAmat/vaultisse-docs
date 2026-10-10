# Compartir una biblioteca i rols

Una **biblioteca** (en anglès, *vault*) és un espai que pot fer servir més d'una persona. Cada compte comença amb la seva, i pots convidar altres persones, donar-los un **rol** i decidir exactament què poden veure i canviar. També pots pertànyer a diverses biblioteques i canviar de l'una a l'altra.

## Convidar persones

1. Obre el menú del teu perfil, tria [**Configuració**](./settings#biblioteques) i busca la targeta **Biblioteques**.
2. Fes clic a **Gestiona** a la biblioteca que vols compartir.
3. Copia el seu **Enllaç d'invitació** i envia'l a la persona. Necessita un compte de Vaultisse.
4. La persona obre l'enllaç i fa clic a **Sol·licita unir-t'hi**. Fins que no l'aprovis apareix com a **Pendent** i no pot veure res de la teva biblioteca.
5. A la llista de **Membres** de la biblioteca, aprova la sol·licitud i tria el **rol** de la persona. Pots canviar-lo més endavant, o fer servir **Elimina el membre** per retirar-li l'accés.

> **Nota:** Només un **Admin** pot gestionar membres. Una biblioteca sempre conserva almenys un Admin, així que no pots eliminar ni abaixar de rol l'últim.

## Rols

Hi ha quatre rols. Tria el més baix que cobreixi el que la persona necessita.

![Una quadrícula amb les sis capacitats de cada rol](/diagrams/roles-matrix-ca.svg)

| Capacitat | Només lectura | Borrower | Normal | Admin |
|---|:-:|:-:|:-:|:-:|
| Veure llibres, ubicacions, categories i autors | ✅ | ✅ | ✅ | ✅ |
| Portar el teu propi [estat de lectura](./book-details#estat-de-lectura) | ✅ | ✅ | ✅ | ✅ |
| Rebre llibres en préstec, veure **Els meus préstecs** i el teu historial | — | ✅ | ✅ | ✅ |
| Afegir, importar, editar i esborrar llibres, estoc, ubicacions, categories i autors | — | — | ✅ | ✅ |
| Gestionar clients, deixar i retornar llibres, imprimir etiquetes | — | — | ✅ | ✅ |
| Convidar, aprovar i eliminar membres, canviar rols | — | — | — | ✅ |
| Canviar els ajustos de la biblioteca o eliminar-la | — | — | — | ✅ |

- **Només lectura** — pot mirar la biblioteca i portar la seva pròpia llista de lectura, res més.
- **Borrower** — per a qui *agafa en préstec* llibres de la teva biblioteca, com familiars, amics o alumnes amb compte. Veuen tot el catàleg i exactament el que tenen en préstec.
- **Normal** — ajuda a portar la biblioteca: afegeix i edita llibres, gestiona clients i s'encarrega dels préstecs.
- **Admin** — tot, inclòs qui forma part de la biblioteca.

## Què veu un Borrower

Un Borrower té una versió de Vaultisse només de consulta:

- La **Biblioteca**, les **Ubicacions**, les **Categories** i els **Autors**, i la pàgina de cada llibre, en només lectura. Els botons Afegir, Importar, Editar i Eliminar, l'editor d'estoc i la pujada de portades estan amagats.
- El seu propi **estat de lectura** a qualsevol llibre, amb els prestatges **Per llegir** i **Llegint ara** al menú i al [Tauler de control](./dashboard).
- **Els meus préstecs**, una pàgina amb dues pestanyes: **Préstecs** mostra els llibres que té ara i des de quan, i **Historial de préstecs** mostra tot el que ha agafat en préstec, amb les dates de devolució (o **Encara en préstec**).

**No** veu les pàgines de Clients i Préstecs, els préstecs d'altres persones ni la cua d'impressió — i el servidor també rebutja aquestes peticions, no només s'amaguen els botons.

## Deixar un llibre a un membre de la biblioteca

Un exemplar es pot deixar en préstec a dos tipus de prestatari:

![Els clients i els membres de la biblioteca alimenten el selector de prestatari, que reserva un exemplar i l'anota a l'historial](/diagrams/borrower-model-ca.svg)

- Un [**client**](./customers-and-groups) — només un nom que mantens tu, sense compte. Els clients es poden organitzar en grups.
- Un **membre de la biblioteca** — algú de la teva biblioteca amb el rol Borrower, Normal o Admin (i una invitació aprovada). Els membres no tenen grup.

Per deixar un exemplar, obre la [taula d'Estoc](./book-details#afegir-un-exemplar) del llibre, posa l'exemplar com a **Reservat** i tria la persona a **Reservat per**. La llista mostra junts els teus clients i els membres que poden agafar llibres. Només un membre **Normal** o **Admin** ho pot fer.

Convé saber que:

- El préstec apareix a la pàgina de **Préstecs**, a l'[informe de préstecs](./lending-and-returns#exportar-un-informe-de-prestecs) i a la columna **Reservat per** del llibre com qualsevol altre, i el membre el veu a **Els meus préstecs**.
- Els noms mai es copien: si un membre canvia de nom, o es reanomena un client, els préstecs passats i actuals mostren el nom nou.
- Eliminar un membre de la biblioteca només el treu del selector. Els exemplars que ja té continuen reservats al seu nom fins que es retornin, i el seu historial es conserva.
- Eliminar el **compte** d'un membre retorna a **Disponible** els exemplars que tenia i esborra el seu historial de préstecs. Eliminar un client esborra el seu.
- Un membre **Només lectura**, **Pendent** o **Rebutjat** no apareix al selector.

## L'estat de lectura és personal

Cada persona d'una biblioteca compartida té la seva pròpia llista de lectura. Marcar un llibre com a **Llegit** el canvia només per a tu, i els filtres de la Biblioteca, els comptadors i els prestatges del Tauler de control mostren la teva llista. Tots els rols el poden fer servir, inclosos Només lectura i Borrower.

## Resolució de problemes

**Un membre no apareix a la llista de prestataris.** Comprova que hagi acceptat la invitació (no **Pendent**) i que el seu rol sigui **Borrower**, **Normal** o **Admin** — els membres de Només lectura no poden agafar llibres en préstec.

**Un membre no veu els botons d'Afegir o Editar.** És el que toca per a **Només lectura** i **Borrower**. Canvia-li el rol a **Normal** perquè pugui editar el catàleg.

**Sóc Borrower i vull retornar un llibre.** Demana-ho a qui porta la biblioteca — les devolucions les fa un membre Normal o Admin des de la pàgina de Préstecs.
