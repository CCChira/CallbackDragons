import { makeStyles, Typography } from '@material-ui/core';
import { DescriptionTwoTone, FolderOpenTwoTone } from '@material-ui/icons';
const useStyles = makeStyles({
  fileCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '5vh',
  },
});
function RepoViewComponent({ fileName, fileType }) {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.fileCard}>
        {fileType === 'blob' ? (
          <DescriptionTwoTone color='primary' />
        ) : (
          <FolderOpenTwoTone color='primary' />
        )}
        <Typography variant='h6'>{fileName}</Typography>
      </div>
    </div>
  );
}
export default RepoViewComponent;
