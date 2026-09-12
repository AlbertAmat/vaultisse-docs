# Dettagli libro e copie

![La pagina dei dettagli di un libro, con le informazioni e la tabella delle copie](/screenshots/book-details.png)

Ogni libro ha la propria pagina con due parti: le **informazioni** del libro e l'elenco delle sue **copie** fisiche (chiamate "stock"). La pagina si apre in sola lettura — clicca su **Modifica**, nell'angolo in alto a destra, per cambiare qualcosa.

## Informazioni sul libro

In modalità di visualizzazione vedi il **nome**, l'**ISBN**, la **categoria**, la **lingua**, il **formato**, il **numero di pagine**, l'**editore**, la **data di pubblicazione**, lo **stato di lettura**, gli **autori** e la **descrizione** del libro, con un trattino al posto di ciò che è rimasto vuoto.

Clicca su **Modifica** per trasformare tutto questo in un modulo compilabile:

![La pagina dei dettagli del libro in modalità modifica](/screenshots/book-edit-mode.png)

- **Categoria** e **Lingua** si scelgono dagli elenchi che gestisci in [Categorie](./categories-and-authors).
- **Autori** — inizia a digitare un nome per cercare tra gli autori esistenti, oppure aggiungine uno nuovo al volo.
- **Immagine di copertina** — mostrata a destra; passaci sopra con il mouse per cambiarla.

Durante la modifica, i pulsanti in alto a destra diventano **Annulla** (scarta le modifiche) e **Salva** (che diventa attivo solo dopo aver effettivamente cambiato qualcosa). L'**icona del cestino** accanto elimina completamente il libro, in entrambe le modalità — ti verrà chiesta prima una conferma.

## Stato di lettura

Tieni traccia dei tuoi progressi di lettura personali per un libro, indipendentemente dallo stato del suo stock — questo riguarda se *tu* lo hai letto, non se una copia è in prestito.

Clicca sul pulsante **Stato di lettura**, accanto a Modifica, nell'angolo in alto a destra, per aprire un menu rapido:

![Il menu dello stato di lettura aperto, con le opzioni Da leggere, In lettura e Letto](/screenshots/reading-status.png)

- **Da leggere** — nella tua lista di libri da leggere.
- **In lettura** — lo stai leggendo in questo momento.
- **Letto** — lo hai finito.
- **Cancella** — rimuove completamente lo stato (visibile solo quando ne è già impostato uno).

Scegliere un'opzione la applica subito — non serve entrare in Modifica né salvare. Lo stato attuale compare anche come campo nelle informazioni del libro, e alimenta i widget di lettura della [Dashboard](./dashboard) e i [filtri della Libreria](./searching-the-library#filtri).

## Capire lo stock

Un titolo può esistere nel tuo catalogo con **zero, una o più copie fisiche**. Ogni copia è una riga separata nella tabella delle **Copie**, con le proprie:

- **Codice** — l'identificativo univoco stampato sull'etichetta con codice a barre di quella copia.
- **Ubicazione** — dove si trova quella specifica copia (vedi [Ubicazioni](./locations)).
- **Stato**:
  - 🔵 **Prenotato** — attualmente prestato a un cliente. Disponibile solo se sul tuo account è attivo [Prestiti](./settings#funzionalita).
  - 🟢 **Disponibile** — sullo scaffale, pronto per essere preso in prestito.
  - ⚪ **Non disponibile** — temporaneamente fuori circolazione.
  - 🟠 **Danneggiato** — danneggiato e non prestabile.
- **Prenotato da** — il cliente che attualmente ha quella copia, mostrato solo quando Prestiti è attivo.

## Aggiungere una copia

Clicca su **Aggiungi** sopra la tabella delle Copie, scegli uno **stato** e un'**ubicazione**, e (se Prestiti è attivo e lo stai segnando come Prenotato) seleziona quale **cliente** lo ha.

![La finestra per aggiungere una copia](/screenshots/add-stock-dialog.png)

Puoi:

- **Aggiungi** — creare solo la copia, oppure
- **Aggiungi e stampa** — crearla e accodare immediatamente la sua etichetta con codice a barre per la stampa (vedi [Stampare le etichette](./printing-labels)).

## Modificare o rimuovere una copia

Usa le azioni della riga a destra di ogni voce di stock:

- 🖨️ Aggiungi l'etichetta di questa copia alla **coda di stampa**.
- ✏️ **Modifica** il suo stato, ubicazione o cliente assegnato.
- 🗑️ **Elimina** la copia (con conferma).

> **Suggerimento:** per prestare una copia a qualcuno, imposta il suo stato su **Prenotato** e scegli qui un cliente, oppure usa il flusso di prestito di gruppo dalla riga di un cliente — vedi [Prestiti e restituzioni](./lending-and-returns).

## File digitali del libro

Imposta il **Formato** di un libro su **Elettronico** per rivelare, accanto all'immagine di copertina, una scheda **File digitali** in cui salvare una copia di backup dei file veri e propri — utile se li hai scaricati e trasferiti su un e-reader, dato che a quel punto il lettore diventa l'unico posto in cui vivono.

![La scheda File digitali, con un'area per trascinare e rilasciare i file](/screenshots/ebook-files.png)

- Clicca su **Aggiungi**, oppure trascina e rilascia, per caricare un file **epub, pdf, mobi o azw3**.
- A differenza del resto del libro, ogni tipo di file viene conservato in modo indipendente — puoi avere un epub *e* un pdf salvati come backup per lo stesso libro contemporaneamente; caricare un nuovo file di un tipo già presente sostituisce solo quello (`.mobi` e `.azw3` condividono lo stesso slot, dato che sono entrambi formati Kindle).
- Ogni file caricato ha la propria riga con icona, nome del file, dimensione e data di caricamento, oltre alle azioni di **anteprima** (icona a forma di occhio, apre una finestra — i PDF e gli EPUB si sfogliano lì, con un pulsante per la modalità a schermo intero), **download** ed **eliminazione**.

![La tabella dei File digitali con un epub, un pdf e un file Kindle salvati](/screenshots/ebook-files-list.png)

- La dimensione massima consentita dipende da come è configurato il tuo server Vaultisse — chiedi a chi lo gestisce se un caricamento viene rifiutato perché troppo grande.

Clicca sull'**icona a forma di occhio** di una riga epub o pdf per sfogliarlo lì, in una finestra, senza lasciare la pagina del libro:

![La finestra di anteprima aperta su un file epub, che mostra il suo primo capitolo con le frecce di navigazione tra le pagine](/screenshots/ebook-file-preview.png)

Un file Kindle (`.mobi`/`.azw3`) non ha un lettore integrato, quindi la sua anteprima si limita a confermare che non c'è alcun visualizzatore disponibile — scaricalo per aprirlo altrove.

Questo è pensato puramente come backup personale di file di cui hai già i diritti — non come un luogo da cui procurarsi libri da altre fonti.
