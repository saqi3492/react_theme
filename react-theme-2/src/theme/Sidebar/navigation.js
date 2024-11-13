import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const navigations = [
  { name: 'Sessions', path: '/sessions', icon: DescriptionIcon },
  { name: 'Note Templates', path: '/templates', icon: FormatListBulletedIcon },
  { name: 'Plan & Billing', path: '/billings', icon: ReceiptLongIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon }
];

export default navigations;
