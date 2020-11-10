<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text> Status: {{ status }} </v-card-text>
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

const counter = gql`
  subscription {
    counter
  }
`;

const status = gql`
  subscription {
    status
  }
`;

export default {
  name: "Home",
  data: () => ({
    counter: null,
    status: null
  }),
  apollo: {
    $subscribe: {
      counter: {
        query: counter,
        result({ data }) {
          this.counter = data.counter;
        }
      },
      status: {
        query: status,
        result({ data }) {
          this.status = data.status;
        }
      }
    }
  }
};
</script>
