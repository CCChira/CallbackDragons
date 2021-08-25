import styles from '../styles/Home.module.css';
import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {useUser} from "@auth0/nextjs-auth0";
import {Typography, Button, makeStyles, Paper} from "@material-ui/core";

import UserDataDisplay from "../Components/UserDataDisplayComponent";
import SearchBarComponent from "../Components/SearchbarComponent";
import {setLogin} from "../store/actions";

const useStyles = makeStyles({
    text: {
        margin: "2rem",
    },
    login: {
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    a: {
        textDecoration: "none",
        color: "black",
        fontWeight: "800",
    },
    searchBar: {
        width: '40%',
        height: '5vh'
    }
})

export default function Home() {
    const classes = useStyles();
    const {user, error, isLoading} = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLogin(user?.nickname))
    }, [user, dispatch])

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div className={styles.container}>
            {user ?
                <div>
                    <UserDataDisplay/>
                </div>
                :
                <div className={classes.login}>
                    <Paper style={{backgroundColor:'#8dd6ff'}} elevation={3} className={classes.searchBar}>
                        <SearchBarComponent style={{width:'100%', height:'100%', align: 'center'}}/>
                    </Paper>

                    <Typography variant="h5" className={classes.text}>To see your Github content please
                        LOGIN.</Typography>
                    <Button variant="contained" color="primary" className={classes.btn}>
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <a className={classes.a} href="/api/auth/login">Login</a>
                    </Button>
                </div>
            }
        </div>
    )
}


