import { defineConfig, type DefaultTheme } from "vitepress";

const APP_URL = "https://vaultisse.com";
const GITHUB_URL = "https://github.com/AlbertAmat/vaultisse";
const SITE_HOSTNAME = "https://docs.vaultisse.com";

function sidebarItems(items: [title: string, slug: string][]): DefaultTheme.SidebarItem[] {
    return items.map(([text, slug]) => ({ text, link: `/${slug}` }));
}

const SECTIONS_EN: [string, string][] = [
    ["Getting started", "getting-started"],
    ["Dashboard", "dashboard"],
    ["Searching the library", "searching-the-library"],
    ["Adding books", "adding-books"],
    ["Book details & stock", "book-details"],
    ["Printing labels", "printing-labels"],
    ["Lending & returns", "lending-and-returns"],
    ["Customers & groups", "customers-and-groups"],
    ["Categories & authors", "categories-and-authors"],
    ["Locations", "locations"],
    ["Account settings", "settings"],
];

const SECTIONS_ES: [string, string][] = [
    ["Primeros pasos", "getting-started"],
    ["Panel de control", "dashboard"],
    ["Buscar en la biblioteca", "searching-the-library"],
    ["Añadir libros", "adding-books"],
    ["Detalles del libro y existencias", "book-details"],
    ["Imprimir etiquetas", "printing-labels"],
    ["Préstamos y devoluciones", "lending-and-returns"],
    ["Clientes y grupos", "customers-and-groups"],
    ["Categorías y autores", "categories-and-authors"],
    ["Ubicaciones", "locations"],
    ["Configuración de la cuenta", "settings"],
];

const SECTIONS_CA: [string, string][] = [
    ["Primers passos", "getting-started"],
    ["Tauler de control", "dashboard"],
    ["Cercar a la biblioteca", "searching-the-library"],
    ["Afegir llibres", "adding-books"],
    ["Detalls del llibre i estoc", "book-details"],
    ["Imprimir etiquetes", "printing-labels"],
    ["Préstecs i devolucions", "lending-and-returns"],
    ["Clients i grups", "customers-and-groups"],
    ["Categories i autors", "categories-and-authors"],
    ["Ubicacions", "locations"],
    ["Configuració del compte", "settings"],
];

const SECTIONS_IT: [string, string][] = [
    ["Per iniziare", "getting-started"],
    ["Dashboard", "dashboard"],
    ["Cercare in biblioteca", "searching-the-library"],
    ["Aggiungere libri", "adding-books"],
    ["Dettagli del libro e scorte", "book-details"],
    ["Stampare le etichette", "printing-labels"],
    ["Prestiti e restituzioni", "lending-and-returns"],
    ["Clienti e gruppi", "customers-and-groups"],
    ["Categorie e autori", "categories-and-authors"],
    ["Ubicazioni", "locations"],
    ["Impostazioni account", "settings"],
];

const sharedThemeConfig: DefaultTheme.Config = {
    logo: "/favicon.svg",
    socialLinks: [{ icon: "github", link: GITHUB_URL }],
    search: {
        provider: "local",
        options: {
            locales: {
                root: { translations: { button: { buttonText: "Search", buttonAriaLabel: "Search" } } },
                es: { translations: { button: { buttonText: "Buscar", buttonAriaLabel: "Buscar" } } },
                ca: { translations: { button: { buttonText: "Cerca", buttonAriaLabel: "Cerca" } } },
                it: { translations: { button: { buttonText: "Cerca", buttonAriaLabel: "Cerca" } } },
            },
        },
    },
    footer: {
        message: "Released under the MIT License.",
        copyright: `Copyright © ${new Date().getFullYear()} Vaultisse`,
    },
};

export default defineConfig({
    title: "Vaultisse Docs",
    description: "End-user documentation for Vaultisse, the open-source book collection manager.",
    cleanUrls: true,
    lastUpdated: true,
    sitemap: { hostname: SITE_HOSTNAME },
    head: [
        ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
        ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:site_name", content: "Vaultisse Docs" }],
    ],
    themeConfig: sharedThemeConfig,

    locales: {
        root: {
            label: "English",
            lang: "en",
            link: "/",
            title: "Vaultisse Docs",
            description: "End-user documentation for Vaultisse, the open-source book collection manager.",
            themeConfig: {
                nav: [
                    { text: "Guide", link: "/getting-started" },
                    { text: "Vaultisse app", link: APP_URL },
                ],
                sidebar: [{ text: "Documentation", items: sidebarItems(SECTIONS_EN) }],
                outlineTitle: "On this page",
                docFooter: { prev: "Previous page", next: "Next page" },
                darkModeSwitchLabel: "Appearance",
                returnToTopLabel: "Return to top",
                sidebarMenuLabel: "Menu",
                lastUpdatedText: "Last updated",
            },
        },
        es: {
            label: "Español",
            lang: "es",
            link: "/es/",
            title: "Documentación de Vaultisse",
            description: "Documentación para usuarios de Vaultisse, el gestor de colecciones de libros de código abierto.",
            themeConfig: {
                nav: [
                    { text: "Guía", link: "/es/getting-started" },
                    { text: "Aplicación Vaultisse", link: APP_URL },
                ],
                sidebar: [{ text: "Documentación", items: sidebarItems(SECTIONS_ES) }],
                outlineTitle: "En esta página",
                docFooter: { prev: "Página anterior", next: "Página siguiente" },
                darkModeSwitchLabel: "Apariencia",
                returnToTopLabel: "Volver arriba",
                sidebarMenuLabel: "Menú",
                lastUpdatedText: "Última actualización",
            },
        },
        ca: {
            label: "Català",
            lang: "ca",
            link: "/ca/",
            title: "Documentació de Vaultisse",
            description: "Documentació per a usuaris de Vaultisse, el gestor de col·leccions de llibres de codi obert.",
            themeConfig: {
                nav: [
                    { text: "Guia", link: "/ca/getting-started" },
                    { text: "Aplicació Vaultisse", link: APP_URL },
                ],
                sidebar: [{ text: "Documentació", items: sidebarItems(SECTIONS_CA) }],
                outlineTitle: "En aquesta pàgina",
                docFooter: { prev: "Pàgina anterior", next: "Pàgina següent" },
                darkModeSwitchLabel: "Aparença",
                returnToTopLabel: "Torna a dalt",
                sidebarMenuLabel: "Menú",
                lastUpdatedText: "Darrera actualització",
            },
        },
        it: {
            label: "Italiano",
            lang: "it",
            link: "/it/",
            title: "Documentazione di Vaultisse",
            description: "Documentazione per gli utenti di Vaultisse, il gestionale open source per collezioni di libri.",
            themeConfig: {
                nav: [
                    { text: "Guida", link: "/it/getting-started" },
                    { text: "App Vaultisse", link: APP_URL },
                ],
                sidebar: [{ text: "Documentazione", items: sidebarItems(SECTIONS_IT) }],
                outlineTitle: "In questa pagina",
                docFooter: { prev: "Pagina precedente", next: "Pagina successiva" },
                darkModeSwitchLabel: "Aspetto",
                returnToTopLabel: "Torna su",
                sidebarMenuLabel: "Menu",
                lastUpdatedText: "Ultimo aggiornamento",
            },
        },
    },
});
