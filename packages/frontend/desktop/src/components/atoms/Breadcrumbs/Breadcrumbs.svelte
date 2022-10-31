<script lang="ts">
    /**
        Pfade für die Breadcrumbs.
    */
    export let paths: string[];

    const lastPath = (paths.length > 1) ? paths.pop() : null;
</script>

<div class="breadcrumbs">
    {#each paths as path}
        <span class="breadcrumbs__path">{path}</span>
    {/each}
    {#if lastPath}
        <span class="breadcrumbs__last-path">{lastPath}</span>
    {/if}
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .breadcrumbs {
        display: flex;
        color: $white-lightest;
        font-size: 0.85em;
        gap: 0.5em;
        user-select: none;
    }

    .breadcrumbs__path {
        position: relative;

        &:not(:last-child) {
            margin-right: 0.5em;
        }

        &:not(:last-child)::after {
            content: "/";
            position: absolute;
            left: calc(100% + 0.25em);
        }
    }

    .breadcrumbs__last-path {
        color: lighten($blue, 5);
        font-weight: 600;
    }
</style>