import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { InputComponent } from '../input';

expect.extend(toHaveNoViolations);

describe('Input a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = await render(InputComponent, { componentProperties: { id: 'name', placeholder: 'Name' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
