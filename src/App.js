import { useState, useRef } from "react";
import styles from "./App.module.css";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const useStore = () => {
  const [state, setState] = useState(initialState);

  return {
    getState: () => state,
    updateState: (fieldName, newValue) => {
      setState({ ...state, [fieldName]: newValue });
    },
    resetState: () => {
      setState(initialState);
    },
  };
};

const sendData = (formData) => {
  console.log(formData);
};

const App = () => {
  const submitButtonRef = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const { getState, updateState, resetState } = useStore();

  const onSubmit = (event) => {
    event.preventDefault();
    sendData(getState());
  };

  const { email, password, confirmPassword } = getState();

  let error = null;

  const onBlurEmail = ({ target }) => {
    submitButtonRef.current.focus();
    if (target.value.indexOf("@") === -1) {
      error = "Введите email. Пример: user@email.com";
    }
    setEmailError(error);
    if (emailError === null && passwordError === null) {
      submitButtonRef.current.focus();
    }
  };

  const onBlurPassword = ({ target }) => {
    if (getState().confirmPassword !== "") {
      if (target.value !== getState().confirmPassword) {
        error = "Пароли не совпадают";
      }
      setPasswordError(error);
      if (emailError === null && passwordError === null) {
        submitButtonRef.current.focus();
      }
    }
  };

  const onBlurConfirmPassword = ({ target }) => {
    if (target.value !== getState().password) {
      error = "Пароли не совпадают";
    }
    setPasswordError(error);
    if (emailError === null && passwordError === null) {
      submitButtonRef.current.focus();
    }
  };

  const onChange = ({ target }) => {
    updateState(target.name, target.value);
  };

  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      {emailError && <div className={styles.Error}>{emailError}</div>}
      {passwordError && <div className={styles.Error}>{passwordError}</div>}
      <input
        className={styles.input}
        type="text" // сделал тип текст для того чтобы запустить свою проверкеу на валидацию
        name="email"
        value={email}
        placeholder="Почта"
        onChange={onChange}
        onBlur={onBlurEmail}
      />
      <input
        className={styles.input}
        type="password"
        name="password"
        value={password}
        placeholder="Пароль"
        onChange={onChange}
        onBlur={onBlurPassword}
      />
      <input
        className={styles.input}
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        placeholder="Повтор пароля"
        onChange={onChange}
        onBlur={onBlurConfirmPassword}
      />
      <button
        ref={submitButtonRef}
        className={styles.button}
        type="submit"
        disabled={emailError !== null || passwordError !== null}
      >
        Зарегистрироваться
      </button>
      <button className={styles.button} type="button" onClick={resetState}>
        Очитстить
      </button>
    </form>
  );
};

export default App;
