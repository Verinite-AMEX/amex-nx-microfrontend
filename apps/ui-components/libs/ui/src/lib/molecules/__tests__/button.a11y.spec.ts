import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { ButtonComponent } from '../button';

expect.extend(toHaveNoViolations);

describe('Button a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = await render(ButtonComponent, { componentProperties: { label: 'Click me' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
