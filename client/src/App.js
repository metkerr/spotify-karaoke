import Login from "./Login";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="box-border bg-slate-900 text-white scroll-smooth overflow-hidden">
      {code ? <Dashboard code={code} /> : <Login />}
    </div>
  );
}

export default App;
