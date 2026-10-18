# Sharing a library & roles

A **vault** is a library that more than one person can use. Every account starts with its own vault, and you can invite other people into it, give each of them a **role**, and decide exactly what they can see and change. You can also belong to several vaults and switch between them.

## Inviting people

1. Open your profile menu, choose [**Settings**](./settings#vaults) and find the **Vaults** card.
2. Click **Manage** on the vault you want to share.
3. Copy its **Invite link** and send it to the person. They need a Vaultisse account.
4. They open the link and click **Request to join**. Until you approve them they are **Pending** and can't see anything in your vault.
5. In the vault's **Members** list, approve the request and choose the person's **role**. You can change the role later, or **Remove member** to take their access away.

> **Note:** Only an **Admin** can manage members. A vault always keeps at least one Admin, so you can't remove or demote the last one.

## Roles

There are four roles. Pick the lowest one that does the job.

![A grid showing which of the six abilities each role has](/diagrams/roles-matrix-en.svg)

| Ability | Read-only | Borrower | Normal | Admin |
|---|:-:|:-:|:-:|:-:|
| Browse books, locations, categories and authors | ✅ | ✅ | ✅ | ✅ |
| Track your own [reading status](./book-details#reading-status) | ✅ | ✅ | ✅ | ✅ |
| Be lent books, see **My loans** and your loan history | — | ✅ | ✅ | ✅ |
| Add, import, edit and delete books, stock, locations, categories, authors | — | — | ✅ | ✅ |
| Manage customers, lend and return books, print labels | — | — | ✅ | ✅ |
| Invite, approve and remove members, change roles | — | — | — | ✅ |
| Change the vault's settings or delete it | — | — | — | ✅ |

- **Read-only** — can look around the library and keep their own reading list, nothing else.
- **Borrower** — for people who *borrow* from your library, such as family, friends or students with an account. They see the whole catalog and exactly what they have on loan.
- **Normal** — helps run the library: adds and edits books, manages customers and handles lending.
- **Admin** — everything, including who is in the vault.

## Roles from SSO groups

If your organization signs people in with single sign-on (SSO), and whoever runs the Vaultisse server has set up the group mapping, you can let a person's **groups at the identity provider** decide their role, instead of picking it by hand. This is handy when the same people already belong to groups such as `family-users` or `library-admins`.

![The Members list: Joan Ferrer's role is based on SSO groups, shown as "Borrower · Based on SSO groups"](/screenshots/vault-members-sso.png)

1. Open the vault's **Manage** dialog, as in [Inviting people](#inviting-people).
2. In the **Members** list, open the role menu of the person.
3. Choose **Based on SSO groups** at the end of the list.

![The role menu with the extra option Based on SSO groups](/screenshots/vault-member-role-picker.png)

From then on, every time that person signs in with SSO, their role in this vault is set to the highest role their groups map to, and a pending request is accepted at the same time. The member's line shows their current role followed by **Based on SSO groups**.

A few things to know:

- The option only appears when the server has the group mapping configured **and** the person has signed in with SSO at least once. A member who only uses a password never sees it.
- Nothing changes at the moment you choose it. The role is updated at the person's **next** SSO login.
- If none of the person's groups is mapped to a role, they simply keep the role they have. Nobody is removed or demoted because of a missing group.
- To take back control, choose any normal role from the menu. That member is then managed by hand again.
- Each vault decides this per member, so the same person can be set by hand in one vault and by SSO groups in another. Their personal vault is never touched.
- A group that maps to **Borrower** can't be applied in a vault that has [loans](./lending-and-returns) turned off, and a vault always keeps at least one Admin. In both cases that change is skipped.

> **Note:** Which group gives which role is configured by the person who installs Vaultisse. See [Single sign-on](./self-hosting/single-sign-on) in the self-hosting guide.

## What a Borrower sees

A Borrower gets a browse-only version of Vaultisse:

- The **Library**, **Locations**, **Categories** and **Authors**, and each book's page — read-only. The Add, Import, Edit and Delete buttons, the stock editor and the cover upload are all hidden.
- Their own **reading status** on any book, with the **Want to read** and **Currently reading** shelves in the menu and on the [Dashboard](./dashboard).
- **My loans**, a page with two tabs: **Loans** lists the books they have right now and since when, and **Loan history** lists everything they have ever borrowed, with return dates (or **Still on loan**).

They do **not** see the Customers and Loans pages, other people's loans, or the print queue — and the server refuses those requests too, not just the buttons.

## Lending a book to a vault member

A copy can be lent to one of two kinds of borrower:

![Customers and vault members both feed the borrower picker, which books a copy and writes to the loan history](/diagrams/borrower-model-en.svg)

- A [**customer**](./customers-and-groups) — just a name you keep, with no account. Customers can be organized into groups.
- A **vault member** — someone in your vault with the Borrower, Normal or Admin role (and an approved invitation). Members have no group.

To lend a copy, open the book's [Stocks table](./book-details#adding-a-copy), set the copy to **Booked**, and pick the person under **Booked by**. The list shows your customers and your eligible members together. Only a **Normal** or **Admin** member can do this.

A few things to know:

- The loan appears in the **Loans** page, the [loan report](./lending-and-returns#exporting-a-loan-report) and the book's **Booked by** column like any other, and the member sees it under **My loans**.
- Names are never copied: if a member changes their name, or a customer is renamed, past and present loans show the new name.
- Removing a member from the vault only removes them from the picker. Copies they already hold stay booked to them until returned, and their history is kept.
- Deleting a member's **account** returns the copies they held to **Available** and deletes their loan history. Deleting a customer deletes theirs.
- A member who is **Read-only**, **Pending** or **Rejected** doesn't appear in the picker.

## Reading status is personal

Each person in a shared vault has their own reading list. Marking a book **Read** changes it for you only, and the Library filters, counters and Dashboard shelves show your own list. Every role can use it, including Read-only and Borrower.

## Troubleshooting

**A member isn't in the borrower list.** Check that they accepted the invitation (not **Pending**) and that their role is **Borrower**, **Normal** or **Admin** — Read-only members can't borrow.

**A member can't see the Add or Edit buttons.** That's expected for **Read-only** and **Borrower**. Change their role to **Normal** to let them edit the catalog.

**I'm a Borrower and want to return a book.** Ask whoever runs the library — returning is done by a Normal or Admin member from the Loans page.
