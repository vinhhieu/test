<script setup>
  import { ref } from 'vue';

  const isMobile = () => screen.width <= 768;
  const isPlaced = ref(false);

  const minAmount = 10;
  const maxAmount = 3000;

  const minDefuse = 1.01;
  const maxDefuse = 100;

  const amountTotal = ref(minAmount);
  const defuseTotal = ref(minDefuse);
  const defuseAmount = ref(minDefuse);
  const setAmount = (amount) => {
    const number = parseInt(amount);
    if (number <= minAmount) {
      amountTotal.value = minAmount;
    } else if (number >= maxAmount) {
      amountTotal.value = maxAmount;
    } else {
      amountTotal.value = number;
    }
  };
  const handleChangeAmount = () => {
    setAmount(amountTotal.value);
  };
  const setDefuse = (amount) => {
    const number = parseFloat(amount.toFixed(2));
    if (number <= minDefuse) {
      defuseTotal.value = minDefuse;
    } else if (number >= maxDefuse) {
      defuseTotal.value = maxDefuse;
    } else {
      defuseTotal.value = number;
    }
    defuseAmount.value = defuseTotal.value.toFixed(2);
  };
  const handleChangeDefuse = () => {
    setDefuse(defuseAmount.value);
  };
  const stepOne = 0.1;
  const stepTwo = 1;
  const getStep = () => {
    return defuseTotal.value >= 2 ? stepTwo : stepOne;
  };
  const chips = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
    { value: 500, label: '500' },
    { value: 1000, label: '1K' },
  ];

  const defuseRate = [
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2.0x' },
    { value: 5, label: '5.0x' },
  ];
  const handleBet = () => {
    isPlaced.value = true;
  };
</script>

<template>
  <div
    class="container"
    :class="{ 'is-mobile': isMobile(), 'is-placed': isPlaced }"
  >
    <div class="section amount-section">
      <div class="increase-content">
        <div class="column">
          <span class="button" @click="setAmount(minAmount)">MIN</span>
          <span class="button" @click="setAmount(maxAmount)">MAX</span>
        </div>
        <div class="amount-input-block">
          <span class="mr-15">¥</span>
          <input
            type="number"
            v-model="amountTotal"
            :min="minAmount"
            :max="maxAmount"
            v-on:change="handleChangeAmount"
          />
        </div>
        <div class="column">
          <span
            class="button"
            :class="{ disabled: amountTotal / 2 < minAmount }"
            @click="setAmount(amountTotal / 2)"
            >1/2</span
          >
          <span
            class="button"
            :class="{ disabled: amountTotal * 2 > maxAmount }"
            @click="setAmount(amountTotal * 2)"
            >2X</span
          >
        </div>
      </div>
      <div class="fixed-amount">
        <span
          class="button"
          :class="{ disabled: chip.value + amountTotal > maxAmount }"
          v-bind:key="chip"
          v-for="chip in chips.filter(
            (item) => item.value < 1000 || (isMobile() && item.value === 1000)
          )"
          :value="chip.value"
          @click="setAmount(chip.value + amountTotal)"
        >
          +{{ chip.label }}
        </span>
      </div>
    </div>
    <div class="section defuse-section">
      <div class="increase-content">
        <div class="title">Defuse at</div>
        <div class="defuse-input-block">
          <span
            class="button"
            :class="{ disabled: defuseTotal - stepOne < minDefuse }"
            @click="setDefuse(defuseTotal - stepOne)"
            >-</span
          >
          <input
            type="number"
            v-model="defuseAmount"
            :min="minDefuse"
            :max="maxDefuse"
            v-on:change="handleChangeDefuse"
          />
          <span
            class="button"
            :class="{
              disabled: defuseTotal + getStep() > maxDefuse,
            }"
            @click="setDefuse(defuseTotal + getStep())"
            >+</span
          >
        </div>
      </div>
      <div class="fixed-amount" v-if="!isMobile()">
        <span
          class="button"
          v-bind:key="rate"
          v-for="rate in defuseRate"
          @click="setDefuse(rate.value)"
        >
          {{ rate.label }}
        </span>
      </div>
    </div>

    <span class="button bet-button" @click="handleBet">
      {{ !isPlaced ? 'BET' : 'BET PLACED' }}
    </span>
  </div>
</template>

<style scoped>
  .container {
    justify-content: center;
    width: 920px;
    color: #ffffff;
    display: flex;
  }
  .section {
    border: 1px solid #2b374e;
    border-radius: 8px;
    margin-right: 10px;
  }

  .amount-section {
    width: 400px;
  }

  .defuse-section {
    width: 240px;
  }

  .increase-content {
    margin-top: 15px;
    margin-bottom: 10px;
    padding: 0 15px 10px;
    border-bottom: 1px solid #2b374e;
    height: 125px;
  }

  .increase-content .title {
    display: flex;
    justify-content: center;
    margin: 15px;
    font-size: 20px;
    text-transform: uppercase;
  }

  .amount-section .increase-content {
    display: flex;
    justify-content: space-between;
  }

  .amount-input-block {
    width: 100%;
    margin: 15px;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .amount-input-block input {
    border: none;
    font-size: 20px;
  }

  .amount-input-block input:focus,
  .defuse-input-block input:focus {
    outline: none;
  }

  .defuse-input-block {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .defuse-input-block input {
    border: none;
    font-size: 20px;
    width: 100px;
    margin-left: 15px;
  }

  .defuse-input-block .button {
    margin: 0;
  }

  input {
    background: transparent;
    color: #ffffff;
    border: none;
    font-size: 20px;
  }

  input::-webkit-inner-spin-button {
    display: none;
  }

  .column {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .button {
    border: 1px solid #21354d;
    border-radius: 5px;
    color: #c4daf4;
    background-color: #21354d;
    cursor: pointer;
    padding: 12px 18px;
    margin-top: 5px;
    user-select: none;
  }

  .button.disabled,
  .is-placed .button {
    background: #1a2234 !important;
    color: #2a3d5d !important;
    pointer-events: none;
  }

  .button:hover {
    background-image: linear-gradient(to right, #1b9cee, #1deaf2);
    color: #ffffff;
  }

  .fixed-amount {
    display: flex;
    justify-content: space-between;
    margin: 15px;
  }

  .fixed-amount .button {
    color: #52e5f9;
  }

  .fixed-amount .button:hover {
    color: #ffffff;
  }

  .bet-button {
    margin: 0;
    background-image: linear-gradient(to right, #1b9cee, #1deaf2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    width: 240px;
  }
  .is-placed input {
    pointer-events: none;
  }

  .is-placed .bet-button {
    color: #ffffff !important;
  }

  .mr-15 {
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    .container {
      width: 100%;
      flex-direction: column;
    }

    .section {
      width: 100%;
      margin-bottom: 20px;
    }
    .amount-input-block {
      width: auto;
      margin: 10px;
    }
    .amount-input-block input {
      width: 100%;
    }
    .bet-button {
      width: 100%;
      padding: 30px 0;
    }
    .defuse-section .increase-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: none;
    }

    .defuse-section .increase-content .title {
      margin: 0;
    }

    .defuse-input-block {
      width: auto;
    }
    .defuse-input-block input {
      width: 60px;
    }

    .fixed-amount {
      flex-wrap: wrap;
    }
  }
</style>
