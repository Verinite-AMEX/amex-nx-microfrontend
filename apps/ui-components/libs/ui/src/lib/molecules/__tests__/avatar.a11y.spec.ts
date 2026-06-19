import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { AvatarComponent } from '../avatar';

expect.extend(toHaveNoViolations);

describe('Avatar a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = await render(AvatarComponent, { componentProperties: { initials: 'AB' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
