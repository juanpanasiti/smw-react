import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export * from './IconAnimated';

export type MuiIcon = OverridableComponent<SvgIconTypeMap> & { muiName: string };
