# Importar libros

![El diálogo de importación, con Vaultisse seleccionado como origen y un archivo CSV listo para subir](/screenshots/import-dialog.png)

Si estás trasladando tu colección desde Goodreads, o ya tienes una hoja de cálculo con tus libros, no hace falta añadirlos uno a uno. Haz clic en **Importar** junto a **Añadir libro** en la página de [Biblioteca](./searching-the-library) para añadir libros en bloque desde un archivo CSV.

## Importar un archivo

1. Haz clic en **Importar**.
2. Elige de dónde proviene tu archivo — **Vaultisse** o **Goodreads** (más abajo se explica cada uno).
3. Haz clic, o arrastra y suelta, tu archivo CSV sobre la zona que aparece.
4. Haz clic en **Importar**.

Cada fila se convierte en un libro nuevo. Un libro que ya tengas — identificado por ISBN, o por título si no hay ISBN — se omite automáticamente, así que importar el mismo archivo dos veces es inofensivo.

> **Consejo:** El botón **Importar** permanece desactivado hasta que hayas elegido tanto un origen como un archivo por debajo del tamaño máximo que se muestra bajo la zona de carga — el tamaño que acepta tu servidor depende de cómo esté configurado.

## Importar desde Vaultisse

Usa esta opción para rellenar tu biblioteca desde una hoja de cálculo, o para mover libros entre dos cuentas de Vaultisse.

Haz clic en **Descargar plantilla** bajo la tarjeta de Vaultisse para obtener un CSV inicial con las columnas ya preparadas — título, autores, ISBN, editorial, año de publicación, páginas, formato, categoría, descripción, idioma, URL de la portada y estado de lectura. Rellena una fila por libro y súbelo de nuevo.

## Importar desde Goodreads

![El diálogo de importación con Goodreads seleccionado como origen](/screenshots/import-dialog-goodreads.png)

1. En Goodreads, ve a **My Books → Import and Export** y exporta tu biblioteca como CSV.
2. Vuelve a Vaultisse, abre el diálogo de importación, elige **Goodreads** y sube el archivo que acabas de descargar.

El **Exclusive Shelf** de Goodreads (to-read, currently-reading, read) se traslada como [estado de lectura](./book-details#estado-de-lectura) de cada libro. Cualquier otro estante personalizado que hayas creado en Goodreads — por ejemplo uno llamado "office" para indicar dónde vive físicamente un ejemplar — también se convierte en una [ubicación](./locations) en Vaultisse, con un ejemplar físico (stock) creado allí automáticamente para ese libro.

## Después de importar

Cuando el archivo termina de procesarse, el diálogo se cierra y aparece una confirmación con el número de libros añadidos:

![La confirmación "Total de libros importados" tras una importación correcta](/screenshots/import-success.png)

Los libros importados aparecen en tu página de [Biblioteca](./searching-the-library) como cualquier otro libro — abre uno para completar lo que el CSV no cubriera, como una imagen de portada o ejemplares adicionales.
