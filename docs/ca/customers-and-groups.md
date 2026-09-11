# Clients i grups

![La pàgina de Clients](/screenshots/customers.png)

La pàgina de **Clients** gestiona les persones que poden agafar llibres en préstec, i et permet organitzar-les en grups (per exemple, per classe, curs o departament). Aquesta pàgina — junt amb [Préstecs](./lending-and-returns) — només apareix un cop actives els **Préstecs** a [Configuració](./settings#funcionalitats).

## Pestanya de Clients

Cada client es mostra com una targeta pròpia, amb el seu **nom**, el **grup** a què pertany (o "Sense grup") i quants **llibres** té actualment en préstec.

- Fes clic a **Afegir** per crear un nou client.
- Fes servir la icona ✏️ per editar un client, o 🗑️ per eliminar-ne un (amb confirmació).
- Fes clic a la fletxa d'expandir de la fila per veure els **llibres en préstec** d'aquest client a sota.

![El diàleg Afegir client](/screenshots/customer-dialog.png)

> **Nota:** Si el teu compte està registrat com a institució pública, el diàleg d'afegir/editar client t'avisa de no introduir informació personal sensible — fes servir un codi o identificador d'estudiant que només tu puguis identificar, en lloc del nom complet.

## Pestanya de Grups

Canvia a la pestanya **Grups** per gestionar els grups de clients. Tot client sense grup apareix sota un contenidor integrat de **Sense grup**, de manera que ningú queda mai amagat.

![La pestanya de Grups, amb cada grup i el seu nombre de clients](/screenshots/customer-groups.png)

Per a cada grup pots veure'n el **nom**, la **descripció** i el **nombre total de clients**, i:

- Fes clic a **Afegir** per crear un nou grup.
- Expandeix un grup per veure i gestionar-ne els **membres**.
- ✏️ edita o 🗑️ elimina un grup (eliminar-lo no elimina els seus clients — simplement queden sense assignar).

![El diàleg Afegir grup](/screenshots/customer-group-dialog.png)

### Moure clients entre grups

Dins d'un grup expandit, pots moure clients de dues maneres:

- **Arrossega i deixa anar** la fila d'un client sobre un altre grup per moure'l allà a l'instant.
- **Selecciona diversos clients** amb les caselles de selecció, tria un grup de destinació al desplegable **Moure al grup**, i fes clic a **Moure** per reubicar-los tots alhora.

També pots treure un únic client d'un grup amb la icona ✕ al costat del seu nom, cosa que el retorna a **Sense grup**.

## Deixar llibres en préstec a un client

Per veure o gestionar el que un client té actualment en préstec, expandeix la seva fila a la pestanya **Clients**. Per assignar o retornar exemplars, consulta [Préstecs i devolucions](./lending-and-returns).
