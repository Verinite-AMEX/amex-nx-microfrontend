import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { ModalComponent } from '../modal';

expect.extend(toHaveNoViolations);

describe('Modal a11y', () => {
  it('has no accessibility violations when open', async () => {
    const { container } = await render(ModalComponent, { componentProperties: { open: true, title: 'Dialog' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
