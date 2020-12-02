<template>
  <div class="btn">
    <span>
      {{ lbl }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Btn",
  props: {
    lbl: String,
  },
};
</script>

<style lang="scss" scoped>
$button-bg: hsl(240, 6%, 50%);
$button-bg--dark: #282834;
$button-bg--danger: hsl(350, 42%, 52%);

$sc--dark: rgba(0, 0, 0, 0.2);

.btn {
  background-color: $button-bg;
  box-shadow: 0 2px 3px $sc--dark, 0 2px 2px $sc--dark;
  border: 1px solid hsla(0, 0%, 100%, 0.08);
  border-radius: 3px;
  cursor: pointer;
  display: grid;
  font-size: 1.23rem;
  height: 1.5em;
  place-content: center;
  width: 4.25ch;
}

.btn:active {
  box-shadow: 0 1px 3px $sc--dark, 0 1px 2px $sc--dark;
}

.btn.danger {
  background-color: $button-bg--danger;
}

.btn.zoom > span {
  font-size: 1.25em;
}

.btn.zoom-out > span {
  font-size: 0.85em;
}
</style>
