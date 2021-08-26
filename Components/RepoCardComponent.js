import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    makeStyles,
    Typography,
} from '@material-ui/core';
import Link from 'next/link';
import theme from '../src/theme';
import {Octokit} from "@octokit/core";

const useStyle = makeStyles({
    buttonCont: {
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        color: 'black',
        alignSelf: 'flex-end'
    },
});

const colors = {};

const calcPercentages = (languages) => {
    let sum = 0;

    for (let lang in languages) {
        sum += languages[lang];
    }

    const percentage = {};

    let i = 0, actSum = 0;
    for (let lang in languages) {
        if (i === 2) break;
        if (!colors[lang]) {
            colors[lang] = Math.floor(Math.random() * 16777215).toString(16);
        }
        percentage[lang] = languages[lang] * 100 / sum;
        actSum += languages[lang];
        i++;
    }

    percentage['Others'] = (sum - actSum) * 100 / sum;

    return percentage;
}

const RepoCardComponent = ({repo, userName}) => {
    const classes = useStyle();

    const [percentages, setPercentages] = useState({});

    useEffect(() => {
        (async () => {
            const octokit = new Octokit();
            const languages = (await octokit.request(`GET /repos/${userName}/${repo.name}/languages`)).data;
            const percentage = calcPercentages(languages);
            colors['Others'] = '210904';
            setPercentages({...percentage});
        })()
    }, [repo.name, userName])

    return (
        <Card style={{height: '20rem'}}>
            <CardContent style={{height: '85%', overflow: 'hidden'}}>
                <Typography color='textSecondary' gutterBottom>
                    Name:
                </Typography>
                <Typography variant='h5' component='h2'>
                    {repo.name}
                </Typography>
                <Typography color='textSecondary'>Description:</Typography>
                <Typography variant='body2' component='p'>
                    {repo.description}
                </Typography>
                <Typography color='textSecondary'>Languages:</Typography>
                <Box component='div' style={{marginLeft: '1em'}}>
                    {Object.entries(percentages).map(([key, value]) =>
                        <Typography key={key} variant='body2' component='p'>
                            {key} : {value.toFixed(2)}%
                        </Typography>
                    )}
                </Box>
                <Box component='div' minWidth='90%'>
                    {Object.entries(percentages).map(([key, value]) =>
                        <span key={`span${key}`} style={
                            {
                                width: `${value}%`,
                                display: 'inline-block',
                                backgroundColor: `#${colors[key]}`,
                                height: '6px',
                            }
                        }/>
                    )}
                </Box>
            </CardContent>
            <CardActions style={{height: '15%'}} className={classes.buttonCont}>
                <Link href={`/search/${userName}/${repo.name}`}>
                    <Button className={classes.button} size='small'>
                        Show me the repo
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default RepoCardComponent;
