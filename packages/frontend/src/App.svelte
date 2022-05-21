<h1>
    Hello World!
    <span></span>
</h1>
<span>Outside</span>

<style lang="scss">
    $c: red;

    h1 {
        color: $c;

        span::before {
            content: "Nesting!";
        }
    }
</style>