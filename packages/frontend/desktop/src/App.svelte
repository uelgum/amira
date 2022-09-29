<script lang="ts">
    import { onMount } from "svelte";
    import { Router, Route, navigate } from "svelte-routing";
    
    // Intern
    import socket from "@internal/socket";
    import token from "@stores/token";
    import lock from "@stores/lock";
    import config from "@internal/config";

    // Layouts
    import Base from "@layouts/Base";

    // Views
    import Start from "@views/Start";
    import Dashboard from "@views/Dashboard";
    import Connecting from "@views/Connecting";
    import LockScreen from "@views/LockScreen";
    import Login from "@views/Login";
    import Register from "@views/Register";

    /**
        On-Mount.
    */
    onMount(() => {
        if(!socket.connected && $token.raw && config.socket) {
            socket.auth = { token: $token.raw };
            socket.connect();
        }

        if($lock) {
            navigate("/lockscreen");
            return;
        }

        return () => {
            socket.disconnect();
        };
    });
</script>

<Base>
    <Router>
        <Route path="/" component={Start}/>
        <Route path="/connecting" component={Connecting}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/lockscreen" component={LockScreen}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
    </Router>
</Base>