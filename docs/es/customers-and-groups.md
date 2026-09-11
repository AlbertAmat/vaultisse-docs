# Clientes y grupos

![La página de Clientes](/screenshots/customers.png)

La página de **Clientes** gestiona a las personas que pueden pedir libros prestados y te permite organizarlas en grupos (por ejemplo, por clase, curso o departamento). Esta página — junto con [Préstamos](./lending-and-returns) — solo aparece una vez que activas **Préstamos** en [Configuración](./settings#funciones).

## Pestaña Clientes

Cada cliente aparece como su propia tarjeta, con su **nombre**, el **grupo** al que pertenece (o "Sin grupo") y cuántos **libros** tiene actualmente en préstamo.

- Haz clic en **Añadir** para crear un nuevo cliente.
- Usa el icono ✏️ para editar un cliente, o 🗑️ para eliminarlo (con confirmación).
- Haz clic en la flecha de expandir de la fila para mostrar los **libros prestados** de ese cliente debajo.

![El diálogo Añadir cliente](/screenshots/customer-dialog.png)

> **Nota:** Si tu cuenta está registrada como institución pública, el diálogo de añadir/editar cliente te advierte que no introduzcas datos personales sensibles — usa un código de estudiante o un identificador que solo tú puedas reconocer, en lugar de un nombre completo.

## Pestaña Grupos

Cambia a la pestaña **Grupos** para gestionar los grupos de clientes. Todo cliente sin grupo aparece bajo un contenedor integrado llamado **Sin grupo**, para que nadie quede oculto nunca.

![La pestaña Grupos, con cada grupo y su número de clientes](/screenshots/customer-groups.png)

Para cada grupo puedes ver su **nombre**, **descripción** y **número total de clientes**, y:

- Haz clic en **Añadir** para crear un nuevo grupo.
- Expande un grupo para ver y gestionar sus **miembros**.
- ✏️ edita o 🗑️ elimina un grupo (eliminarlo no elimina a sus clientes — simplemente quedan sin asignar).

![El diálogo Añadir grupo](/screenshots/customer-group-dialog.png)

### Mover clientes entre grupos

Dentro de un grupo expandido, puedes mover clientes de dos formas:

- **Arrastra y suelta** la fila de un cliente sobre otro grupo para moverlo allí al instante.
- **Selecciona varios clientes** con las casillas de verificación, elige un grupo de destino en el desplegable **Mover a grupo** y haz clic en **Mover** para reubicarlos todos a la vez.

También puedes quitar a un solo cliente de un grupo con el icono ✕ junto a su nombre, lo que lo devuelve a **Sin grupo**.

## Prestar libros a un cliente

Para ver o gestionar lo que un cliente tiene actualmente en préstamo, expande su fila en la pestaña **Clientes**. Para asignar o devolver ejemplares, consulta [Préstamos y devoluciones](./lending-and-returns).
