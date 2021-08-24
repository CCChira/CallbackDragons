import styles from '../styles/Home.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {decrementCount, incrementCount, resetCount} from '../store/actions';
import {useUser} from "@auth0/nextjs-auth0";
import Link from 'next/link';

export default function Home() {
    const {user, error, isLoading} = useUser();
    const count = useSelector((state) => state.counter);
    const dispatch = useDispatch();
    console.log(user);

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>{error.message}</div>

    return (
        <div className={styles.container}>
            <div>
                <h1>
                    Count: <span>{count}</span>
                </h1>
                <button onClick={() => dispatch(incrementCount())}>+1</button>
                <button onClick={() => dispatch(decrementCount())}>-1</button>
                <button onClick={() => dispatch(resetCount())}>Reset</button>
            </div>
            <Link href="/otherPage">
                <a>Other Page</a>
            </Link>
        </div>
    )
}


