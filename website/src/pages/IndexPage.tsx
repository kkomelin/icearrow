import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import CreateSecret from '../createSecret/CreateSecret';
import Upload from '../createSecret/Upload';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function IndexPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h2"
        color="primary"
        component="div"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}
      >
        Encode your secret and share it with a secure one-time link
      </Typography>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Text" {...a11yProps(0)} />
          <Tab label="File" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateSecret />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Upload />
      </CustomTabPanel>
    </Box>
  );
}
