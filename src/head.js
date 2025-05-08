// Script para mejorar la navegación del sitio
// Este script se ejecuta primero para evitar flash de contenido al cargar la página

// Función para inicializar el tema antes de que se cargue el DOM
function initTheme() {
  const themeValue = localStorage?.getItem('theme') || '';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = themeValue === 'dark' || (!themeValue && prefersDark);
  
  // Aplicar tema inmediatamente
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Ajustar color de fondo antes del DOM
  document.documentElement.style.backgroundColor = isDark ? '#09090b' : '#ffffff';
}

// Función para inicializar la navegación rápida
function initFastNavigation() {
  // Preparar para interceptar clicks en enlaces para navegación más rápida
  document.addEventListener('click', (e) => {
    // Solo procesar enlaces internos
    if (e.target.tagName === 'A' && 
        e.target.href && 
        e.target.href.startsWith(window.location.origin) &&
        !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      
      // Prevenir comportamiento por defecto
      e.preventDefault();
      
      // Actualizar la URL inmediatamente para feedback de usuario
      window.history.pushState({}, '', e.target.href);
      
      // Iniciar la navegación
      fetch(e.target.href).then(response => {
        if (response.ok) {
          window.location.href = e.target.href;
        }
      }).catch(() => {
        // Si falla el fetch, navegar normalmente
        window.location.href = e.target.href;
      });
    }
  });
}

// Exportar funciones para uso en componentes
export { initTheme, initFastNavigation };