import React from "react";
import {Button, Card, CardActions, CardContent, makeStyles, Typography} from "@material-ui/core";
import Link from "next/link";
import theme from "../src/theme";

const useStyle = makeStyles( {
    buttonCont: {
        backgroundColor: theme.palette.primary.main,
            display: 'flex',
            justifyContent: 'center',
    },
    button: {
        color: 'white'
    }
})

const RepoCard = ({repo, userName}) => {
    const classes = useStyle();

    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Name:
                </Typography>
                <Typography variant="h5" component="h2">
                    {repo.name}
                </Typography>
                <Typography color="textSecondary">
                    Description:
                </Typography>
                <Typography variant="body2" component="p">
                    {repo.description}
                </Typography>
                <Typography color="textSecondary">
                    Language:
                </Typography>
                <Typography variant="body2" component="p">
                    {repo.language}
                </Typography>
            </CardContent>
            <CardActions className={classes.buttonCont} >
                <Link href={`/search/${userName}/${repo.name}`}>
                    <Button className={classes.button} size="small">Show me the repo</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default RepoCard;