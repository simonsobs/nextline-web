<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-actions>
              <v-btn color="primary" @click="run()">Run</v-btn>
              <v-btn color="primary" @click="reset()">Reset</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text><pre>{{ state }}</pre></v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card>
            <v-card-text> Counter: {{ counter }} </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";

const subsc_counter = gql`
  subscription {
    counter
  }
`;

const subsc_state = gql`
  subscription {
    state {
      state
      nthreads
      threads {
        threadId
      }
    }
  }
`;

const mutat_exec = gql`
  mutation {
    exec
  }
`;

const mutat_reset = gql`
  mutation {
    reset
  }
`;

export default {
  name: "Home",
  data: () => ({
    counter: null,
    state: null
  }),
  apollo: {
    $subscribe: {
      counter: {
        query: subsc_counter,
        result({ data }) {
          this.counter = data.counter;
        }
      },
      state: {
        query: subsc_state,
        result({ data }) {
          console.log(data.state)
          this.state = data.state;
        }
      }
    }
  },
  methods: {
    async run() {
      console.log("run");
      const data = await this.$apollo.mutate({
        mutation: mutat_exec
      });
    },
    async reset() {
      console.log("reset");
      const data = await this.$apollo.mutate({
        mutation: mutat_reset
      });
    }
  }
};
</script>
