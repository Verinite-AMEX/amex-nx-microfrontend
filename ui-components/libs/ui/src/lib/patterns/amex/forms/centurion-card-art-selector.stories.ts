import type { Meta, StoryObj } from '@storybook/angular';
import { AmexCenturionCardArtSelectorComponent } from './centurion-card-art-selector';
const meta: Meta<AmexCenturionCardArtSelectorComponent> = { title: 'Patterns/Amex/Forms/CenturionCardArtSelector', component: AmexCenturionCardArtSelectorComponent, tags: ['autodocs'],
  argTypes: {
    cardArts: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexCenturionCardArtSelectorComponent>;
export const Default: Story = { name: 'Centurion Living — Select Card Art', args: { title: 'Select Card Art' } };