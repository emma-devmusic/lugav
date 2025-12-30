(function ($) {
  "use strict";

  // Video Container Toggle & Control
  var videoExpanded = false;
  var $activeContainer = null;
  var expandTimer = null;
  var EXPAND_DELAY = 2000; // 2 segundos

  function normalizeVideoIframes() {
    var origin = window.location.origin;
    var protocol = window.location.protocol || "";
    var canReportOrigin =
      typeof origin === "string" &&
      origin !== "null" &&
      (protocol === "http:" || protocol === "https:");
    var hasURLSupport = typeof URL === "function";

    $(".video-wrapper iframe").each(function () {
      var $iframe = $(this);

      if (!$iframe.hasClass("video-iframe")) {
        $iframe.addClass("video-iframe");
      }

      if (!canReportOrigin || !hasURLSupport) {
        return;
      }

      var src = $iframe.attr("src");
      if (!src) {
        return;
      }

      try {
        var normalizedUrl = new URL(src, window.location.href);
        if (!normalizedUrl.searchParams.has("origin")) {
          normalizedUrl.searchParams.append("origin", origin);
          $iframe.attr("src", normalizedUrl.toString());
        }
      } catch (error) {
        console.warn(
          "No se pudo normalizar el iframe de YouTube:",
          error
        );
      }
    });
  }

  normalizeVideoIframes();

  // Estado inicial del iframe (bloqueamos interacción hasta expandir)
  $(".video-iframe").css({
    width: "100%",
    height: "315px",
    "pointer-events": "none",
  });

  function scheduleExpand($container) {
    cancelScheduledExpand();
    expandTimer = setTimeout(function () {
      expandTimer = null;
      expandVideo($container);
    }, EXPAND_DELAY);
  }

  function cancelScheduledExpand() {
    if (expandTimer) {
      clearTimeout(expandTimer);
      expandTimer = null;
    }
  }

  function ensureCloseButton($container) {
    if ($container.find('.video-close-btn').length === 0) {
      var $btn = $('<button class="video-close-btn" aria-label="Cerrar video">&times;</button>');
      $btn.css({
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '35px',
        height: '35px',
        'border-radius': '50%',
        border: 'none',
        'background-color': '#ffffff',
        color: '#000000',
        'font-size': '20px',
        cursor: 'pointer',
        'box-shadow': '0 4px 10px rgba(0, 0, 0, 0.2)'
      });
      $container.append($btn);
      $btn.on('click', function (e) {
        e.stopPropagation();
        collapseVideo();
      });
    }
  }

  // Función para expandir el video
  function expandVideo($container) {
    cancelScheduledExpand();

    if (!videoExpanded) {
      $activeContainer = $container;

      // Bloquear scroll del body
      $('body').addClass('mfp-no-scroll');

      // Crear overlay de fondo si no existe
      if ($('#video-overlay').length === 0) {
        $('body').append('<div id="video-overlay" class="video-overlay"></div>');
      }
      $('#video-overlay').show();

      $container.css({
        overflow: "visible",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        "z-index": "99999",
        background: "rgba(0,0,0,0.9)",
        padding: "20px",
        "border-radius": "8px",
        width: "90vw",
        "max-width": "900px",
        height: "auto",
        "box-shadow": "0 10px 30px rgba(0,0,0,0.5)"
      });

      $container.find(".video-iframe").css({
        width: "100%",
        height: "450px",
        "pointer-events": "auto",
      });

      ensureCloseButton($container);

      videoExpanded = true;
    }
  }

  // Función para colapsar el video
  function collapseVideo() {
    if (videoExpanded && $activeContainer) {
      var $iframe = $activeContainer.find(".video-iframe");

      // Detener el video
      var iframeSrc = $iframe.attr("src");
      $iframe.attr("src", iframeSrc);

      // Restaurar scroll del body
      $('body').removeClass('mfp-no-scroll');

      // Ocultar overlay
      $('#video-overlay').hide();

      // Restaurar estilos
      $activeContainer.attr(
        "style",
        "overflow: hidden; position: relative; cursor: pointer;"
      );

      $iframe.attr(
        "style",
        "width: 100%; height: 315px; pointer-events: none;"
      );

      $activeContainer.find('.video-close-btn').remove();

      videoExpanded = false;
      $activeContainer = null;
    }
  }

  // Hover inicia temporizador de expansión
  $(".video-container").on("mouseenter", function () {
    if (!videoExpanded) {
      scheduleExpand($(this));
    }
  });

  // DESKTOP: Mouse leave con delay
  $(".video-container").on("mouseleave", function () {
    if (!videoExpanded) {
      cancelScheduledExpand();
      return;
    }
  });

  // TOUCH/Clic directo sobre el contenedor del video (expansión inmediata)
  $(".video-container").on("click touchstart", function (e) {
    if (!videoExpanded) {
      e.stopPropagation();
      expandVideo($(this));
    }
  });

  // Fallback por si se hace click en el wrapper externo
  $(".video-wrapper").on("click", function (e) {
    if (!videoExpanded) {
      e.stopPropagation();
      expandVideo($(this).find(".video-container"));
    }
  });

  // Cerrar al hacer click fuera o en el overlay
  $(document).on("click", function (e) {
    if (
      videoExpanded &&
      !$(e.target).closest(".video-container").length &&
      !$(e.target).closest(".video-wrapper").length
    ) {
      collapseVideo();
    }
  });

  // Cerrar al hacer click en el overlay específicamente
  $(document).on("click", "#video-overlay", function() {
    if (videoExpanded) {
      collapseVideo();
    }
  });

  // Cerrar con ESC
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && videoExpanded) {
      collapseVideo();
    }
  });
})(jQuery);
