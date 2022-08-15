<script lang="ts">
    export let xs = 12;
    export let sm = 12;
    export let md = 12;
    export let lg = 12;

    const props = {
        xs, sm, md, lg
    };

    const className = Object
        .entries(props)
        .map(([ name, size ]) => `col-${name}-${size}`)
        .join(" ");
</script>

<div class={className}>
    <slot/>
</div>