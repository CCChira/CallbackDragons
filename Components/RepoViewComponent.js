import { Card, makeStyles, Typography } from "@material-ui/core"
import {DescriptionTwoTone, FolderOpenTwoTone} from '@material-ui/icons'
const useStyles = makeStyles({
  fileCard: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
    width: '80vw',
    height: '5vh',
  }
})
function RepoViewComponent({fileName, fileType}) {
  const classes = useStyles();
  return (
    <div>
        <div className = {classes.fileCard}>
          {(fileType === "blob") ? <DescriptionTwoTone color ="primary"/> : <FolderOpenTwoTone color = "primary"/>}
          <Typography variant = "h5">
            {fileName}
          </Typography>
        </div>
    </div>
  )
}

export default RepoViewComponent
