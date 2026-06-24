import type { Meta, StoryObj } from '@storybook/angular';
import { AmexTableWithRowActionsComponent } from './table-with-row-actions';

const meta: Meta<AmexTableWithRowActionsComponent> = {
  title: 'AMEX/Tables/TableWithRowActions',
  component: AmexTableWithRowActionsComponent,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<AmexTableWithRowActionsComponent>;

// SOC/ROC style — Modify + Delete + Print SOC
export const SOCROCStyle: Story = {
  name: 'SOC/ROC — Modify / Delete / Print SOC',
  args: {
    sectionTitle: 'SOC & ROC Records',
    showTopBar: true,
    showPdf: true,
    showPrint: true,
    showExport: true,
    showBack: true,
    columns: [
      { key: 'seNo',         label: 'SE Number' },
      { key: 'socRefNo',     label: 'SOC Ref No.' },
      { key: 'totalAmount',  label: 'Grand Total' },
      { key: 'noOfCharges',  label: 'No. of Charges' },
      { key: 'cardAccountNo',label: 'Card Account No.' },
    ],
    rows: [
      { seNo: '12345001', socRefNo: 'SOC-00123', totalAmount: '1,250.00', noOfCharges: '5', cardAccountNo: '3714-XXXXXX-12345' },
      { seNo: '12345002', socRefNo: 'SOC-00124', totalAmount: '2,800.00', noOfCharges: '8', cardAccountNo: '3714-XXXXXX-12346' },
      { seNo: '12345003', socRefNo: 'SOC-00125', totalAmount: '430.00',   noOfCharges: '2', cardAccountNo: '3714-XXXXXX-12347' },
    ],
    actions: [
      { label: 'Modify',   action: 'modify',  variant: 'primary' },
      { label: 'Delete',   action: 'delete',  variant: 'danger' },
      { label: 'Print SOC',action: 'print',   variant: 'primary' },
    ],
  },
};

// OMS User Management — Reset Password + Edit
export const OMSUserManagement: Story = {
  name: 'OMS — Reset Password / Edit',
  args: {
    sectionTitle: 'OMS User Administration',
    showTopBar: false,
    columns: [
      { key: 'userId',    label: 'User ID' },
      { key: 'userName',  label: 'User Name' },
      { key: 'merchant',  label: 'Merchant Number' },
      { key: 'email',     label: 'Email Address' },
      { key: 'status',    label: 'Status' },
    ],
    rows: [
      { userId: 'vpaytest1', userName: 'Test User 1', merchant: '9275640241', email: 'test1@amex.com', status: 'Active' },
      { userId: 'vpaytest2', userName: 'Test User 2', merchant: '9275640242', email: 'test2@amex.com', status: 'Inactive' },
      { userId: 'vpaytest3', userName: 'Test User 3', merchant: '9275640243', email: 'test3@amex.com', status: 'Active' },
    ],
    actions: [
      { label: 'Reset Password', action: 'reset-password', variant: 'primary' },
      { label: 'Edit',           action: 'edit',           variant: 'primary' },
    ],
  },
};

// BTA User Management — Reset Password + Edit + Delete
export const BTAUserManagement: Story = {
  name: 'BTA — Reset Password / Edit / Delete',
  args: {
    sectionTitle: 'BTA User Management',
    showTopBar: false,
    columns: [
      { key: 'userId',    label: 'User ID' },
      { key: 'fullName',  label: 'Full Name' },
      { key: 'email',     label: 'Email Address' },
      { key: 'status',    label: 'Account Status' },
      { key: 'country',   label: 'Country' },
    ],
    rows: [
      { userId: 'zbaloch301',  fullName: 'Zaheer Baloch',      email: 'zaheer.baloch@amex.com.bh', status: 'Active',   country: 'Bahrain' },
      { userId: 'zaheer302',   fullName: 'Zaheer Baloch',      email: 'zaheer.baloch@amex.com.bh', status: 'Active',   country: 'Afghanistan' },
      { userId: 'khonji1234',  fullName: 'Abdulrahman Khonji', email: 'khonji@amex.com.bh',        status: 'Active',   country: 'Bahrain' },
    ],
    actions: [
      { label: 'Reset Password', action: 'reset-password', variant: 'primary' },
      { label: 'Edit',           action: 'edit',           variant: 'primary' },
      { label: 'Delete',         action: 'delete',         variant: 'danger' },
    ],
  },
};

// BCRB — View + Download
export const BCRBReportActions: Story = {
  name: 'BCRB — View / Download',
  args: {
    sectionTitle: 'BCRB Report List',
    showTopBar: true,
    showExport: true,
    showPrint: true,
    columns: [
      { key: 'reportType', label: 'Report Type' },
      { key: 'date',       label: 'Requested Date' },
      { key: 'status',     label: 'Status' },
      { key: 'fileName',   label: 'File Name', isLink: true },
    ],
    rows: [
      { reportType: 'Settlement Report',   date: '01/10/2024', status: 'Completed',  fileName: 'settlement_oct.csv' },
      { reportType: 'Rejection Report',    date: '02/10/2024', status: 'Processing', fileName: '' },
      { reportType: 'Consolidated Report', date: '03/10/2024', status: 'Failed',     fileName: '' },
    ],
    actions: [
      { label: 'View',     action: 'view',     variant: 'primary' },
      { label: 'Download', action: 'download', variant: 'primary' },
    ],
  },
};

// Empty state
export const EmptyState: Story = {
  name: 'Empty — No Data Found',
  args: {
    sectionTitle: 'Records',
    showTopBar: true,
    showPdf: true,
    showPrint: true,
    showExport: true,
    showBack: true,
    columns: [
      { key: 'col1', label: 'Column 1' },
      { key: 'col2', label: 'Column 2' },
      { key: 'col3', label: 'Column 3' },
    ],
    rows: [],
    actions: [
      { label: 'Modify', action: 'modify', variant: 'primary' },
      { label: 'Delete', action: 'delete', variant: 'danger' },
    ],
  },
};
