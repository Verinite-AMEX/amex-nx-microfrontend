import type { Preview } from '@storybook/angular';

// DLS component CSS partials — add one block per component as it gets
// upgraded to use real DLS classes. See chat history for per-component status.

// Buttons (button.ts, icon-button.ts)
import '@amex-verinite/dls/css/btn.css';
import '@amex-verinite/dls/css/btnLoading.css';
import '@amex-verinite/dls/css/btnIcon.css';
import '@amex-verinite/dls/css/btnCircle.css';
import '@amex-verinite/dls/css/colorsDls.css';
import '@amex-verinite/dls/css/badge.css';
import '@amex-verinite/dls/css/colorsCard.css';
import '@amex-verinite/dls/css/flex.css';      
import '@amex-verinite/dls/css/focus.css';
import '@amex-verinite/dls/css/typography.css';
import '@amex-verinite/dls/css/breadcrumb.css';
import '@amex-verinite/dls/css/elements.css';
import '@amex-verinite/dls/css/collapsible.css';
import '@amex-verinite/dls/css/typography.css';
import '@amex-verinite/dls/css/forms.css';
import '@amex-verinite/dls/css/fileUpload.css';
import '@amex-verinite/dls/css/search.css';
import '@amex-verinite/dls/css/select.css';
import '@amex-verinite/dls/css/hint.css';
import '@amex-verinite/dls/css/card.css';
import '@amex-verinite/dls/css/cardActionable.css';
import '@amex-verinite/dls/css/checkbox.css';
import '@amex-verinite/dls/css/modal.css';
import '@amex-verinite/dls/css/accessibility.css';
import '@amex-verinite/dls/css/datePicker.css';    
import '@amex-verinite/dls/css/iconography.css';
import '@amex-verinite/dls/css/alert.css';
import '@amex-verinite/dls/css/animFade.css';
import '@amex-verinite/dls/css/iconography.css';
import '@amex-verinite/dls/css/progressBar.css';
import '@amex-verinite/dls/css/progressCircle.css';
import '@amex-verinite/dls/css/tabs.css';
import '@amex-verinite/dls/css/tags.css';
import '@amex-verinite/dls/css/radio.css';
import '@amex-verinite/dls/css/switches.css';
import '@amex-verinite/dls/css/pagination.css';
import '@amex-verinite/dls/css/text.css';

// Demo-only CSS for the Button "Contextual" story. Not part of DLS, and not
// injected by any component. DLS's own .btnContextual class deliberately does
// not set text color (site/components/buttons -> "Contextual Text Buttons",
// marked Deprecated) — a real consumer must supply their own text-color class
// alongside .btn when using it. This exists purely so that story can
// demonstrate that requirement instead of showing invisible white-on-white
// text. It's injected here as a raw <style> tag via plain DOM APIs — not as
// an Angular component template <style> — because Angular's view
// encapsulation scopes template-level styles to that component's own
// elements only; it can never reach into a child component's (ui-button's)
// internal template from a parent story wrapper. A plain global stylesheet,
// added to <head> before Angular ever mounts, has no such boundary.
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.setAttribute('data-source', 'preview.ts:contextual-demo');
  style.textContent = `.contextual-demo .btn { color: #006fcf; }`;
  document.head.appendChild(style);
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Docs',
          ['Introduction', 'Release Notes'],
          'Primitives',
          'Composite',
          'Patterns',
        ],
      },
    },
  },
};

export default preview;