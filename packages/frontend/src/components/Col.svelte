<script lang="ts">
    export let xs = 12;
    export let sm = 12;
    export let md = 12;
    export let lg = 12;

    const props = { xs, sm, md, lg };

    let className = "";

    for(const key in props) {
        className += ` col-${key}-${props[key]}`;
    }
</script>

<div class={className}>
    <slot/>
</div>