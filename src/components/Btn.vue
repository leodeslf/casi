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
$button-bg: #9797a3;
$button-bg--dark: #282834;
$button-bg--danger: #c76081;

$sc--dark: rgba(0, 0, 0, 0.2);

.btn {
  background-color: $button-bg;
  box-shadow: 0 2px 3px $sc--dark, 0 2px 2px $sc--dark;
  cursor: pointer;
  border: 1px solid hsla(0, 0%, 100%, 0.08);
  border-radius: 3px;
  display: grid;
  font-size: 1.2rem;
  height: 1.5em;
  place-content: center;
  width: 4ch;
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
  font-size: 0.8em;
}
</style>
