# Detalle del libro y stock

![La página de detalle de un libro, con su información y la tabla de stock](/screenshots/book-details.png)

Cada libro tiene su propia página con dos partes: la **información** del libro y la lista de sus **ejemplares** físicos (llamados "stock"). La página se abre en modo de solo lectura — haz clic en **Editar**, en la esquina superior derecha, para cambiar cualquier cosa.

## Información del libro

En modo de vista ves el **nombre**, el **ISBN**, la **categoría**, el **idioma**, el **formato**, el **número de páginas**, la **editorial**, la **fecha de publicación**, el **estado de lectura**, los **autores** y la **descripción** del libro, con un guion donde no se haya rellenado algo.

Haz clic en **Editar** para convertir todo eso en un formulario editable:

![La página de detalle del libro en modo de edición](/screenshots/book-edit-mode.png)

- **Categoría** e **Idioma** se eligen de las listas que gestionas en [Categorías](./categories-and-authors).
- **Autores** — empieza a escribir un nombre para buscar entre los autores existentes, o añade uno nuevo sobre la marcha.
- **Imagen de portada** — se muestra a la derecha; pasa el ratón por encima para cambiarla.

Mientras editas, los botones de la esquina superior derecha pasan a ser **Cancelar** (descarta tus cambios) y **Guardar** (que solo se activa una vez has cambiado algo de verdad). El **icono de papelera** junto a ellos elimina el libro por completo, en cualquiera de los dos modos — se te pedirá confirmación antes.

## Estado de lectura

Controla tu propio progreso de lectura de un libro, independiente del estado de su stock — esto trata de si *tú* lo has leído, no de si un ejemplar está prestado.

Haz clic en el botón **Estado de lectura**, junto a Editar, en la esquina superior derecha, para abrir un menú rápido:

![El menú de estado de lectura abierto, con las opciones Por leer, Leyendo ahora y Leído](/screenshots/reading-status.png)

- **Por leer** — está en tu lista de pendientes.
- **Leyendo ahora** — vas por la mitad.
- **Leído** — ya lo has terminado.
- **Limpiar** — elimina el estado por completo (solo aparece si ya tiene uno asignado).

Elegir una opción se aplica al momento — no hace falta entrar en Editar ni Guardar. El estado actual también aparece como campo en la información del libro, y alimenta los widgets de lectura del [Panel de control](./dashboard) y los [filtros de la Biblioteca](./searching-the-library#filtrado).

## Entendiendo el stock

Un título puede existir en tu catálogo con **cero, uno o varios ejemplares físicos**. Cada ejemplar es una fila independiente en la tabla de **Stock**, con su propio:

- **Código** — el identificador único impreso en la etiqueta de código de barras de ese ejemplar.
- **Ubicación** — dónde se encuentra ese ejemplar en concreto (consulta [Ubicaciones](./locations)).
- **Estado**:
  - 🔵 **Reservado** — actualmente prestado a un cliente. Solo se ofrece si tienes [Préstamos](./settings#funciones) activado en tu cuenta.
  - 🟢 **Disponible** — en la estantería, listo para ser prestado.
  - ⚪ **No disponible** — temporalmente fuera de circulación.
  - 🟠 **Dañado** — dañado y no disponible para préstamo.
- **Reservado por** — el cliente que tiene actualmente ese ejemplar, mostrado solo cuando Préstamos está activado.

## Añadir un ejemplar

Haz clic en **Añadir** encima de la tabla de Stock, elige un **estado** y una **ubicación**, y (si Préstamos está activado y lo marcas como Reservado) selecciona qué **cliente** lo tiene.

![El diálogo Añadir ejemplar de libro](/screenshots/add-stock-dialog.png)

Puedes elegir entre:

- **Añadir** — simplemente crear el ejemplar, o
- **Añadir e imprimir** — crearlo y poner en cola inmediatamente su etiqueta de código de barras para imprimir (consulta [Impresión de etiquetas](./printing-labels)).

## Editar o eliminar un ejemplar

Usa las acciones de fila a la derecha de cada entrada de stock:

- 🖨️ Añade la etiqueta de este ejemplar a la **cola de impresión**.
- ✏️ **Edita** su estado, ubicación o cliente asignado.
- 🗑️ **Elimina** el ejemplar (con confirmación).

> **Consejo:** Para prestar un ejemplar a alguien, puedes cambiar su estado a **Reservado** y elegir aquí un cliente, o usar el flujo de préstamo grupal desde la fila de un cliente — consulta [Préstamos y devoluciones](./lending-and-returns).

## Archivos digitales

Pon el **Formato** de un libro como **Electrónico** para que aparezca una tarjeta de **Archivos digitales** junto a la imagen de portada, donde puedes guardar una copia de seguridad de los archivos del libro — útil si los has descargado y transferido a un lector electrónico, ya que entonces el lector se convierte en el único lugar donde viven.

![La tarjeta Archivos digitales, con una zona para arrastrar y soltar](/screenshots/ebook-files.png)

- Haz clic en **Añadir**, o arrastra y suelta, para subir un archivo **epub, pdf, mobi o azw3**.
- A diferencia del resto del libro, cada tipo de archivo se guarda de forma independiente — puedes tener un epub *y* un pdf de copia de seguridad para el mismo libro a la vez; subir un archivo nuevo de un tipo que ya tenías sustituye solo a ese (`.mobi` y `.azw3` comparten la misma ranura, ya que ambos son formatos Kindle).
- Cada archivo subido aparece en su propia fila con un icono, el nombre del archivo, el tamaño y la fecha de subida, además de acciones de **vista previa** (icono del ojo, se abre en un diálogo — los PDF y EPUB se recorren página a página ahí mismo, con un botón para verlos a pantalla completa), **descarga** y **eliminación**.

![La tabla de Archivos digitales con un epub, un pdf y un archivo Kindle guardados](/screenshots/ebook-files-list.png)

- El tamaño máximo permitido depende de cómo esté configurado tu servidor de Vaultisse — pregunta a quien lo administre si una subida se rechaza por ser demasiado grande.

Haz clic en el **icono del ojo** de una fila epub o pdf para recorrerlo página a página ahí mismo, en un diálogo, sin salir de la página del libro:

![El diálogo de vista previa abierto en un archivo epub, mostrando su primer capítulo con flechas de navegación de página](/screenshots/ebook-file-preview.png)

Un archivo Kindle (`.mobi`/`.azw3`) no tiene lector integrado, así que su vista previa solo confirma que no hay ningún visor disponible — descárgalo para abrirlo en otro sitio.

Esto está pensado únicamente como copia de seguridad personal de archivos sobre los que ya tienes los derechos — no como un lugar para obtener libros de otras fuentes.
