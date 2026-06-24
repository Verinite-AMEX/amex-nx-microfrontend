import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { TabsComponent, TabItem } from '../tabs';

expect.extend(toHaveNoViolations);

describe('Tabs a11y', () => {
  it('has no accessibility violations', async () => {
    const tabs: TabItem[] = [
      { id: 'one', label: 'One' },
      { id: 'two', label: 'Two' },
    ];

    const { container } = await render(TabsComponent, { componentProperties: { tabs } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
