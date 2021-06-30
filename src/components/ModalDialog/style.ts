import { makeStyles } from '@material-ui/core';

interface useStylesProps {
  hasBlock: string;
}

const useStyles = ({
  hasBlock,
}: useStylesProps) =>
  makeStyles(theme => ({
    switch: {
      borderRadius: 25,
      padding: '2px',
      background:hasBlock ,
      display: 'flex',
      alignItems: 'center',
      marginRight: 20,
      cursor: 'pointer',
    },
    switchBlock: {
      padding: 4,
      background: '#fff',
      boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, .16)',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 25,
      height: 30,
      order: hasBlock ? 1: 2,
    },
    switchText: {
      paddingRight: 2,
      color: '#585858',
    },
    switchLabel: {
      margin: "0px 8px",
      color: '#585858',
      order: hasBlock ? 2 : 1,
    }
  }));

export default useStyles;
