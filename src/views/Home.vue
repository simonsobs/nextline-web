<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card>
            <v-card-actions>
              <v-btn color="primary" :disabled="!(state.state == 'initialized')" @click="run()"
                >Run</v-btn
              >
              <v-btn color="primary" @click="reset()">Reset</v-btn>
            </v-card-actions>
            <v-card-text
              ><pre>{{ state.state }}</pre></v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <template v-if="state.threads">
          <template v-for="th in state.threads">
            <template v-for="ta in th.tasks">
              <v-col
                cols="4"
                v-if="ta.fileName"
                :key="th.threadId + '-' + ta.taskId"
              >
                <v-card>
                  <v-card-actions>
                    <v-btn
                      color="primary"
                      :disabled="!ta.prompting"
                      @click="pdbCommand(th.threadId, ta.taskId, 'next')"
                      >Next</v-btn
                    >
                    <v-btn
                      color="primary"
                      :disabled="!ta.prompting"
                      @click="pdbCommand(th.threadId, ta.taskId, 'continue')"
                      >Continue</v-btn
                    >
                    <v-btn
                      color="primary"
                      :disabled="!ta.prompting"
                      @click="pdbCommand(th.threadId, ta.taskId, 'return')"
                      >Return</v-btn
                    >
                    <v-btn
                      color="primary"
                      :disabled="!ta.prompting"
                      @click="pdbCommand(th.threadId, ta.taskId, 'step')"
                      >Step</v-btn
                    >
                  </v-card-actions>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-container fluid class="ma-0 pa-0">
                      <v-row>
                        <v-col cols="2">
                          <pre
                            v-for="i in ta.fileLines.length"
                            :key="
                              i
                            ">{{ i }} <span v-if="i==ta.lineNo">-></span> </pre>
                        </v-col>
                        <v-col cols="10">
                          <pre>{{ ta.fileLines.join("\n") }}</pre>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-col>
            </template>
          </template>
        </template>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-card>
            <v-card-text
              ><pre>{{ state }}</pre></v-card-text
            >
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";

const subscCounter = gql`
  subscription {
    counter
  }
`;

const subscState = gql`
  subscription {
    state {
      state
      nthreads
      threads {
        threadId
        tasks {
          taskId
          prompting
          fileName
          lineNo
          fileLines
        }
      }
    }
  }
`;

const mutatExec = gql`
  mutation {
    exec
  }
`;

const mutatReset = gql`
  mutation {
    reset
  }
`;

const mutatSendPdbCommand = gql`
  mutation SendPdbCommand(
    $threadId: String!
    $taskId: String
    $command: String!
  ) {
    sendPdbCommand(threadId: $threadId, taskId: $taskId, command: $command)
  }
`;

const codeLines = ["import script", "script.run()"];

export default {
  name: "Home",
  data: () => ({
    counter: null,
    state: {},
    code: codeLines.join("\n"),
    nlines: codeLines.length
  }),
  apollo: {
    $subscribe: {
      counter: {
        query: subscCounter,
        result({ data }) {
          this.counter = data.counter;
        }
      },
      state: {
        query: subscState,
        result({ data }) {
          console.log(data.state);
          this.state = data.state;
        }
      }
    }
  },
  methods: {
    async run() {
      console.log("run");
      const data = await this.$apollo.mutate({
        mutation: mutatExec
      });
    },
    async reset() {
      console.log("reset");
      const data = await this.$apollo.mutate({
        mutation: mutatReset
      });
    },
    async pdbCommand(threadId, taskId, command) {
      const data = await this.$apollo.mutate({
        mutation: mutatSendPdbCommand,
        variables: { threadId, taskId, command }
      });
    }
  }
};
</script>
