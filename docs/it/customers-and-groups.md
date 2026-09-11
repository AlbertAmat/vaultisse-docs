# Clienti e gruppi

![La pagina Clienti](/screenshots/customers.png)

La pagina **Clienti** gestisce le persone che possono prendere in prestito i libri, e ti permette di organizzarle in gruppi (ad esempio per classe, anno o reparto). Questa pagina — insieme a [Prestiti](./lending-and-returns) — compare solo quando **Prestiti** è attivo in [Impostazioni](./settings#funzionalita).

## Scheda Clienti

Ogni cliente è elencato come una propria scheda, con il suo **nome**, il **gruppo** a cui appartiene (o "Nessun gruppo") e quanti **libri** ha attualmente in prestito.

- Clicca su **Aggiungi** per creare un nuovo cliente.
- Usa l'icona ✏️ per modificare un cliente, o 🗑️ per eliminarne uno (con conferma).
- Clicca sulla freccia di espansione della riga per rivelare i **libri presi in prestito** da quel cliente.

![La finestra per aggiungere un cliente](/screenshots/customer-dialog.png)

> **Nota:** se il tuo account è registrato come istituzione pubblica, la finestra per aggiungere/modificare un cliente avvisa di non inserire informazioni personali sensibili — usa un codice studente o un ID che solo tu sai identificare, invece del nome completo.

## Scheda Gruppi

Passa alla scheda **Gruppi** per gestire i gruppi di clienti. Ogni cliente senza gruppo appare sotto il contenitore predefinito **Nessun gruppo**, così nessuno resta mai nascosto.

![La scheda Gruppi, con l'elenco di ogni gruppo e il numero di clienti](/screenshots/customer-groups.png)

Per ogni gruppo puoi vedere il suo **nome**, la **descrizione** e il **numero totale di clienti**, e puoi:

- Cliccare su **Aggiungi** per creare un nuovo gruppo.
- Espandere un gruppo per vedere e gestire i suoi **membri**.
- ✏️ modificare o 🗑️ eliminare un gruppo (l'eliminazione non elimina i suoi clienti — diventano semplicemente non assegnati).

![La finestra per aggiungere un gruppo](/screenshots/customer-group-dialog.png)

### Spostare i clienti tra i gruppi

All'interno di un gruppo espanso, puoi spostare i clienti in due modi:

- **Trascina e rilascia** la riga di un cliente su un altro gruppo per spostarlo lì istantaneamente.
- **Seleziona più clienti** con le caselle di spunta, scegli un gruppo di destinazione dal menu a tendina **Sposta nel gruppo** e clicca su **Sposta** per spostarli tutti insieme.

Puoi anche rimuovere un singolo cliente da un gruppo con l'icona ✕ accanto al suo nome, il che lo riporta a **Nessun gruppo**.

## Prestare a un cliente

Per vedere o gestire cosa ha attualmente in prestito un cliente, espandi la sua riga nella scheda **Clienti**. Per assegnare o restituire copie, vedi [Prestiti e restituzioni](./lending-and-returns).
