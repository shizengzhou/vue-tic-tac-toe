(function () {
  Vue.component('game-square', {
    props: ['value'],
    template: `
      <button class="square" v-on:click="$emit('click')">{{ value }}</button>
    `
  });

  Vue.component('game-board', {
    props: ['squares'],
    template: `
      <div>
        <div class="game-board">
          <div class="row">
            <game-square v-bind:value="squares[0]"
              v-on:click="$emit('click', 0)"
            >
            </game-square>
            <game-square v-bind:value="squares[1]"
              v-on:click="$emit('click', 1)"
            >
            </game-square>
            <game-square v-bind:value="squares[2]"
              v-on:click="$emit('click', 2)"
            >
            </game-square>
          </div>
          <div class="row">
            <game-square v-bind:value="squares[3]"
              v-on:click="$emit('click', 3)">
            </game-square>
            <game-square v-bind:value="squares[4]"
              v-on:click="$emit('click', 4)"
            >
            </game-square>
            <game-square v-bind:value="squares[5]"
              v-on:click="$emit('click', 5)"
            >
            </game-square>
          </div>
          <div class="row">
            <game-square v-bind:value="squares[6]"
              v-on:click="$emit('click', 6)"
            >
            </game-square>
            <game-square v-bind:value="squares[7]"
              v-on:click="$emit('click', 7)"
            >
            </game-square>
            <game-square v-bind:value="squares[8]"
              v-on:click="$emit('click', 8)"
            >
            </game-square>
          </div>
        </div>
      </div>
    `
  });

  Vue.component('game', {
    data: function () {
      return {
        history: [{
          squares: Array(9).fill(null)
        }],
        xIsNext: true,
        stepNumber: 0
      }
    },
    computed: {
      current: function () {
        return this.history[this.stepNumber];
      },
      status: function () {
        const squares = this.current.squares.slice();
        const winner = calculateWinner(squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        }
        return status;
      },
      steps: function () {
        const steps = this.history.map((step, move) => {
          const desc = move ? 'Move #' + move : 'Game start';
          return { desc, step: move };
        });
        return steps;
      }
    },
    methods: {
      onClick: function (i) {
        const squares = this.current.squares.slice();
        const winner = calculateWinner(squares);
        if (squares[i] || winner) {
          return;
        }

        squares[i] = this.xIsNext ? 'X' : 'O';
        this.history = this.history.concat([{ squares }]);
        this.xIsNext = !this.xIsNext;
        this.stepNumber++;
      },
      jumpTo: function (step) {
        this.stepNumber = step;
        this.xIsNext = (step % 2) === 0;
      }
    },
    template: `
      <div class="game">
        <game-board v-bind:squares="current.squares"
          v-on:click="onClick"
        >
        </game-board>
        <div class="game-info">
          <p>{{ status }}</p>
          <ol>
            <li v-for="step in steps" v-bind:key="step.step">
              <button v-on:click="jumpTo(step.step)">
                {{ step.desc }}
              </button>
            </li>
          </ol>
        </div>
      </div>
    `
  })

  new Vue({
    el: '#root'
  });

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] &&
        squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}());