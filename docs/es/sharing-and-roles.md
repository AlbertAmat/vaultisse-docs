# Compartir una biblioteca y roles

Una **biblioteca** (en inglés, *vault*) es un espacio que puede usar más de una persona. Cada cuenta empieza con la suya, y puedes invitar a otras personas, darles un **rol** y decidir exactamente qué pueden ver y cambiar. También puedes pertenecer a varias bibliotecas y cambiar de una a otra.

## Invitar a personas

1. Abre el menú de tu perfil, elige [**Configuración**](./settings#bibliotecas) y busca la tarjeta **Bibliotecas**.
2. Haz clic en **Gestionar** en la biblioteca que quieres compartir.
3. Copia su **Enlace de invitación** y envíaselo a la persona. Necesita una cuenta de Vaultisse.
4. La persona abre el enlace y hace clic en **Solicitar unirme**. Hasta que la apruebes aparece como **Pendiente** y no puede ver nada de tu biblioteca.
5. En la lista de **Miembros** de la biblioteca, aprueba la solicitud y elige el **rol** de la persona. Puedes cambiarlo más adelante, o usar **Quitar miembro** para retirarle el acceso.

> **Nota:** Solo un **Admin** puede gestionar miembros. Una biblioteca siempre conserva al menos un Admin, así que no puedes quitar ni rebajar al último.

## Roles

Hay cuatro roles. Elige el más bajo que cubra lo que la persona necesita.

![Una cuadrícula con las seis capacidades de cada rol](/diagrams/roles-matrix-es.svg)

| Capacidad | Solo lectura | Borrower | Normal | Admin |
|---|:-:|:-:|:-:|:-:|
| Ver libros, ubicaciones, categorías y autores | ✅ | ✅ | ✅ | ✅ |
| Llevar tu propio [estado de lectura](./book-details#estado-de-lectura) | ✅ | ✅ | ✅ | ✅ |
| Recibir libros en préstamo, ver **Mis préstamos** y tu historial | — | ✅ | ✅ | ✅ |
| Añadir, importar, editar y borrar libros, stock, ubicaciones, categorías y autores | — | — | ✅ | ✅ |
| Gestionar clientes, prestar y devolver libros, imprimir etiquetas | — | — | ✅ | ✅ |
| Invitar, aprobar y quitar miembros, cambiar roles | — | — | — | ✅ |
| Cambiar los ajustes de la biblioteca o eliminarla | — | — | — | ✅ |

- **Solo lectura** — puede mirar la biblioteca y llevar su propia lista de lectura, nada más.
- **Borrower** — para quienes *piden prestados* libros de tu biblioteca, como familiares, amigos o alumnos con cuenta. Ven todo el catálogo y exactamente lo que tienen prestado.
- **Normal** — ayuda a llevar la biblioteca: añade y edita libros, gestiona clientes y se encarga de los préstamos.
- **Admin** — todo, incluido quién forma parte de la biblioteca.

## Qué ve un Borrower

Un Borrower tiene una versión de Vaultisse de solo consulta:

- La **Biblioteca**, las **Ubicaciones**, las **Categorías** y los **Autores**, y la página de cada libro, en solo lectura. Los botones Añadir, Importar, Editar y Eliminar, el editor de stock y la subida de portadas están ocultos.
- Su propio **estado de lectura** en cualquier libro, con las estanterías **Por leer** y **Leyendo ahora** en el menú y en el [Panel de control](./dashboard).
- **Mis préstamos**, una página con dos pestañas: **Préstamos** muestra los libros que tiene ahora y desde cuándo, e **Historial de préstamos** muestra todo lo que ha tomado prestado, con las fechas de devolución (o **Aún en préstamo**).

**No** ve las páginas de Clientes y Préstamos, los préstamos de otras personas ni la cola de impresión — y el servidor también rechaza esas peticiones, no solo se ocultan los botones.

## Prestar un libro a un miembro de la biblioteca

Un ejemplar se puede prestar a dos tipos de prestatario:

![Los clientes y los miembros de la biblioteca alimentan el selector de prestatario, que reserva un ejemplar y lo anota en el historial](/diagrams/borrower-model-es.svg)

- Un [**cliente**](./customers-and-groups) — solo un nombre que tú mantienes, sin cuenta. Los clientes se pueden organizar en grupos.
- Un **miembro de la biblioteca** — alguien de tu biblioteca con el rol Borrower, Normal o Admin (y una invitación aprobada). Los miembros no tienen grupo.

Para prestar un ejemplar, abre la [tabla de Stock](./book-details#anadir-un-ejemplar) del libro, pon el ejemplar como **Reservado** y elige a la persona en **Reservado por**. La lista muestra juntos a tus clientes y a los miembros que pueden pedir prestado. Solo un miembro **Normal** o **Admin** puede hacerlo.

Conviene saber que:

- El préstamo aparece en la página de **Préstamos**, en el [informe de préstamos](./lending-and-returns#exportar-un-informe-de-prestamos) y en la columna **Reservado por** del libro como cualquier otro, y el miembro lo ve en **Mis préstamos**.
- Los nombres nunca se copian: si un miembro cambia de nombre, o se renombra a un cliente, los préstamos pasados y actuales muestran el nombre nuevo.
- Quitar a un miembro de la biblioteca solo lo quita del selector. Los ejemplares que ya tiene siguen reservados a su nombre hasta que se devuelvan, y su historial se conserva.
- Eliminar la **cuenta** de un miembro devuelve a **Disponible** los ejemplares que tenía y borra su historial de préstamos. Eliminar a un cliente borra el suyo.
- Un miembro **Solo lectura**, **Pendiente** o **Rechazado** no aparece en el selector.

## El estado de lectura es personal

Cada persona de una biblioteca compartida tiene su propia lista de lectura. Marcar un libro como **Leído** lo cambia solo para ti, y los filtros de la Biblioteca, los contadores y las estanterías del Panel de control muestran tu propia lista. Todos los roles pueden usarlo, incluidos Solo lectura y Borrower.

## Solución de problemas

**Un miembro no aparece en la lista de prestatarios.** Comprueba que haya aceptado la invitación (no **Pendiente**) y que su rol sea **Borrower**, **Normal** o **Admin** — los miembros de Solo lectura no pueden pedir prestado.

**Un miembro no ve los botones de Añadir o Editar.** Es lo esperado para **Solo lectura** y **Borrower**. Cámbiale el rol a **Normal** para que pueda editar el catálogo.

**Soy Borrower y quiero devolver un libro.** Pídeselo a quien lleva la biblioteca — las devoluciones las hace un miembro Normal o Admin desde la página de Préstamos.
