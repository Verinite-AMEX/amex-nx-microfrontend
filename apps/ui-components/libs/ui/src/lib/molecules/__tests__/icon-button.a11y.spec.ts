import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { IconButtonComponent } from '../icon-button';

expect.extend(toHaveNoViolations);

describe('IconButton a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = await render(IconButtonComponent, { componentProperties: { ariaLabel: 'Favorite' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
