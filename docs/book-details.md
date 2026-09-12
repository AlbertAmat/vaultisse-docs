# Book details & stock

![A book's detail page, with its information and stock table](/screenshots/book-details.png)

Every book has its own page with two parts: the book's **information** and the list of its physical **copies** (called "stock"). The page opens read-only — click **Edit** in the top-right corner to change anything.

## Book information

In view mode you see the book's **name**, **ISBN**, **category**, **language**, **format**, **page count**, **publisher**, **published date**, **reading status**, **authors**, and **description**, with a dash shown for anything left blank.

Click **Edit** to turn all of that into an editable form:

![The book detail page in edit mode](/screenshots/book-edit-mode.png)

- **Category** and **Language** are picked from the lists you manage under [Categories](./categories-and-authors).
- **Authors** — start typing a name to search existing authors, or add a new one on the fly.
- **Cover image** — shown on the right; hover over it to change it.

While editing, the top-right buttons become **Cancel** (discard your changes) and **Save** (which only becomes active once you've actually changed something). The **trash icon** next to them deletes the book entirely, in either mode — you'll be asked to confirm first.

## Reading status

Track your own personal reading progress on a book, separate from its stock status — this is about whether *you* have read it, not whether a copy is out on loan.

Click the **Reading status** button next to Edit, in the top-right corner, to open a quick menu:

![The reading status menu open, with Want to read, Currently reading, and Read options](/screenshots/reading-status.png)

- **Want to read** — on your to-read list.
- **Currently reading** — you're partway through it.
- **Read** — you've finished it.
- **Clear** — remove the status entirely (only shown once a status is set).

Picking an option applies it right away — no need to click Edit or Save first. The current status also shows up as a field on the book's information, and feeds the [Dashboard](./dashboard)'s reading widgets and the [Library filters](./searching-the-library#filtering).

## Understanding stock

A book title can exist in your catalog with **zero, one, or many physical copies**. Each copy is a separate row in the **Stocks** table, with its own:

- **Code** — the unique identifier printed on that copy's barcode label.
- **Location** — where that specific copy lives (see [Locations](./locations)).
- **Status**:
  - 🔵 **Booked** — currently lent out to a customer. Only offered if [Leasing](./settings#features) is turned on for your account.
  - 🟢 **Available** — on the shelf, ready to be borrowed.
  - ⚪ **Not available** — temporarily out of circulation.
  - 🟠 **Damage** — damaged and not lendable.
- **Booked by** — the customer currently holding that copy, shown only when Leasing is enabled.

## Adding a copy

Click **Add** above the Stocks table, choose a **status** and a **location**, and (if Leasing is on and you're marking it as Booked) select which **customer** has it.

![The Add book stock dialog](/screenshots/add-stock-dialog.png)

You can either:

- **Add** — just create the copy, or
- **Add & print** — create it and immediately queue its barcode label for printing (see [Printing labels](./printing-labels)).

## Editing or removing a copy

Use the row actions on the right of each stock entry:

- 🖨️ Add this copy's label to the **print queue**.
- ✏️ **Edit** its status, location, or assigned customer.
- 🗑️ **Delete** the copy (with confirmation).

> **Tip:** To lend a copy to someone, either set its status to **Booked** and pick a customer here, or use the group borrowing flow from a customer's row — see [Lending & returns](./lending-and-returns).

## Ebook files

Set a book's **Format** to **Electronic** to reveal an **Ebook files** card next to the cover image, where you can back up the actual files for it — useful if you've downloaded them and transferred them to an e-reader, since the reader then becomes the only place they live.

![The Ebook files card, with a drag-and-drop upload area](/screenshots/ebook-files.png)

- Click **Add**, or drag and drop, to upload an **epub, pdf, mobi, or azw3** file.
- Unlike the rest of the book, each file type is kept independently — you can have one epub *and* one pdf backed up for the same book at once; uploading a new file of a type you've already backed up replaces just that one (`.mobi` and `.azw3` share the same slot, since they're both Kindle formats).
- Each uploaded file gets its own row with an icon, filename, size, and upload date, plus **preview** (eye icon, opens in a dialog — PDFs and EPUBs page through right there, with a fullscreen toggle), **download**, and **delete** actions.

![The Ebook files table with an epub, a pdf, and a Kindle file backed up](/screenshots/ebook-files-list.png)

- The maximum file size depends on how your Vaultisse server is configured — ask whoever manages it if an upload is rejected as too large.

Click the **eye icon** on an epub or pdf row to page through it right there in a dialog, without leaving the book's page:

![The preview dialog open on an epub file, showing its first chapter with page navigation arrows](/screenshots/ebook-file-preview.png)

A Kindle file (`.mobi`/`.azw3`) has no in-app reader, so its preview just confirms there's no renderer available — download it to open it elsewhere.

This is meant purely as a personal backup of files you already have the rights to — not a place to source books from elsewhere.
