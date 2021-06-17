<template>
  <div>
    <the-header />

    <main>
      <div class="wrapper">
        <h2>Calcuate Your Monthly Spending</h2>
        <p class="intro-paragraph">
          <img
            class="intro-image"
            src="../images/budget.svg"
            width="400"
            alt="Budget Image"
          />
          The Budget Predictor allows you to enter your monthly transactions and
          see how much money you have at the end of each month.
        </p>

        <h2>How It Works</h2>
        <p>
          As you add or delete transactions your budget prediction will change
          automatically. You can have transactions that occur daily, weekly,
          biweekly, or monthly. For example you could have a monthly mortgage
          expense or a daily coffee expense.
        </p>
        <router-link class="get-started-link" to="/budget"
          >Get Started</router-link
        >

        <h2>About This Website</h2>
        <p>
          If you are interested in learning more about how this application was
          created, you can view the source at
          <a href="https://github.com/tyler-daigle/budget-predictor">Github</a>.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import TheHeader from "../components/UI/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style scoped>
.wrapper {
  width: 40%;
  margin: 0 auto;
}

h2 {
  border-bottom: solid 1px black;
}

p {
  font-size: 1.2rem;
  line-height: 2.5rem;
}

.intro-paragraph {
  display: flex;
}

.intro-image {
  margin-right: 1rem;
  display: inline-block;
}
a,
a:visited {
  color: var(--dark-color);
  text-decoration: none;
}

.get-started-link,
.get-started-link:visited {
  margin: 1rem 0;
  display: inline-block;
  text-align: center;
  font-family: inherit;
  font-size: 1.25rem;
  background-color: #285675;
  color: white;
  border: solid 1px #4040b8;
  padding: 0.5rem 0.5rem;
  text-decoration: none;
  text-align: center;
}
.get-started-link:hover {
  background-color: var(--dark-color);
}

@media (max-width: 700px) {
  .intro-paragraph {
    flex-direction: column;
    align-items: center;
  }
}
</style>