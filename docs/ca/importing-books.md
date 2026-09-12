# Importar llibres

![El diàleg d'importació, amb Vaultisse seleccionat com a origen i un fitxer CSV a punt per pujar](/screenshots/import-dialog.png)

Si estàs traslladant la teva col·lecció des de Goodreads, o ja tens un full de càlcul amb els teus llibres, no cal que els afegeixis d'un en un. Fes clic a **Importa** al costat d'**Afegir llibre** a la pàgina de [Biblioteca](./searching-the-library) per afegir llibres en bloc des d'un fitxer CSV.

## Importar un fitxer

1. Fes clic a **Importa**.
2. Tria d'on prové el fitxer — **Vaultisse** o **Goodreads** (vegeu més avall cada opció).
3. Fes clic, o arrossega i deixa anar, el teu fitxer CSV a la zona que apareix.
4. Fes clic a **Importa**.

Cada fila es converteix en un llibre nou. Un llibre que ja tinguis — identificat per ISBN, o pel títol si no n'hi ha — s'omet automàticament, així que importar el mateix fitxer dues vegades no fa cap mal.

> **Consell:** El botó **Importa** roman desactivat fins que hagis triat tant un origen com un fitxer per sota de la mida màxima que es mostra sota la zona de càrrega — la mida que accepta el teu servidor depèn de com estigui configurat.

## Importar des de Vaultisse

Fes servir això per omplir la teva biblioteca des d'un full de càlcul, o per moure llibres entre dos comptes de Vaultisse.

Fes clic a **Descarrega la plantilla** sota la targeta de Vaultisse per obtenir un CSV inicial amb les columnes ja preparades — títol, autors, ISBN, editorial, any de publicació, pàgines, format, categoria, descripció, idioma, URL de la portada i estat de lectura. Omple una fila per llibre i puja'l de nou.

## Importar des de Goodreads

![El diàleg d'importació amb Goodreads seleccionat com a origen](/screenshots/import-dialog-goodreads.png)

1. A Goodreads, ves a **My Books → Import and Export** i exporta la teva biblioteca com a CSV.
2. Torna a Vaultisse, obre el diàleg d'importació, tria **Goodreads** i puja el fitxer que acabes de descarregar.

L'**Exclusive Shelf** de Goodreads (to-read, currently-reading, read) es trasllada com a [estat de lectura](./book-details#estat-de-lectura) de cada llibre. Qualsevol altre prestatge personalitzat que hagis creat a Goodreads — per exemple un prestatge anomenat "office" per indicar on viu físicament un exemplar — també es converteix en una [ubicació](./locations) a Vaultisse, amb un exemplar físic (estoc) creat automàticament allà per a aquest llibre.

## Després d'importar

Un cop el fitxer acaba de processar-se, el diàleg es tanca i apareix una confirmació amb el nombre de llibres afegits:

![La confirmació "Total de llibres importats" després d'una importació correcta](/screenshots/import-success.png)

Els llibres importats apareixen a la teva pàgina de [Biblioteca](./searching-the-library) com qualsevol altre llibre — obre'n un per completar el que el CSV no cobrís, com ara una imatge de portada o exemplars addicionals.
