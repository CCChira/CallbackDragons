import { useDispatch, useSelector } from 'react-redux';
import { decrementCount, incrementCount, resetCount } from '../store/actions';
import NavbarComponent from '../Components/NavbarComponent';
import styles from '../styles/Home.module.css';
export default function OtherPage() {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.container}>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={() => dispatch(incrementCount())}>+1</button>
        <button onClick={() => dispatch(decrementCount())}>-1</button>
        <button onClick={() => dispatch(resetCount())}>Reset</button>
      </div>
    </>
  );
}
