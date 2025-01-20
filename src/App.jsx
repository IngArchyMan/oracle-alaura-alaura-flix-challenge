import AppRoutes from './router/Router';
import "./Styles/App.css"
const App = () => {
  document.querySelector("body").classList.add("tg-th--dark");
  return (
    <AppRoutes/>
  );
};

export default App