import { render } from '@testing-library/angular';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe';
import { FileUploadComponent } from '../file-upload';

expect.extend(toHaveNoViolations);

describe('FileUpload a11y', () => {
  it('has no accessibility violations', async () => {
    const { container } = await render(FileUploadComponent, { componentProperties: { hint: 'Upload files' } });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
