<button on:click>
    <slot name="icon"></slot>
    <slot></slot>
</button>

<style>
button {
    display: inline-flex;
    align-items: center;
    background-color: var(--color-2);
    color: var(--color-bg);
    appearance: none;
    border: none;
    padding: 10px 24px;
}
</style>