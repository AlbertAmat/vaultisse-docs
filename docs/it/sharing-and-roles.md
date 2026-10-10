# Condividere una biblioteca e ruoli

Una **biblioteca** (in inglese *vault*) è uno spazio che può usare più di una persona. Ogni account parte con la propria, e puoi invitare altre persone, dare a ciascuna un **ruolo** e decidere esattamente cosa possono vedere e modificare. Puoi anche far parte di più biblioteche e passare dall'una all'altra.

## Invitare persone

1. Apri il menu del tuo profilo, scegli [**Impostazioni**](./settings#biblioteche) e trova la scheda **Biblioteche**.
2. Clicca su **Gestisci** sulla biblioteca che vuoi condividere.
3. Copia il suo **Link di invito** e invialo alla persona. Serve un account Vaultisse.
4. La persona apre il link e clicca su **Richiedi di unirti**. Finché non la approvi resta **In attesa** e non vede nulla della tua biblioteca.
5. Nell'elenco **Membri** della biblioteca, approva la richiesta e scegli il **ruolo** della persona. Puoi cambiarlo in seguito, oppure usare **Rimuovi membro** per toglierle l'accesso.

> **Nota:** Solo un **Admin** può gestire i membri. Una biblioteca mantiene sempre almeno un Admin, quindi non puoi rimuovere né declassare l'ultimo.

## Ruoli

Ci sono quattro ruoli. Scegli il più basso che copra ciò di cui la persona ha bisogno.

![Una griglia con le sei capacità di ciascun ruolo](/diagrams/roles-matrix-it.svg)

| Capacità | Sola lettura | Borrower | Normal | Admin |
|---|:-:|:-:|:-:|:-:|
| Sfogliare libri, ubicazioni, categorie e autori | ✅ | ✅ | ✅ | ✅ |
| Tenere il tuo [stato di lettura](./book-details#stato-di-lettura) | ✅ | ✅ | ✅ | ✅ |
| Ricevere libri in prestito, vedere **I miei prestiti** e il tuo storico | — | ✅ | ✅ | ✅ |
| Aggiungere, importare, modificare ed eliminare libri, scorte, ubicazioni, categorie e autori | — | — | ✅ | ✅ |
| Gestire i clienti, prestare e restituire libri, stampare etichette | — | — | ✅ | ✅ |
| Invitare, approvare e rimuovere membri, cambiare ruoli | — | — | — | ✅ |
| Cambiare le impostazioni della biblioteca o eliminarla | — | — | — | ✅ |

- **Sola lettura** — può guardare la biblioteca e tenere la propria lista di lettura, nient'altro.
- **Borrower** — per chi *prende in prestito* libri dalla tua biblioteca, come familiari, amici o studenti con un account. Vedono tutto il catalogo e esattamente ciò che hanno in prestito.
- **Normal** — aiuta a gestire la biblioteca: aggiunge e modifica libri, gestisce i clienti e si occupa dei prestiti.
- **Admin** — tutto, compreso chi fa parte della biblioteca.

## Cosa vede un Borrower

Un Borrower ha una versione di Vaultisse di sola consultazione:

- La **Biblioteca**, le **Ubicazioni**, le **Categorie** e gli **Autori**, e la pagina di ogni libro, in sola lettura. I pulsanti Aggiungi, Importa, Modifica ed Elimina, l'editor delle scorte e il caricamento della copertina sono nascosti.
- Il proprio **stato di lettura** su qualsiasi libro, con gli scaffali **Da leggere** e **In lettura** nel menu e nella [Dashboard](./dashboard).
- **I miei prestiti**, una pagina con due schede: **Prestiti** elenca i libri che ha adesso e da quando, e **Storico dei prestiti** elenca tutto ciò che ha mai preso in prestito, con le date di restituzione (o **Ancora in prestito**).

**Non** vede le pagine Clienti e Prestiti, i prestiti di altre persone né la coda di stampa — e anche il server rifiuta quelle richieste, non solo i pulsanti sono nascosti.

## Prestare un libro a un membro della biblioteca

Una copia può essere prestata a due tipi di richiedente:

![I clienti e i membri della biblioteca alimentano il selettore del richiedente, che prenota una copia e la registra nello storico](/diagrams/borrower-model-it.svg)

- Un [**cliente**](./customers-and-groups) — solo un nome che tieni tu, senza account. I clienti si possono organizzare in gruppi.
- Un **membro della biblioteca** — qualcuno della tua biblioteca con il ruolo Borrower, Normal o Admin (e un invito approvato). I membri non hanno un gruppo.

Per prestare una copia, apri la [tabella delle Copie](./book-details#aggiungere-una-copia) del libro, imposta la copia su **Prenotato** e scegli la persona in **Prenotato da**. L'elenco mostra insieme i tuoi clienti e i membri che possono prendere in prestito. Solo un membro **Normal** o **Admin** può farlo.

Da sapere:

- Il prestito compare nella pagina **Prestiti**, nel [report dei prestiti](./lending-and-returns#esportare-un-report-dei-prestiti) e nella colonna **Prenotato da** del libro come qualsiasi altro, e il membro lo vede in **I miei prestiti**.
- I nomi non vengono mai copiati: se un membro cambia nome, o un cliente viene rinominato, i prestiti passati e attuali mostrano il nome nuovo.
- Rimuovere un membro dalla biblioteca lo toglie solo dal selettore. Le copie che ha già restano prenotate a suo nome finché non vengono restituite, e il suo storico viene conservato.
- Eliminare l'**account** di un membro riporta su **Disponibile** le copie che aveva ed elimina il suo storico dei prestiti. Eliminare un cliente elimina il suo.
- Un membro **Sola lettura**, **In attesa** o **Rifiutato** non compare nel selettore.

## Lo stato di lettura è personale

Ogni persona di una biblioteca condivisa ha la propria lista di lettura. Segnare un libro come **Letto** lo cambia solo per te, e i filtri della Biblioteca, i contatori e gli scaffali della Dashboard mostrano la tua lista. Tutti i ruoli possono usarlo, compresi Sola lettura e Borrower.

## Risoluzione dei problemi

**Un membro non è nell'elenco dei richiedenti.** Controlla che abbia accettato l'invito (non **In attesa**) e che il suo ruolo sia **Borrower**, **Normal** o **Admin** — i membri Sola lettura non possono prendere in prestito.

**Un membro non vede i pulsanti Aggiungi o Modifica.** È normale per **Sola lettura** e **Borrower**. Cambia il suo ruolo in **Normal** per permettergli di modificare il catalogo.

**Sono un Borrower e voglio restituire un libro.** Chiedilo a chi gestisce la biblioteca — le restituzioni le fa un membro Normal o Admin dalla pagina Prestiti.
