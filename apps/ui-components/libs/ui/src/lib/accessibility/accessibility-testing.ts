/**
 * Accessibility Testing Utilities
 * Provides comprehensive testing functions for WCAG 2.0 AA compliance
 */

export interface AccessibilityTestResult {
  passed: boolean;
  violations: AccessibilityViolation[];
  warnings: AccessibilityWarning[];
  passes: AccessibilityPass[];
}

export interface AccessibilityViolation {
  rule: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  element: string;
  helpUrl: string;
}

export interface AccessibilityWarning {
  rule: string;
  description: string;
  element: string;
  recommendation: string;
}

export interface AccessibilityPass {
  rule: string;
  description: string;
  element: string;
}

export class AccessibilityTester {
  private static readonly WCAG_RULES = {
    'keyboard-navigation': {
      description: 'All interactive elements must be keyboard accessible',
      test: this.testKeyboardNavigation.bind(this)
    },
    'focus-management': {
      description: 'Focus must be visible and properly managed',
      test: this.testFocusManagement.bind(this)
    },
    'aria-attributes': {
      description: 'ARIA attributes must be correctly used',
      test: this.testAriaAttributes.bind(this)
    },
    'color-contrast': {
      description: 'Text must have sufficient color contrast',
      test: this.testColorContrast.bind(this)
    },
    'semantic-html': {
      description: 'Semantic HTML elements must be used appropriately',
      test: this.testSemanticHtml.bind(this)
    },
    'screen-reader-support': {
      description: 'Content must be accessible to screen readers',
      test: this.testScreenReaderSupport.bind(this)
    }
  };

  /**
   * Run comprehensive accessibility tests on a component
   */
  static async testComponent(element: HTMLElement): Promise<AccessibilityTestResult> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    for (const [ruleId, rule] of Object.entries(this.WCAG_RULES)) {
      try {
        const result = await rule.test(element);
        
        if (result.violations) {
          violations.push(...result.violations);
        }
        if (result.warnings) {
          warnings.push(...result.warnings);
        }
        if (result.passes) {
          passes.push(...result.passes);
        }
      } catch (error) {
        warnings.push({
          rule: ruleId,
          description: `Test failed: ${error.message}`,
          element: element.tagName,
          recommendation: 'Review component implementation'
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
      warnings,
      passes
    };
  }

  /**
   * Test keyboard navigation accessibility
   */
  private static async testKeyboardNavigation(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Find all interactive elements
    const interactiveElements = element.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach((el, index) => {
      const element = el as HTMLElement;
      
      // Check if element is focusable
      if (!this.isFocusable(element)) {
        violations.push({
          rule: 'keyboard-navigation',
          impact: 'critical',
          description: 'Interactive element is not keyboard focusable',
          element: element.tagName + (element.className ? '.' + element.className : ''),
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard'
        });
        return;
      }

      // Check for proper tabindex
      if (element.tabIndex < 0 && !this.isNativelyFocusable(element)) {
        warnings.push({
          rule: 'keyboard-navigation',
          description: 'Element has negative tabindex but should be focusable',
          element: element.tagName,
          recommendation: 'Use tabindex="0" or remove tabindex attribute'
        });
      }

      passes.push({
        rule: 'keyboard-navigation',
        description: 'Element is keyboard accessible',
        element: element.tagName
      });
    });

    // Check for focus trap in modals
    if (element.querySelector('[role="dialog"], .modal, .popup')) {
      const hasFocusTrap = this.hasFocusTrap(element);
      if (!hasFocusTrap) {
        violations.push({
          rule: 'keyboard-navigation',
          impact: 'serious',
          description: 'Modal/dialog does not implement focus trapping',
          element: 'dialog/modal',
          helpUrl: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/'
        });
      }
    }

    return { violations, warnings, passes };
  }

  /**
   * Test focus management
   */
  private static async testFocusManagement(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Check for visible focus indicators
    const style = window.getComputedStyle(element);
    const computedStyles = new Map<string, string>();
    
    // Get focus styles
    const focusElement = document.createElement('div');
    focusElement.style.cssText = style.cssText;
    document.body.appendChild(focusElement);
    focusElement.focus();
    const focusStyles = window.getComputedStyle(focusElement);
    document.body.removeChild(focusElement);

    const hasFocusIndicator = 
      focusStyles.outline !== 'none' && 
      focusStyles.outlineWidth !== '0px' &&
      focusStyles.outlineColor !== 'transparent';

    if (!hasFocusIndicator) {
      violations.push({
        rule: 'focus-management',
        impact: 'critical',
        description: 'Component lacks visible focus indicators',
        element: element.tagName,
        helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/FocusVisible'
      });
    }

    // Check for proper focus order
    const focusableElements = element.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    for (let i = 0; i < focusableElements.length - 1; i++) {
      const current = focusableElements[i] as HTMLElement;
      const next = focusableElements[i + 1] as HTMLElement;
      
      // Check if focus order follows DOM order
      if (current.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_PRECEDING) {
        warnings.push({
          rule: 'focus-management',
          description: 'Focus order may not follow logical reading order',
          element: current.tagName + ' -> ' + next.tagName,
          recommendation: 'Ensure focus order matches visual order'
        });
      }
    }

    return { violations, warnings, passes };
  }

  /**
   * Test ARIA attributes
   */
  private static async testAriaAttributes(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Find all elements with ARIA attributes
    const ariaElements = element.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role], [aria-expanded], [aria-pressed]');

    ariaElements.forEach(el => {
      const element = el as HTMLElement;
      
      // Check aria-label usage
      if (element.hasAttribute('aria-label') && element.textContent?.trim()) {
        warnings.push({
          rule: 'aria-attributes',
          description: 'Element has both aria-label and visible text',
          element: element.tagName,
          recommendation: 'Use either aria-label or visible text, not both'
        });
      }

      // Check aria-labelledby references
      if (element.hasAttribute('aria-labelledby')) {
        const labelledById = element.getAttribute('aria-labelledby');
        if (labelledById && !document.getElementById(labelledById)) {
          violations.push({
            rule: 'aria-attributes',
            impact: 'critical',
            description: 'aria-labelledby references non-existent element',
            element: element.tagName,
            helpUrl: 'https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby'
          });
        }
      }

      // Check aria-describedby references
      if (element.hasAttribute('aria-describedby')) {
        const describedById = element.getAttribute('aria-describedby');
        if (describedById && !document.getElementById(describedById)) {
          violations.push({
            rule: 'aria-attributes',
            impact: 'critical',
            description: 'aria-describedby references non-existent element',
            element: element.tagName,
            helpUrl: 'https://www.w3.org/TR/wai-aria-1.1/#aria-describedby'
          });
        }
      }

      // Check role usage
      if (element.hasAttribute('role')) {
        const role = element.getAttribute('role');
        if (this.isInvalidRole(role)) {
          violations.push({
            rule: 'aria-attributes',
            impact: 'serious',
            description: `Invalid role attribute: ${role}`,
            element: element.tagName,
            helpUrl: 'https://www.w3.org/TR/wai-aria-1.1/#role_definitions'
          });
        }
      }

      passes.push({
        rule: 'aria-attributes',
        description: 'ARIA attributes are properly used',
        element: element.tagName
      });
    });

    return { violations, warnings, passes };
  }

  /**
   * Test color contrast
   */
  private static async testColorContrast(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Get all text elements
    const textElements = element.querySelectorAll('*');
    
    textElements.forEach(el => {
      const element = el as HTMLElement;
      const text = element.textContent?.trim();
      
      if (!text) return;

      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;

      // Convert colors to RGB
      const textColor = this.hexToRgb(color);
      const bgColor = this.hexToRgb(backgroundColor);

      if (textColor && bgColor) {
        const contrastRatio = this.calculateContrastRatio(textColor, bgColor);
        
        // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
        const fontSize = parseFloat(styles.fontSize);
        const fontWeight = styles.fontWeight;
        const isLargeText = fontSize >= 18 || (fontSize >= 14 && fontWeight === 'bold' || fontWeight === '700');
        
        const requiredRatio = isLargeText ? 3 : 4.5;

        if (contrastRatio < requiredRatio) {
          violations.push({
            rule: 'color-contrast',
            impact: 'critical',
            description: `Insufficient color contrast: ${contrastRatio.toFixed(2)}:1 (required: ${requiredRatio}:1)`,
            element: element.tagName,
            helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum'
          });
        } else {
          passes.push({
            rule: 'color-contrast',
            description: `Sufficient color contrast: ${contrastRatio.toFixed(2)}:1`,
            element: element.tagName
          });
        }
      }
    });

    return { violations, warnings, passes };
  }

  /**
   * Test semantic HTML usage
   */
  private static async testSemanticHtml(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Check for proper heading hierarchy
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (lastLevel > 0 && level > lastLevel + 1) {
        warnings.push({
          rule: 'semantic-html',
          description: `Heading level skipped: h${lastLevel} to h${level}`,
          element: heading.tagName,
          recommendation: 'Use proper heading hierarchy'
        });
      }
      
      lastLevel = level;
    });

    // Check for proper button usage
    const fakeButtons = element.querySelectorAll('[onclick]:not(button):not([role="button"])');
    fakeButtons.forEach(el => {
      violations.push({
        rule: 'semantic-html',
        impact: 'serious',
        description: 'Clickable element should be a button or have role="button"',
        element: el.tagName,
        helpUrl: 'https://www.w3.org/TR/wai-aria-1.1/#button'
      });
    });

    // Check for proper list usage
    const lists = element.querySelectorAll('ul, ol, li');
    lists.forEach(el => {
      const element = el as HTMLElement;
      if (element.tagName === 'LI' && !element.closest('ul, ol')) {
        violations.push({
          rule: 'semantic-html',
          impact: 'moderate',
          description: 'List item not contained in list element',
          element: 'LI',
          helpUrl: 'https://www.w3.org/TR/html52/grouping-content.html#the-li-element'
        });
      }
    });

    return { violations, warnings, passes };
  }

  /**
   * Test screen reader support
   */
  private static async testScreenReaderSupport(element: HTMLElement): Promise<{
    violations?: AccessibilityViolation[];
    warnings?: AccessibilityWarning[];
    passes?: AccessibilityPass[];
  }> {
    const violations: AccessibilityViolation[] = [];
    const warnings: AccessibilityWarning[] = [];
    const passes: AccessibilityPass[] = [];

    // Check for alt text on images
    const images = element.querySelectorAll('img');
    images.forEach(img => {
      const hasAlt = img.hasAttribute('alt');
      const alt = img.getAttribute('alt');
      
      if (!hasAlt) {
        violations.push({
          rule: 'screen-reader-support',
          impact: 'critical',
          description: 'Image missing alt attribute',
          element: 'IMG',
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/text-alt'
        });
      } else if (alt === '' && !img.hasAttribute('role')) {
        // Decorative image - this is OK
        passes.push({
          rule: 'screen-reader-support',
          description: 'Decorative image properly marked',
          element: 'IMG'
        });
      } else {
        passes.push({
          rule: 'screen-reader-support',
          description: 'Image has appropriate alt text',
          element: 'IMG'
        });
      }
    });

    // Check for form labels
    const inputs = element.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const hasLabel = this.hasAssociatedLabel(input as HTMLElement);
      
      if (!hasLabel) {
        violations.push({
          rule: 'screen-reader-support',
          impact: 'critical',
          description: 'Form input missing associated label',
          element: input.tagName,
          helpUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions'
        });
      } else {
        passes.push({
          rule: 'screen-reader-support',
          description: 'Form input has associated label',
          element: input.tagName
        });
      }
    });

    // Check for live regions
    const liveRegions = element.querySelectorAll('[aria-live], [role="status"], [role="alert"]');
    liveRegions.forEach(region => {
      passes.push({
        rule: 'screen-reader-support',
        description: 'Live region properly implemented',
        element: region.tagName
      });
    });

    return { violations, warnings, passes };
  }

  // Helper methods
  private static isFocusable(element: HTMLElement): boolean {
    return element.tabIndex >= 0 || this.isNativelyFocusable(element);
  }

  private static isNativelyFocusable(element: HTMLElement): boolean {
    const focusableTags = ['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY', 'DETAILS'];
    return focusableTags.includes(element.tagName) || 
           (element.tagName === 'A' && element.hasAttribute('href'));
  }

  private static hasFocusTrap(element: HTMLElement): boolean {
    // Simple check for focus trap implementation
    return element.querySelector('[data-focus-trap]') !== null ||
           element.classList.contains('focus-trap');
  }

  private static isInvalidRole(role: string): boolean {
    const validRoles = [
      'alert', 'alertdialog', 'application', 'article', 'banner', 'button', 'cell',
      'checkbox', 'columnheader', 'combobox', 'complementary', 'contentinfo', 'definition',
      'dialog', 'directory', 'document', 'feed', 'figure', 'form', 'grid', 'gridcell',
      'group', 'heading', 'img', 'link', 'list', 'listbox', 'listitem', 'log', 'main',
      'marquee', 'math', 'menu', 'menubar', 'menuitem', 'menuitemcheckbox', 'menuitemradio',
      'navigation', 'none', 'note', 'option', 'presentation', 'progressbar', 'radio',
      'radiogroup', 'region', 'row', 'rowgroup', 'rowheader', 'scrollbar', 'search',
      'searchbox', 'separator', 'slider', 'spinbutton', 'status', 'switch', 'tab',
      'table', 'tablist', 'tabpanel', 'term', 'textbox', 'timer', 'toolbar', 'tooltip',
      'tree', 'treegrid', 'treeitem'
    ];
    return !validRoles.includes(role);
  }

  private static hexToRgb(color: string): { r: number; g: number; b: number } | null {
    if (color.startsWith('#')) {
      const hex = color.slice(1);
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
      };
    }
    
    if (color.startsWith('rgb')) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        return {
          r: parseInt(matches[0]),
          g: parseInt(matches[1]),
          b: parseInt(matches[2])
        };
      }
    }
    
    return null;
  }

  private static calculateContrastRatio(rgb1: { r: number; g: number; b: number }, rgb2: { r: number; g: number; b: number }): number {
    const luminance1 = this.calculateLuminance(rgb1);
    const luminance2 = this.calculateLuminance(rgb2);
    
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private static calculateLuminance(rgb: { r: number; g: number; b: number }): number {
    const rsRGB = rgb.r / 255;
    const gsRGB = rgb.g / 255;
    const bsRGB = rgb.b / 255;
    
    const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  private static hasAssociatedLabel(input: HTMLElement): boolean {
    if (input.id) {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) return true;
    }
    
    // Check if input is wrapped in label
    const parent = input.closest('label');
    if (parent) return true;
    
    // Check for aria-label or aria-labelledby
    if (input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby')) {
      return true;
    }
    
    return false;
  }
}
