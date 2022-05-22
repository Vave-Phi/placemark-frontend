<script>
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Home from "./pages/Home.svelte";

  import Router from "svelte-spa-router";
  import {setContext} from "svelte";

  import {AuthService} from "./services/AuthService.js";
  import {PoiService} from "./services/PoiService.js";
  import Admin from "./pages/Admin.svelte";
  import PoiDetails from "./components/PoiDetails.svelte";
  import PoiEdit from "./pages/PoiEdit.svelte";
  import Error from "./components/Error.svelte";

  let routes = {
    "/": Home,
    "/login": Login,
    "/signup": Signup,
    "/pois": Home,
    "/admin": Admin,
    "/logout": Home,
    "/poi/{id}": PoiDetails,
    "/poi/{id}/edit": PoiEdit,
  }
  setContext("AuthService", new AuthService());
  setContext("PoiService", new PoiService());

</script>

<div>
  <Router {routes}/>
  <Error errors={[]}/>
</div>
