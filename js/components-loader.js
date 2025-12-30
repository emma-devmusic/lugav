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
        footer: 'footer.html',
        'instagram-section': 'instagram-section.html'
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

        // Configurar preloader con fact aleatorio
        configureRandomFact();

        // Ocultar preloader inicial y mostrar contenido
        hideInitialPreloader();

        // Evento para que otros scripts sepan que los componentes están listos
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }

    /**
     * Configura el preloader para mostrar solo un fact aleatorio
     */
    function configureRandomFact() {
        const questionsList = document.querySelector('.questions-area ul');
        if (!questionsList) return;

        const facts = questionsList.querySelectorAll('li');
        if (facts.length === 0) return;

        // Seleccionar un índice aleatorio
        const randomIndex = Math.floor(Math.random() * facts.length);

        // Ocultar todos los facts
        facts.forEach((fact, index) => {
            fact.classList.remove('question-show');
            if (index === randomIndex) {
                // Mostrar solo el fact aleatorio seleccionado
                fact.classList.add('question-show');
            }
        });
    }

    /**
     * Oculta el preloader inicial y muestra el contenido
     */
    function hideInitialPreloader() {
        const initialPreloader = document.getElementById('initial-preloader');
        if (initialPreloader) {
            // Hacer visible el body
            document.body.classList.add('components-loaded');
            
            // Quitar el preloader inicial después de un breve delay
            setTimeout(() => {
                initialPreloader.style.display = 'none';
            }, 300);
        } else {
            // Fallback: solo hacer visible el body
            document.body.classList.add('components-loaded');
        }
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }

})();
