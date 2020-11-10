<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
            {{ counter }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";

const counter = gql`
  subscription {
    counter
  }
`;

export default {
  name: "Home",
  data: () => ({
    counter: null
  }),
  apollo: {
    $subscribe: {
      counter: {
        query: counter,
        result({ data }) {
          this.counter = data.counter;
        }
      }
    }
  }
};
</script>
