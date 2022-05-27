<script>
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Home from "./pages/Home.svelte";

  import Router from "svelte-spa-router";
  import {onMount, setContext} from "svelte";

  import {AuthService} from "./services/AuthService.ts";
  import {PoiService} from "./services/PoiService.ts";
  import Admin from "./pages/Admin.svelte";
  import PoiDetails from "./pages/PoiDetails.svelte";
  import PoiEdit from "./pages/PoiEdit.svelte";
  import {UserService} from "./services/UserService.ts";
  import {currentUser} from "./data/UserStore.ts";
  import PoiMap from "./pages/PoiMap.svelte";

  let routes = {
    "/": Home,
    "/login": Login,
    "/signup": Signup,
    "/pois": Home,
    "/admin": Admin,
    "/pois/:id": PoiDetails,
    "/pois/:id/edit": PoiEdit,
    "/map": PoiMap,
  }
  let authService = new AuthService('http://localhost:3001');
  setContext("AuthService", authService);
  setContext("PoiService", new PoiService('http://localhost:3001'));
  setContext("UserService", new UserService('http://localhost:3001'));

  onMount(async () => {
    const isAdmin = await authService.isAdmin()
    currentUser.update(it => {
      return {...it, isAdmin};
    })
  })

</script>

<div>
  <Router {routes}/>
</div>
