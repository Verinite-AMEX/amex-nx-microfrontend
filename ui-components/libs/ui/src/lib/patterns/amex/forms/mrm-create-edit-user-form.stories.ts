import type { Meta, StoryObj } from '@storybook/angular';
import { AmexMRMCreateEditUserFormComponent } from './mrm-create-edit-user-form';
const meta: Meta<AmexMRMCreateEditUserFormComponent> = { title: 'Patterns/Amex/Forms/MRMCreateEditUserForm', component: AmexMRMCreateEditUserFormComponent, tags: ['autodocs'],
  argTypes: {
    roleOptions: { control: 'object' },
    merchantOptions: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<AmexMRMCreateEditUserFormComponent>;
export const CreateUser: Story = { name: 'OMS — Create MRM User', args: { title: 'CREATE MRM USER' } };
export const EditUser: Story = { name: 'OMS — Edit MRM User', args: { title: 'EDIT MRM USER', form: { name: 'Essa', email: 'essa.memon@americanexpress.com.bh', username: 'mrmadmin', role: 'mrm_admin', merchantAccess: ['9275640241'] } } };