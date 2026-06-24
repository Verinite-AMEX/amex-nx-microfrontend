import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { AccordionComponent, AccordionItem } from '../accordion';

expect.extend(toHaveNoViolations);

describe('Accordion a11y', () => {
  it('has no accessibility violations', async () => {
    const items: AccordionItem[] = [
      { id: 'a1', title: 'First', content: 'Content 1' },
      { id: 'a2', title: 'Second', content: 'Content 2' },
    ];

    const { container } = await render(AccordionComponent, { componentProperties: { items } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
