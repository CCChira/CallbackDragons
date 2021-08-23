import {Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '20vw',
    marginTop: '0.5rem',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})

export default function SearchItem({result}) {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardContent className={classes.root}>
          <Typography className={classes.text}>{result.login}</Typography>
        </CardContent>
      </Card>
  )
}
