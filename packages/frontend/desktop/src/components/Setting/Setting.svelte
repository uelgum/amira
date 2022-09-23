<script lang="ts">
    import Switch from "@components/Switch";
    import SmallTitle from "@components/SmallTitle";
    import SmallDescription from "@components/SmallDescription";

    export let checked: boolean;
</script>

<div class="setting">
    <div class="setting-meta">
        <SmallTitle>
            <slot name="title"/>
        </SmallTitle>
        <SmallDescription>
            <slot name="description"/>
        </SmallDescription>
    </div>
    <div class="setting-switch">
        <Switch
            checked={checked}
            on:change
        />
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .setting {
        display: flex;
        width: 100%;
        user-select: none;
        justify-content: space-between;
    }

    .setting-meta {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        max-width: 85%;
    }

    .setting-switch {
        display: flex;
    }
</style>