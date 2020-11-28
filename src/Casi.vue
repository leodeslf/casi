<template>
  <main id="casi">
    <h1><span>CASI</span><em>fx-leodeslf</em></h1>
    <div id="display">
      <p id="input-feedback">
        {{ inputFeedback }}
      </p>
      <p id="output">
        <span id="answer">{{ answer }}</span>
      </p>
    </div>
    <div id="buttons-box">
      <div id="number-box">
        <Btn
          v-for="(digit, index) of digits"
          :id="digit"
          :lbl="`${index}`"
          @click="() => this.digit(index)"
          :key="index"
        />
        <Btn
          id="neg"
          class="zoom-out"
          lbl="(−)"
          @click="negation = !negation"
        />
        <Btn id="point" class="zoom" lbl="." @click="digit('.')" />
      </div>
      <div id="operator-box">
        <Btn id="del" class="danger" lbl="DEL" @click="this.del" />
        <Btn id="c" class="danger" lbl="C" @click="this.clear" />
        <Btn id="add" class="zoom" lbl="+" @click="op(this.add, '+')" />
        <Btn id="sub" class="zoom" lbl="−" @click="op(this.sub, '−')" />
        <Btn id="mult" class="zoom" lbl="×" @click="op(this.mult, '×')" />
        <Btn id="div" class="zoom" lbl="÷" @click="op(this.div, '÷')" />
        <Btn
          id="rnd"
          lbl="RND"
          @click="
            (input) => {
              this.input = Math.random().toFixed(2);
              this.waitingForInput = false;
            }
          "
        />
        <Btn id="eq" class="zoom" lbl="=" @click="op(false, '=')" />
      </div>
    </div>
  </main>
</template>

<script>
import Btn from "./components/Btn";

export default {
  name: "Casi",
  components: {
    Btn,
  },
  data() {
    return {
      answer: 0,
      input: "0",
      memory: false,
      negation: false,
      queue: false,
      waitingForInput: false,
      symbol: "",
      digits: [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ],
    };
  },
  methods: {
    digit(value) {
      this.waitingForInput = false;

      // Equalized.
      if (this.memory && !this.queue) this.clear();

      // Avoid repeating the period.
      if (value === "." && this.input.includes(".")) return;

      // If current input is "0", just equalize input to value,
      // and take numberic value to avoid adding multiple zeros.
      if (this.input === "0") {
        this.input = (Number(this.input) + value).toString();
        // Else limit length of input to 10 digits for the integer
        // part, the dot and 10 more to the fractional part.
      } else {
        const len = this.input.length;
        if (len < 10 || (len === 10 && value === ".")) {
          this.input += value + "";
        } else if (this.input.includes(".")) {
          const i = this.input.indexOf(".");
          if (len < i + 11) {
            this.input += value + "";
          }
        }
      }
    },
    del() {
      if (this.waitingForInput) this.clear();

      // Between -1 and -9: delete both characters,
      // the number and the minus.
      if (
        this.input.length === 1 ||
        (Number(this.input) < 0 && Number(this.input) > -10)
      ) {
        this.input = "0";
        return;
      }

      this.input = this.input.slice(0, this.input.length - 1);
    },
    clear() {
      this.answer = 0;
      this.input = "0";
      this.memory = false;
      this.negation = false;
      this.queue = false;
      this.waitingForInput = false;
      this.symbol = "";
    },
    op(operation, symbol) {
      // Ready to operate.
      if (this.memory && this.queue && !this.waitingForInput) {
        this.memory += this.symbol;
        this.memory += this.getInput().text;
        this.queue();
      }

      // First time or equalized.
      if (!this.queue) {
        this.memory = this.getInput().text;
        this.answer = this.getInput().number;
      }

      // Update status.
      this.input = operation ? "0" : this.answer + "";
      this.waitingForInput = true;
      this.negation = false;
      this.queue = operation;
      this.symbol = symbol;
    },
    add() {
      this.answer += this.getInput().number;
    },
    sub() {
      this.answer -= this.getInput().number;
    },
    mult() {
      this.answer *= this.getInput().number;
    },
    div() {
      this.answer /= this.getInput().number;
    },
    getInput() {
      let num = Number(this.input);
      if (this.negation) num = -num;

      return {
        number: num,
        text: num < 0 ? `(${num})` : `${num}`,
      };
    },
  },
  computed: {
    inputFeedback() {
      let body =
        (this.memory || "") +
        this.symbol +
        (this.negation && this.input >= 0 ? "(-" : "") +
        (this.negation && this.input < 0 ? -this.input : this.input) +
        (this.negation && this.input >= 0 ? ")" : "");
      const x = 34;
      return body.length > x ? body.slice(body.length - x, body.length) : body;
    },
  },
  mounted() {
    window.addEventListener("keypress", (e) => {
      const key = e.key;

      if (Number(key) >= 0) {
        const value = Number(key);
        this.digit(value);
        return;
      }

      switch (key) {
        case ".":
          this.digit(".");
          break;
        case "+":
          this.op(this.add, "+");
          break;
        case "-":
          this.op(this.sub, "−");
          break;
        case "*":
          this.op(this.mult, "×");
          break;
        case "/":
          this.op(this.div, "÷");
          break;
        case "Enter":
          this.op(false, "=");
          break;
      }
    });

    window.addEventListener("keydown", () => {
      window.onkeyup = (e) => {
        const key = e.key;
        switch (key) {
          case "Backspace":
            this.del();
            break;
          case "Delete":
            this.clear();
            break;
        }
      };
    });
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "DSEG7 Classic Italic";
  src: url("./assets/DSEG7Classic-Italic.ttf");
}

/* @font-face {
  font-family: "Print Char 21";
  src: url("./assets/PrintChar21.ttf");
} */

$bg: #505068;
$bg--ascent: #181821;

$display-bg: #b2ac7a;
$display-bg--alt: #d5e3e4;

$button-bg: #9797a3;

$color: #ffffff;
$color--display: #272415;

$sc--dark: rgba(0, 0, 0, 0.3);
$sc--light: rgba(255, 255, 255, 0.3);

@keyframes turn-on {
  from {
    color: transparent;
  }
}

#casi {
  background-color: $bg;
  box-shadow: 0 1px 3px $sc--dark, 0 1px 2px $sc--dark,
    0 2px 1px -1px $sc--light inset, 0 -2px 1px -1px $sc--dark inset;
  padding: 1rem;
  border-radius: 9px;
  width: fit-content;
  & > * {
    margin-bottom: 1rem;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
}

h1 {
  color: $button-bg;
  display: flex;
  justify-content: space-between;
  & > em {
    font-family: serif;
    padding-right: 0.35em;
  }
}

#display {
  animation: turn-on 1s 1 ease-out;
  background-color: $display-bg;
  border-radius: 3px;
  box-shadow: 0 2px 2px 1px $sc--dark inset, 0 0 2px 1px $sc--dark inset,
    0 -1px 1px $sc--dark, 0 -1px 2px $sc--dark, 0 1px 1px $sc--light,
    0 1px 2px $sc--light;
  color: $color--display;
  display: grid;
  justify-items: right;
  grid-gap: 0.5rem;
  padding: 0.8rem 0.8rem 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

#input-feedback {
  font-family: /* "Print Char 21", "IBM Plex Mono", */ monospace;
  text-align: right;
  width: 34ch;
}

#output {
  font-family: "DSEG7 Classic Italic";
  font-size: 15px;
  text-align: right;
  width: 25ch;
}

#buttons-box {
  display: flex;
  justify-content: space-between;
}

#number-box {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-areas:
    "seven eight nine"
    "four five six"
    "one two three"
    "neg zero point";
}

#operator-box {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-areas:
    "del c"
    "mult div"
    "add sub"
    "rnd eq";
}

$buttons: zero, one, two, three, four, five, six, seven, eight, nine, rnd, point,
  del, c, add, sub, mult, div, eq;

@each $button in $buttons {
  ##{$button} {
    grid-area: $button;
  }
}

#point {
  padding-bottom: 3px;
}
</style>
