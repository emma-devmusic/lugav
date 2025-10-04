/**
 * LUGAV Components Loader
 * Sistema de componentes reutilizables con Fetch API
 * 
 * Uso: Agregar <div data-component="nombre"></div> en el HTML
 */

(function() {
    'use strict';

    const COMPONENTS_PATH = 'components/';
    const COMPONENTS = {
        preloader: 'preloader.html',
        header: 'header.html',
        footer: 'footer.html'
    };

    /**
     * Carga un componente desde el servidor
     */
    async function loadComponent(componentName) {
        try {
            const response = await fetch(COMPONENTS_PATH + COMPONENTS[componentName]);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error cargando componente '${componentName}':`, error);
            return '';
        }
    }

    /**
     * Inserta HTML del componente en el placeholder
     */
    function insertComponent(placeholder, html) {
        placeholder.outerHTML = html;
    }

    /**
     * Detecta la página actual
     */
    function getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    /**
     * Configura el header según la página actual
     */
    function configureHeader() {
        const header = document.querySelector('#dynamic-header');
        if (!header) return;

        const currentPage = getCurrentPage();
        
        // Marcar nav-item activo
        const navItems = header.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const pageName = item.getAttribute('data-page');
            if (pageName === currentPage) {
                item.classList.add('active');
                const link = item.querySelector('.nav-link');
                if (link) {
                    link.innerHTML += ' <span class="sr-only">(current)</span>';
                }
            }
        });

        // Agregar background si NO es index
        if (currentPage !== 'index') {
            header.classList.add('bg-img');
            header.style.backgroundImage = 'url(img/bg-img/14.jpg)';
        }
    }

    /**
     * Inicializa la carga de componentes
     */
    async function initComponents() {
        const placeholders = document.querySelectorAll('[data-component]');
        
        // Cargar todos los componentes
        const promises = Array.from(placeholders).map(async placeholder => {
            const componentName = placeholder.getAttribute('data-component');
            
            if (COMPONENTS[componentName]) {
                const html = await loadComponent(componentName);
                if (html) {
                    insertComponent(placeholder, html);
                }
            } else {
                console.warn(`Componente '${componentName}' no encontrado`);
            }
        });

        await Promise.all(promises);

        // Configurar header
        configureHeader();

        // Evento para que otros scripts sepan que los componentes están listos
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

})();
