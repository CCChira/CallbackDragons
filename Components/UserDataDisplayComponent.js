import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";

import {Octokit} from '@octokit/core';

const useStyles = makeStyles({
    UDDContainer: {
        display:"flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
});

const UserDataDisplay = () => {
    const classes = useStyles();

    useEffect(() => {
        (async () => {
            const octokit = new Octokit();
            const newRepos = (await octokit.request('GET /users/octocat/repos')).data;
            setRepo(newRepos);
        })();
    }, [])

    const [repos, setRepo] = useState([]);

    return (
        <Box component="div" >
            <Box component="div">
                Username:
                Name:
                Followers:
                Following:
            </Box>
            <Grid container spacing={4} columns={{xs: 12, sm: 6, md: 4}}>
                {
                    repos.map((repo) => (
                        <Grid item xs={12} sm={6} md={4} key={repo.id}>
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
                                <CardActions>
                                    <Button size="small">Show me the repo</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default UserDataDisplay;