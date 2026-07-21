import type { Meta, StoryObj } from '@storybook/angular';
import { FormGroupComponent } from '../../composite/form-group';
import { FormFieldComponent } from '../../composite/form-field';
import { InputComponent } from '../../primitives/input';
import { SelectComponent } from '../../primitives/select';
import { TextareaComponent } from '../../primitives/textarea';
import { CheckboxComponent } from '../../primitives/checkbox';
import { RadioGroupComponent } from '../../primitives/radio-group';

const ALL_IMPORTS = [FormFieldComponent, InputComponent, SelectComponent, TextareaComponent, CheckboxComponent, RadioGroupComponent];

const meta: Meta<FormGroupComponent> = {
  title: 'Composite/FormGroup',
  component: FormGroupComponent,
  tags: ['autodocs', 'a11y', 'accessibility', 'wcag', 'form-validation', 'screen-reader', 'keyboard-navigation'],
  argTypes: {
    legend: { control: 'text' },
    layout: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
};

export default meta;
type Story = StoryObj<FormGroupComponent>;

export const PersonalInfo: Story = {
  args: { legend: 'Personal Information', layout: 'vertical' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ALL_IMPORTS },
    template: `
      <ui-form-group [legend]="legend" [layout]="layout">
        <ui-form-field label="First Name" [required]="true">
          <ui-input type="text" placeholder="John"></ui-input>
        </ui-form-field>
        <ui-form-field label="Last Name" [required]="true">
          <ui-input type="text" placeholder="Doe"></ui-input>
        </ui-form-field>
        <ui-form-field label="Email" hint="We will never share your email" [required]="true">
          <ui-input type="email" placeholder="john@example.com"></ui-input>
        </ui-form-field>
      </ui-form-group>
    `,
  }),
};

export const HorizontalLayout: Story = {
  args: { legend: 'Address', layout: 'horizontal' },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: ALL_IMPORTS },
    template: `
      <ui-form-group [legend]="legend" [layout]="layout">
        <ui-form-field label="Street">
          <ui-input type="text" placeholder="123 Main St"></ui-input>
        </ui-form-field>
        <ui-form-field label="City">
          <ui-input type="text" placeholder="New York"></ui-input>
        </ui-form-field>
        <ui-form-field label="Country">
          <ui-select [options]="[{label:'USA',value:'us'},{label:'UK',value:'uk'}]" placeholder="Select"></ui-select>
        </ui-form-field>
      </ui-form-group>
    `,
  }),
};

export const FullContactForm: Story = {
  args: { legend: 'Contact Us', layout: 'vertical' },
  render: (args) => ({
    props: {
      ...args,
      subjectOptions: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Support', value: 'support' },
        { label: 'Billing', value: 'billing' },
      ],
      priorityOptions: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
    moduleMetadata: { imports: ALL_IMPORTS },
    template: `
      <ui-form-group [legend]="legend">
        <ui-form-field label="Name" [required]="true">
          <ui-input type="text" placeholder="Your name"></ui-input>
        </ui-form-field>
        <ui-form-field label="Email" [required]="true">
          <ui-input type="email" placeholder="your@email.com"></ui-input>
        </ui-form-field>
        <ui-form-field label="Subject">
          <ui-select [options]="subjectOptions" placeholder="Select subject"></ui-select>
        </ui-form-field>
        <ui-form-field label="Priority">
          <ui-radio-group [options]="priorityOptions" name="priority" orientation="horizontal"></ui-radio-group>
        </ui-form-field>
        <ui-form-field label="Message" [required]="true">
          <ui-textarea placeholder="Describe your issue..." [rows]="5"></ui-textarea>
        </ui-form-field>
        <ui-form-field>
          <ui-checkbox label="I agree to the terms and conditions"></ui-checkbox>
        </ui-form-field>
      </ui-form-group>
    `,
  }),
};
