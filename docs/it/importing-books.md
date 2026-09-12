# Importare libri

![La finestra di importazione, con Vaultisse selezionato come origine e un file CSV pronto da caricare](/screenshots/import-dialog.png)

Se stai trasferendo la tua collezione da Goodreads, o hai già un foglio di calcolo con i tuoi libri, non serve aggiungerli uno per uno. Clicca su **Importa** accanto ad **Aggiungi libro** nella pagina [Biblioteca](./searching-the-library) per aggiungere libri in blocco da un file CSV.

## Importare un file

1. Clicca su **Importa**.
2. Scegli da dove proviene il tuo file — **Vaultisse** o **Goodreads** (ciascuno spiegato più sotto).
3. Clicca, oppure trascina e rilascia, il tuo file CSV nell'area che compare.
4. Clicca su **Importa**.

Ogni riga diventa un nuovo libro. Un libro che hai già — identificato per ISBN, o per titolo se manca l'ISBN — viene saltato automaticamente, quindi importare lo stesso file due volte è innocuo.

> **Suggerimento:** Il pulsante **Importa** resta disattivato finché non hai scelto sia un'origine sia un file sotto la dimensione massima mostrata sotto l'area di caricamento — la dimensione accettata dal tuo server dipende da come è configurato.

## Importare da Vaultisse

Usa questa opzione per compilare la tua biblioteca da un foglio di calcolo, o per spostare libri tra due account Vaultisse.

Clicca su **Scarica il modello** sotto la scheda Vaultisse per ottenere un CSV di partenza con le colonne già pronte — titolo, autori, ISBN, editore, anno di pubblicazione, pagine, formato, categoria, descrizione, lingua, URL della copertina e stato di lettura. Compila una riga per libro e ricaricalo.

## Importare da Goodreads

![La finestra di importazione con Goodreads selezionato come origine](/screenshots/import-dialog-goodreads.png)

1. Su Goodreads, vai su **My Books → Import and Export** ed esporta la tua biblioteca come CSV.
2. Torna su Vaultisse, apri la finestra di importazione, scegli **Goodreads** e carica il file appena scaricato.

L'**Exclusive Shelf** di Goodreads (to-read, currently-reading, read) viene riportato come [stato di lettura](./book-details#stato-di-lettura) di ogni libro. Qualsiasi altro scaffale personalizzato creato su Goodreads — ad esempio uno chiamato "office" per indicare dove si trova fisicamente una copia — diventa anch'esso un'[ubicazione](./locations) in Vaultisse, con una copia fisica (stock) creata lì automaticamente per quel libro.

## Dopo l'importazione

Una volta terminata l'elaborazione del file, la finestra si chiude e compare una conferma con il numero di libri aggiunti:

![La conferma "Totale libri importati" dopo un'importazione riuscita](/screenshots/import-success.png)

I libri importati compaiono nella pagina [Biblioteca](./searching-the-library) come qualsiasi altro libro — aprine uno per completare ciò che il CSV non copriva, come un'immagine di copertina o copie aggiuntive.
